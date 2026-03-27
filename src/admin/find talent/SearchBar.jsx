import React, { useState } from 'react';
import { Divider, Select, MultiSelect } from '@/components/ui/system';
// import { searchFields as dropdownData } from '../../../public/Data/TalentData'; // [TEMP] Commented due to missing file error

const salaryOptions = [
  { value: '0-10', label: '₹0 - ₹10k' },
  { value: '10-50', label: '₹10k - ₹50k' },
  { value: '50-100', label: '₹50k - ₹1L' },
  { value: '100-500', label: '₹1L - ₹5L' },
  { value: '500-1000', label: '₹5L - ₹1Cr' },
  { value: '1000-10000', label: '₹1Cr+' },
];

const SearchBar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({});

  const handleInputChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSalarySelect = (value) => {
    if (!value) return;
    const [min, max] = value.split('-').map(Number);
    handleInputChange('salaryRange', [min, max]);
  };

  return (
    <div className="flex flex-wrap justify-between items-center bg-neutral-950 p-6 rounded-2xl shadow-2xl gap-4">
      {/* {dropdownData.map((item, index) => (
        <React.Fragment key={index}>
          <div className="min-w-[180px] flex-1">
            <MultiSelect
              label={item.title}
              placeholder={`Enter ${item.title.toLowerCase()}...`}
              icon={item.icon ? <item.icon /> : null}
              data={item.options}
              onChange={(value) => handleInputChange(item.title, value)}
            />
          </div>
          {index < dropdownData.length - 1 && (
            <Divider orientation="vertical" color="neutral" size="xs" className="hidden lg:block mx-4" />
          )}
        </React.Fragment>
      ))} */}
      {/* Simple Salary Range Dropdown */}
      <div className="min-w-[180px] flex-1">
        <Select
          placeholder="Select salary range"
          data={salaryOptions}
          onChange={handleSalarySelect}
          className="text-black"
        />
      </div>
    </div>
  );
};

export default SearchBar;


