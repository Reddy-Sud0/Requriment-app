import type { ParsedResume, JobCriteria } from '../types';
import { calculateSkillScore } from './scoring/skillsScoring';
import { calculateExperienceScore } from './scoring/experienceScoring';
import { calculateEducationScore } from './scoring/educationScoring';

export interface MatchResult {
  totalScore: number;
  skillScore: number;
  experienceScore: number;
  educationScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  notes: string;
}

export function matchResumeWithCriteria(
  resume: ParsedResume,
  criteria: JobCriteria
): MatchResult {
  // Calculate individual scores
  const skillsResult = calculateSkillScore(resume, criteria);
  const experienceScore = calculateExperienceScore(resume);
  const educationScore = calculateEducationScore(resume);
  
  // Calculate total score (max 100)
  const totalScore = skillsResult.score + experienceScore + educationScore;
  
  return {
    totalScore,
    skillScore: skillsResult.score,
    experienceScore,
    educationScore,
    matchedSkills: skillsResult.matched,
    missingSkills: skillsResult.missing,
    notes: generateDetailedNotes({
      totalScore,
      skillScore: skillsResult.score,
      experienceScore,
      educationScore,
      matched: skillsResult.matched,
      missing: skillsResult.missing
    })
  };
}

interface NotesParams {
  totalScore: number;
  skillScore: number;
  experienceScore: number;
  educationScore: number;
  matched: string[];
  missing: string[];
}

function generateDetailedNotes({
  totalScore,
  skillScore,
  experienceScore,
  educationScore,
  matched,
  missing
}: NotesParams): string {
  const parts = [
    `Overall Match: ${totalScore.toFixed(0)}%`,
    `Skills (${skillScore.toFixed(0)}/70): ${matched.join(', ')}`,
    missing.length ? `Missing Skills: ${missing.join(', ')}` : null,
    `Experience Score: ${experienceScore}/20`,
    `Education Score: ${educationScore}/10`
  ].filter(Boolean);

  return parts.join('\n');
}