export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  matchStatus: boolean;
  skills: string[];
  notes: string;
}

export interface JobCriteria {
  id: string;
  requiredSkills: string[];
  description: string;
}

export interface ParsedResume {
  name: string;
  email: string;
  phone: string;
  skills: string[];
  rawText: string;
}