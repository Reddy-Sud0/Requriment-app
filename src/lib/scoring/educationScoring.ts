import type { ParsedResume } from '../../types';

export function calculateEducationScore(resume: ParsedResume): number {
  const text = resume.rawText.toLowerCase();
  let score = 0;
  
  // Education indicators - Weight: 10% of total score
  if (text.includes('phd') || text.includes('doctorate')) {
    score = 10;
  } else if (text.includes('master')) {
    score = 8;
  } else if (text.includes('bachelor') || text.includes('bs') || text.includes('ba')) {
    score = 6;
  } else if (text.includes('associate') || text.includes('certification')) {
    score = 4;
  }
  
  return score;
}