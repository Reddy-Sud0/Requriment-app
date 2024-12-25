const COMMON_SKILLS = [
  'javascript',
  'typescript',
  'react',
  'node.js',
  'python',
  'java',
  'c++',
  'sql',
  'aws',
  'docker',
  'kubernetes',
  'git',
  'agile',
  'scrum'
];

export function extractSkills(text: string): string[] {
  const normalizedText = text.toLowerCase();
  return COMMON_SKILLS.filter(skill => 
    normalizedText.includes(skill.toLowerCase())
  );
}