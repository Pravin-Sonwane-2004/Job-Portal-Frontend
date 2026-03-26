import React, { useState, useEffect } from 'react';
import TalentCard from './TalentCard';

const FindTalent = () => {
  const navigate = useNavigate();
  const [allTalents, setAllTalents] = useState([]);
  const [filteredTalents, setFilteredTalents] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch talent data from backend
  useEffect(() => {
    fetch('http://localhost:8080/api/talents') // Update the URL as per your backend
      .then((res) => res.json())
      .then((data) => {
        setAllTalents(data);
        setFilteredTalents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching talents:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-poppins py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          {/* <SearchBar onFilterChange={handleFilterChange} /> */}
        </div>

        <div className="border-t border-slate-200 dark:border-slate-700 mb-6"></div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center h-60">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : filteredTalents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTalents.map((talent, index) => (
              <div key={index} className="hover:scale-105 transition-transform">
                <TalentCard talent={talent} onViewProfile={() => handleViewProfile(talent)} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-60">
            <div className="text-2xl text-slate-400 dark:text-slate-500 mb-2">😕 No talents match your filters!</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">Try adjusting your search criteria.</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindTalent;
