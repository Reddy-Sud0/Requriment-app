import React, { useState } from 'react';
import type { JobCriteria } from '../types';
import { Play } from 'lucide-react';

interface CriteriaInputProps {
  onSave: (criteria: JobCriteria) => void;
  onRunAnalysis: () => void;
  hasResumes: boolean;
  hasCriteria: boolean;
}

export function CriteriaInput({ onSave, onRunAnalysis, hasResumes, hasCriteria }: CriteriaInputProps) {
  const [skills, setSkills] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: crypto.randomUUID(),
      requiredSkills: skills.split(',').map(s => s.trim()),
      description
    });
    setSkills('');
    setDescription('');
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
            Required Skills (comma-separated)
          </label>
          <input
            type="text"
            id="skills"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="React, TypeScript, Node.js"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Job Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter job description..."
          />
        </div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save Criteria
        </button>
      </form>

      <div className="border-t pt-4">
        <button
          onClick={onRunAnalysis}
          disabled={!hasResumes || !hasCriteria}
          className="inline-flex items-center justify-center w-full py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed gap-2"
        >
          <Play className="w-4 h-4" />
          Run Analysis
        </button>
        {!hasResumes && (
          <p className="text-sm text-gray-500 mt-2">Upload resumes to run analysis</p>
        )}
        {!hasCriteria && (
          <p className="text-sm text-gray-500 mt-2">Save job criteria to run analysis</p>
        )}
      </div>
    </div>
  );
}