import { useState } from 'react';
import { parseResume } from '../lib/resume-parser';
import { matchResumeWithCriteria } from '../lib/matching';
import { saveCandidates } from '../lib/database';
import type { ParsedResume, JobCriteria, Candidate } from '../types';

export function useResumes() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function processResumes(
    files: FileList,
    criteria: JobCriteria
  ): Promise<Candidate[]> {
    setLoading(true);
    setError(null);
    const candidates: Candidate[] = [];
    
    try {
      for (const file of Array.from(files)) {
        try {
          // Parse resume
          const parsedResume = await parseResume(file);
          
          // Match against criteria
          const matchResult = matchResumeWithCriteria(parsedResume, criteria);
          
          // Create candidate record
          const candidate: Candidate = {
            id: crypto.randomUUID(),
            name: parsedResume.name,
            email: parsedResume.email,
            phone: parsedResume.phone,
            skills: parsedResume.skills,
            matchStatus: matchResult.score >= 70, // 70% threshold
            notes: matchResult.notes,
          };
          
          candidates.push(candidate);
        } catch (err) {
          // Add error message for this specific file
          setError(prev => {
            const message = `Failed to process ${file.name}: ${err.message}`;
            return prev ? `${prev}\n${message}` : message;
          });
          // Continue with other files
          continue;
        }
      }
      
      if (candidates.length > 0) {
        // Save successful candidates to database
        await saveCandidates(candidates);
      }
      
      return candidates;
    } catch (err) {
      setError(`An unexpected error occurred: ${err.message}`);
      return [];
    } finally {
      setLoading(false);
    }
  }

  return { processResumes, loading, error };
}