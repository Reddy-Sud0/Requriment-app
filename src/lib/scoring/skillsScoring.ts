import type { ParsedResume, JobCriteria } from '../../types';

export interface SkillScore {
  score: number;
  matched: string[];
  missing: string[];
}

export function calculateSkillScore(resume: ParsedResume, criteria: JobCriteria): SkillScore {
  const matched: string[] = [];
  const missing: string[] = [];
  
  for (const requiredSkill of criteria.requiredSkills) {
    const found = resume.skills.some(skill => 
      skill.toLowerCase() === requiredSkill.toLowerCase()
    );
    
    if (found) {
      matched.push(requiredSkill);
    } else {
      missing.push(requiredSkill);
    }
  }
  
  // Weight calculation: 70% of total score
  const score = (matched.length / criteria.requiredSkills.length) * 70;
  
  return { score, matched, missing };
}