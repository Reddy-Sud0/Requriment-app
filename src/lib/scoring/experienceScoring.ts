import type { ParsedResume } from '../../types';

export function calculateExperienceScore(resume: ParsedResume): number {
  const text = resume.rawText.toLowerCase();
  let score = 0;
  
  // Experience indicators
  const seniorKeywords = ['senior', 'lead', 'manager', 'architect'];
  const midLevelKeywords = ['mid-level', 'intermediate', '3+ years', '5+ years'];
  const juniorKeywords = ['junior', 'entry level', 'intern', '1-2 years'];
  
  // Weight: 20% of total score
  if (seniorKeywords.some(keyword => text.includes(keyword))) {
    score = 20;
  } else if (midLevelKeywords.some(keyword => text.includes(keyword))) {
    score = 15;
  } else if (juniorKeywords.some(keyword => text.includes(keyword))) {
    score = 10;
  }
  
  return score;
}