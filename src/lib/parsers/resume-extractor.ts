import { ParseError } from '../errors';
import type { ParsedResume } from '../../types';
import { extractContactInfo } from '../extractors/contact-extractor';
import { extractSkills } from '../extractors/skills-extractor';

export function extractResumeData(text: string): ParsedResume {
  if (!text || typeof text !== 'string') {
    throw new ParseError('Invalid text content provided');
  }

  const contact = extractContactInfo(text);
  const skills = extractSkills(text);

  if (!contact.name) {
    throw new ParseError('Could not extract candidate name');
  }

  return {
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
    skills,
    rawText: text,
  };
}