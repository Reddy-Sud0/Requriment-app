/*
  # Initial Schema Setup

  1. Tables
    - candidates
      - Stores processed candidate information
      - Includes contact details, skills, and match status
    - job_criteria
      - Stores job requirements
      - Includes required skills and description
  
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create candidates table
CREATE TABLE IF NOT EXISTS candidates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  phone text,
  match_status boolean DEFAULT false,
  skills text[] DEFAULT '{}',
  notes text,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id)
);

-- Create job_criteria table
CREATE TABLE IF NOT EXISTS job_criteria (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  required_skills text[] DEFAULT '{}',
  description text,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_criteria ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can manage their own candidates"
  ON candidates
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage their own job criteria"
  ON job_criteria
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);