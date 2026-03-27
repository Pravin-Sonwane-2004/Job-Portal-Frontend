import React, { useState } from 'react';
import { IconFileText, IconFileUpload, IconTrash } from '@tabler/icons-react';

import PageWrapper from '../../components/PageWrapper';

const formatFileSize = (size) => {
  if (!size) {
    return '0 KB';
  }

  if (size >= 1024 * 1024) {
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  }

  return `${Math.max(1, Math.round(size / 1024))} KB`;
};

const ResumeUploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <PageWrapper>
      <section className="mx-auto max-w-4xl space-y-6">
        <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            Resume Upload
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Keep the screen simple until the storage API is wired in. You can choose a
            file here and confirm the payload that will be sent later.
          </p>
        </header>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <label
            htmlFor="resume-upload"
            className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 px-6 py-12 text-center transition-colors hover:border-indigo-400 hover:bg-slate-50 dark:border-slate-600 dark:hover:border-indigo-500 dark:hover:bg-slate-900/70"
          >
            <IconFileUpload size={40} className="text-slate-400" />
            <span className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
              Choose a resume file
            </span>
            <span className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Accepted formats: PDF, DOC, DOCX
            </span>
          </label>
          <input
            id="resume-upload"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(event) => setSelectedFile(event.target.files?.[0] || null)}
            className="sr-only"
          />
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Selected file
          </h2>

          {selectedFile ? (
            <div className="mt-4 flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/70">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300">
                  <IconFileText size={20} />
                </div>
                <div>
                  <p className="font-medium text-slate-900 dark:text-slate-100">
                    {selectedFile.name}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {formatFileSize(selectedFile.size)}
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition-colors hover:bg-red-100 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300 dark:hover:bg-red-500/15"
                onClick={() => setSelectedFile(null)}
              >
                <IconTrash size={16} />
                Clear
              </button>
            </div>
          ) : (
            <div className="mt-4 rounded-2xl border border-dashed border-slate-300 px-4 py-8 text-center text-sm text-slate-600 dark:border-slate-600 dark:text-slate-400">
              No file selected yet.
            </div>
          )}
        </section>
      </section>
    </PageWrapper>
  );
};

export default ResumeUploadPage;
