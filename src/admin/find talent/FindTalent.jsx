import React, { useEffect, useState } from 'react';

import { RingLoader } from '../../loader/RingLoader';
import { fetchTalents } from '../../services/talentService';
import TalentCard from './TalentCard';

const FindTalent = () => {
  const [allTalents, setAllTalents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTalents()
      .then((response) => {
        setAllTalents(Array.isArray(response.data) ? response.data : []);
      })
      .catch(() => {
        setError('Unable to load talent profiles right now.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="space-y-6">
      <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Find Talent
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Browse candidate profiles without extra UI noise or unnecessary controls.
        </p>
      </header>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
          {error}
        </div>
      )}

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        {loading ? (
          <div className="flex min-h-56 items-center justify-center">
            <RingLoader color="#4f46e5" size="48px" />
          </div>
        ) : allTalents.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {allTalents.map((talent, index) => (
              <TalentCard key={talent.id || `${talent.name}-${index}`} talent={talent} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center text-sm text-slate-600 dark:border-slate-600 dark:bg-slate-900/60 dark:text-slate-400">
            No talent profiles are available yet.
          </div>
        )}
      </div>
    </section>
  );
};

export default FindTalent;
