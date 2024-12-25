import React from 'react';
import { Check, X } from 'lucide-react';
import type { Candidate } from '../types';

interface CandidateTableProps {
  candidates: Candidate[];
  onSort: (key: keyof Candidate) => void;
}

export function CandidateTable({ candidates, onSort }: CandidateTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => onSort('name')}>
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Match Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Skills
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Notes
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {candidates.map((candidate) => (
            <tr key={candidate.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                {candidate.name}
              </td>
              <td className="px-6 py-4">
                <div className="text-sm">
                  <div>{candidate.email}</div>
                  <div className="text-gray-500">{candidate.phone}</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {candidate.matchStatus ? (
                  <Check className="w-5 h-5 text-green-500" />
                ) : (
                  <X className="w-5 h-5 text-red-500" />
                )}
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-wrap gap-1">
                  {candidate.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {candidate.notes}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}