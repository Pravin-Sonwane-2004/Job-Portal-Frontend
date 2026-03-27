import React, { useState, useEffect, useRef } from 'react';
import { IconSearch, IconMapPin, IconSortAscending2, IconAlertCircle } from '@tabler/icons-react';
import { RangeSlider, Select, Paper, Alert, Pagination } from '@/components/ui/system';
import JobCard from './JobCard';
import { getJobs } from '../../all services/getJfBackendService';
import { RingLoader } from '../../loader/RingLoader';

// Debounce hook
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};

const suggestionEndpoints = {
  'Job Title': '/user/jobs/titles',
  'Location': '/user/jobs/locations',
};

const sortOptions = [
  { value: 'postedDate', label: 'Date Posted' },
  { value: 'jobSalary', label: 'Salary' },
];

const SearchBar = () => {
  // Job fetching and filter state
  const [jobList, setJobList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('postedDate');
  const [page, setPage] = useState(1);
  const [size] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({});
  const [realJobTitle, setRealJobTitle] = useState('');
  const [error, setError] = useState(null);

  // SearchBar UI state
  const [searchTerms, setSearchTerms] = useState({});
  const [suggestions, setSuggestions] = useState({});
  const [loadingSuggest, setLoadingSuggest] = useState({});
  const containerRef = useRef(null);

  // Dropdown data for search fields
  const dropdownData = [
    {
      title: 'Job Title',
      options: [...new Set(jobList.map((job) => job.jobTitle).filter(Boolean))],
    },
    {
      title: 'Location',
      options: [...new Set(jobList.map((job) => job.jobLocation).filter(Boolean))],
    },
  ];

  // Debounce search terms for suggestions
  const debouncedTerms = useDebounce(searchTerms, 300);

  // Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);

      const params = {
        page: page - 1,
        size,
        sortBy,
        sortDir: 'desc',
        ...(filters['Job Title']?.length && { jobTitle: filters['Job Title'][0] }),
        ...(filters['Location']?.length && { jobLocation: filters['Location'][0] }),
        // ...(filters.salaryRange && {
        //   minSalary: filters.salaryRange[0],
        //   maxSalary: filters.salaryRange[1],
        // }),
      };

      try {
        const res = await getJobs(params);
        const jobs = Array.isArray(res.data?.content) ? res.data.content : [];
        setJobList(jobs);
        const total = res.data?.totalPages || Math.ceil((res.data?.totalElements || 0) / size);
        setTotalPages(total);
      } catch (err) {
        setJobList([]);
        setTotalPages(1);
        setError('Unexpected response from server. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [page, size, sortBy, filters]);

  // Reset to first page on sort change
  useEffect(() => {
    setPage(1);
  }, [sortBy]);

  // Suggestion fetching
  useEffect(() => {
    Object.entries(debouncedTerms).forEach(([key, value]) => {
      if (value.trim().length >= 2) fetchSuggestions(key, value);
      else setSuggestions((prev) => ({ ...prev, [key]: [] }));
    });
    // eslint-disable-next-line
  }, [debouncedTerms]);

  const fetchSuggestions = async (key, value) => {
    const endpoint = suggestionEndpoints[key];
    if (!endpoint) return;

    setLoadingSuggest((prev) => ({ ...prev, [key]: true }));
    try {
      const res = await fetch(`${endpoint}?suggest=${encodeURIComponent(value)}`);
      const data = await res.json();
      setSuggestions((prev) => ({ ...prev, [key]: data }));
    } catch (error) {
      setSuggestions((prev) => ({ ...prev, [key]: [] }));
    } finally {
      setLoadingSuggest((prev) => ({ ...prev, [key]: false }));
    }
  };

  const applyFilter = (key, value) => {
    const newFilters = {
      ...filters,
      [key]: filters[key] ? [...new Set([...filters[key], value])] : [value],
    };
    setFilters(newFilters);
    setSuggestions((prev) => ({ ...prev, [key]: [] }));
    if (key === 'Job Title') setRealJobTitle(value);
    setPage(1);
  };

  const handleInputChange = (key, value) => {
    setSearchTerms((prev) => ({ ...prev, [key]: value }));
    if (key === 'Job Title') setRealJobTitle(value);
  };

  const handleInputKeyDown = (key, e) => {
    if (e.key === 'Enter') {
      const value = searchTerms[key];
      if (value && (!filters[key] || !filters[key].includes(value))) {
        applyFilter(key, value);
      }
    }
  };

  const handleClickOutside = (e) => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      setSuggestions({});
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const highlightMatch = (text, query) => {
    const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="font-semibold bg-accent-100">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const handleSearchClick = () => {
    const newFilters = { ...filters };
    dropdownData.forEach(({ title: key }) => {
      const value = searchTerms[key];
      if (value && (!filters[key] || !filters[key].includes(value))) {
        newFilters[key] = filters[key] ? [...filters[key], value] : [value];
      }
    });
    setFilters(newFilters);
    setSuggestions({});
    setPage(1);
  };

  // Handler for sort change
  const handleSortChange = (value) => {
    if (value) setSortBy(value);
  };

  return (
    <div>
      <Paper shadow="xl" radius="lg" p="md">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="">
              Sort by:
            </label>
            <Select
              id="sort-select"
              data={sortOptions}
              value={sortBy}
              onChange={handleSortChange}
              leftSection={<IconSortAscending2 size={18} />}
              placeholder="Sort by"
              size="md"
              radius="md"
              className="w-[200px]"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto md:max-w-[700px]">
            <div
              ref={containerRef}
              className="flex flex-row items-center justify-end bg-neutral-950 p-4 gap-4 w-full"
            >
              {/* Search fields */}
              {dropdownData.map((item, idx) => {
                const key = item.title;
                const value = searchTerms[key] ?? '';
                let IconComponent = null;
                if (key === 'Job Title') IconComponent = IconSearch;
                else if (key === 'Location') IconComponent = IconMapPin;

                return (
                  <div key={key || idx} className="relative min-w-[160px] max-w-[220px] flex-1">
                    {IconComponent && (
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none">
                        <IconComponent size={16} />
                      </span>
                    )}
                    <input
                      type="text"
                      aria-autocomplete="list"
                      aria-controls={`suggestions-${key}`}
                      aria-haspopup="listbox"
                      aria-expanded={!!suggestions[key]?.length}
                      placeholder={`Search by ${key.toLowerCase()}...`}
                      value={value}
                      onChange={(e) => handleInputChange(key, e.target.value)}
                      onKeyDown={(e) => handleInputKeyDown(key, e)}
                      className={`w-full px-3 py-2 rounded border text-base ${IconComponent ? 'pl-9' : ''}`}
                      autoComplete="on"
                      style={{ minWidth: 0 }}
                    />
                    {loadingSuggest[key] && (
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-neutral-100 italic animate-pulse">
                        Loading...
                      </div>
                    )}
                    {suggestions[key]?.length > 0 && (
                      <ul
                        id={`suggestions-${key}`}
                        role="listbox"
                        className="absolute z-10 bg-white border rounded shadow-lg w-full max-h-40 overflow-y-auto mt-1"
                      >
                        {suggestions[key].map((suggestion, i) => (
                          <li
                            key={i}
                            role="option"
                            className="px-3 py-2 hover:bg-indigo-100 cursor-pointer text-xs"
                            onClick={() => applyFilter(key, suggestion)}
                          >
                            {highlightMatch(suggestion, searchTerms[key] || '')}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
              {/* Salary Range Slider (actual size, inline) */}
              {/* 
              <div className="flex flex-col items-center min-w-[160px] max-w-[220px] px-2">
                <span className="text-xs text-neutral-200 mb-1">Salary (₹)</span>
                <RangeSlider
                  min={0}
                  max={200000}
                  step={1000}
                  value={filters.salaryRange || [0, 200000]}
                  onChange={handleSalaryChange}
                  size="md"
                  color="accent"
                  thumbSize={18}
                  style={{ width: 140 }}
                  label={null}
                />
                <div className="flex justify-between w-full text-xs text-neutral-300 mt-1">
                  <span>
                    Salary: ₹
                    {filters.salaryRange?.[0]
                      ? filters.salaryRange[0].toLocaleString()
                      : '0'}
                  </span>
                  <span>
                    Salary: ₹
                    {filters.salaryRange?.[1]
                      ? filters.salaryRange[1].toLocaleString()
                      : '200,000'}
                  </span>
                </div>
              </div>
              */}
              {/* Search button */}
              <button
                type="button"
                className="h-10 w-12 flex items-center justify-center bg-white hover:bg-indigo-100 text-neutral-700 hover:text-indigo-800 rounded transition-colors"
                aria-label="Search"
                onClick={handleSearchClick}
              >
                <IconSearch size={20} />
              </button>
            </div>
          </div>
        </div>
      </Paper>

      {/* Job list and pagination */}
      <div style={{ marginTop: '-18px' }}>
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <RingLoader color="#facc15" size="48px" />
          </div>
        ) : error ? (
          <Alert
            icon={<IconAlertCircle size={24} />}
            title="Error"
            color="red"
            radius="md"
            className="my-10"
          >
            {error}
          </Alert>
        ) : jobList.length === 0 ? (
          <Alert
            icon={<IconAlertCircle size={24} />}
            title="No jobs found"
            color="accent"
            radius="md"
            className="my-10"
          >
            Try adjusting your filters or search criteria.
          </Alert>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 bg-neutral-950/40 p-4 rounded-xl">
              {jobList.map((job, index) => (
                <Paper key={index} >
                  <JobCard job={job} />
                </Paper>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <Pagination
                total={totalPages}
                value={page}
                onChange={setPage}
                color="accent"
                size="md"
                radius="md"
                disabled={totalPages <= 1}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchBar;


