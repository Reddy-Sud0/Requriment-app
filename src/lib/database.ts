import { supabase } from './auth';
import type { Candidate, JobCriteria } from '../types';

export async function saveCandidates(candidates: Candidate[]) {
  const { data, error } = await supabase
    .from('candidates')
    .insert(candidates)
    .select();
    
  if (error) throw error;
  return data;
}

export async function getCandidates() {
  const { data, error } = await supabase
    .from('candidates')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  return data;
}

export async function saveJobCriteria(criteria: JobCriteria) {
  const { data, error } = await supabase
    .from('job_criteria')
    .insert(criteria)
    .select();
    
  if (error) throw error;
  return data;
}

export async function getJobCriteria() {
  const { data, error } = await supabase
    .from('job_criteria')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  return data;
}