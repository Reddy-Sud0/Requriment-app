import React, { useState, useCallback } from 'react';
import { FileUpload } from './components/FileUpload';
import { CandidateTable } from './components/CandidateTable';
import { CriteriaInput } from './components/CriteriaInput';
import type { Candidate, JobCriteria } from './types';
import { FileText, Users, AlertCircle } from 'lucide-react';
import { useResumes } from './hooks/useResumes';

function App() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [criteria, setCriteria] = useState<JobCriteria | null>(null);
  const [pendingFiles, setPendingFiles] = useState<FileList | null>(null);
  const { processResumes, loading, error } = useResumes();

  const handleResumeUpload = useCallback((files: FileList) => {
    setPendingFiles(files);
  }, []);

  const handleRunAnalysis = useCallback(async () => {
    if (!pendingFiles || !criteria) return;

    try {
      const results = await processResumes(pendingFiles, criteria);
      if (results.length > 0) {
        setCandidates(prev => [...prev, ...results]);
      }
      setPendingFiles(null); // Clear pending files after processing
    } catch (err) {
      console.error('Failed to process resumes:', err);
    }
  }, [pendingFiles, criteria, processResumes]);

  const handleSort = useCallback((key: keyof Candidate) => {
    setCandidates(prev => 
      [...prev].sort((a, b) => 
        String(a[key]).localeCompare(String(b[key]))
      )
    );
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <FileText className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Resume Review System
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-red-800">Processing Errors</h3>
                <pre className="mt-1 text-sm text-red-700 whitespace-pre-wrap">{error}</pre>
              </div>
            </div>
          </div>
        )}

        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-6">
              <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    Upload Resumes
                  </h3>
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <FileUpload
                    onUpload={handleResumeUpload}
                    accept=".pdf,.doc,.docx"
                    multiple
                    label="Upload resumes (PDF, DOC, DOCX)"
                  />
                  {pendingFiles && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-600">
                        {pendingFiles.length} file(s) ready for analysis
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    Job Criteria
                  </h3>
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <CriteriaInput 
                    onSave={setCriteria}
                    onRunAnalysis={handleRunAnalysis}
                    hasResumes={!!pendingFiles}
                    hasCriteria={!!criteria}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
              <div className="px-4 py-5 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-medium text-gray-900">
                      Candidates ({candidates.length})
                    </h3>
                  </div>
                </div>
              </div>
              <div className="px-4 py-5 sm:p-6">
                {loading ? (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-2 text-sm text-gray-600">Processing resumes...</p>
                  </div>
                ) : (
                  <CandidateTable
                    candidates={candidates}
                    onSort={handleSort}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;