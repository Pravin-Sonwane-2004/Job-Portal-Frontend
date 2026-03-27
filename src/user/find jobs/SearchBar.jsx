import React, { useState, useEffect, useRef } from 'react';
import { IconSearch, IconMapPin, IconSortAscending2, IconAlertCircle } from '@tabler/icons-react';
import JobCard from './JobCard';
import { getJobs } from '../../services/jobPortalApi';
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

const AlertBanner = ({ title, children, tone = 'default' }) => {
  const toneClass =
    tone === 'error'
      ? 'border-red-200 bg-red-50 text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300'
      : 'border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100';

  return (
    <div className={`rounded-2xl border p-4 ${toneClass}`}>
      <div className="flex gap-3">
        <IconAlertCircle size={22} className="shrink-0" />
        <div>
          <p className="font-semibold">{title}</p>
          <p className="mt-1 text-sm">{children}</p>
        </div>
      </div>
    </div>
  );
};

const PaginationControls = ({ totalPages, page, onChange }) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className="flex flex-wrap items-center justify-center gap-2" aria-label="Job results pages">
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
        <button
          key={pageNumber}
          type="button"
          className={`h-10 min-w-10 rounded-full px-3 text-sm font-medium transition-colors ${
            pageNumber === page
              ? 'bg-indigo-600 text-white'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700'
          }`}
          onClick={() => onChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
    </nav>
  );
};

const SearchBar = () => {
  const [jobList, setJobList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('postedDate');
  const [page, setPage] = useState(1);
  const [size] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({});
  const [error, setError] = useState(null);

  const [searchTerms, setSearchTerms] = useState({});
  const [suggestions, setSuggestions] = useState({});
  const [loadingSuggest, setLoadingSuggest] = useState({});
  const containerRef = useRef(null);

  const dropdownData = [
    { title: 'Job Title' },
    { title: 'Location' },
  ];

  const debouncedTerms = useDebounce(searchTerms, 300);

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
      };

      try {
        const res = await getJobs(params);
        const jobs = Array.isArray(res.data?.content) ? res.data.content : [];
        setJobList(jobs);
        const total = res.data?.totalPages || Math.ceil((res.data?.totalElements || 0) / size);
        setTotalPages(total);
      } catch {
        setJobList([]);
        setTotalPages(1);
        setError('Unexpected response from server. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [page, size, sortBy, filters]);

  useEffect(() => {
    setPage(1);
  }, [sortBy]);

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
    } catch {
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
    setPage(1);
  };

  const handleInputChange = (key, value) => {
    setSearchTerms((prev) => ({ ...prev, [key]: value }));
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
        <span key={index} className="rounded-sm bg-amber-100 font-semibold dark:bg-amber-500/20">
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

  const handleSortChange = (value) => {
    if (value) setSortBy(value);
  };

  return (
    <div>
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <div className="flex flex-col flex-wrap items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Sort by:
            </label>
            <div className="relative">
              <IconSortAscending2 size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <select
              id="sort-select"
              value={sortBy}
              onChange={(event) => handleSortChange(event.target.value)}
              className="w-[200px] rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition-colors focus:border-indigo-500 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto md:max-w-[700px]">
            <div
              ref={containerRef}
              className="flex w-full flex-col gap-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-900 md:flex-row md:items-center"
            >
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
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs italic text-slate-400">
                        Loading...
                      </div>
                    )}
                    {suggestions[key]?.length > 0 && (
                      <ul
                        id={`suggestions-${key}`}
                        role="listbox"
                        className="absolute z-10 mt-1 max-h-40 w-full overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900"
                      >
                        {suggestions[key].map((suggestion, i) => (
                          <li
                            key={i}
                            role="option"
                            className="cursor-pointer px-3 py-2 text-xs text-slate-700 hover:bg-indigo-50 dark:text-slate-100 dark:hover:bg-slate-800"
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
              <button
                type="button"
                className="flex h-11 w-full items-center justify-center rounded-xl bg-indigo-600 text-white transition-colors hover:bg-indigo-500 md:w-12"
                aria-label="Search"
                onClick={handleSearchClick}
              >
                <IconSearch size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '-18px' }}>
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <RingLoader color="#facc15" size="48px" />
          </div>
        ) : error ? (
          <div className="my-10">
            <AlertBanner title="Error" tone="error">
            {error}
            </AlertBanner>
          </div>
        ) : jobList.length === 0 ? (
          <div className="my-10">
            <AlertBanner title="No jobs found">
            Try adjusting your filters or search criteria.
            </AlertBanner>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-8 rounded-3xl bg-slate-100 p-4 dark:bg-slate-950/40 md:grid-cols-2 lg:grid-cols-3">
              {jobList.map((job, index) => (
                <div key={index}>
                  <JobCard job={job} />
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <PaginationControls totalPages={totalPages} page={page} onChange={setPage} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchBar;



