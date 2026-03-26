import React, { useState } from 'react';
import { IconFileUpload, IconFileText, IconTrash, IconDownload } from '@tabler/icons-react';

const ResumeUploadPage = () => {
  const [uploadedFiles, setUploadedFiles] = useState([
    // Mock data - replace with actual uploaded files
    { id: 1, name: 'resume_v1.pdf', size: '2.3 MB', uploadedAt: '2024-01-15' },
    { id: 2, name: 'cv_2024.docx', size: '1.8 MB', uploadedAt: '2024-02-20' },
  ]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // TODO: Implement actual file upload logic
      console.log('Uploading file:', file.name);
      // Add file to uploadedFiles state
    }
  };

  const handleDelete = (fileId) => {
    // TODO: Implement file deletion logic
    setUploadedFiles(uploadedFiles.filter(file => file.id !== fileId));
  };

  const handleDownload = (fileId) => {
    // TODO: Implement file download logic
    console.log('Downloading file:', fileId);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 px-4 py-6 md:px-4 md:py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 border border-slate-200 dark:border-slate-700">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            Resume Upload
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Upload your resume and manage your uploaded files. Supported formats: PDF, DOC, DOCX (Max 10MB)
          </p>

          {/* Upload Section */}
          <div className="mb-8">
            <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-8 text-center hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors">
              <IconFileUpload size={48} className="mx-auto text-slate-400 mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Upload Your Resume
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Drag and drop your resume here, or click to browse
              </p>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
                id="resume-upload"
              />
              <label
                htmlFor="resume-upload"
                className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors cursor-pointer focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <IconFileUpload size={18} className="mr-2" />
                Choose File
              </label>
            </div>
          </div>

          {/* Uploaded Files Section */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
              Your Uploaded Resumes
            </h2>

            {uploadedFiles.length === 0 ? (
              <div className="text-center py-12">
                <IconFileText size={48} className="mx-auto text-slate-400 mb-4" />
                <p className="text-slate-600 dark:text-slate-400">
                  No resumes uploaded yet. Upload your first resume above.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {uploadedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600"
                  >
                    <div className="flex items-center gap-3">
                      <IconFileText size={24} className="text-indigo-500" />
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-100">
                          {file.name}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {file.size} • Uploaded on {file.uploadedAt}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDownload(file.id)}
                        className="p-2 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        title="Download"
                      >
                        <IconDownload size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(file.id)}
                        className="p-2 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                        title="Delete"
                      >
                        <IconTrash size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeUploadPage;
