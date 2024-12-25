import { ParseError } from '../errors';
import type { ParsedResume } from '../../types';
import { extractResumeData } from './resume-extractor';

export async function parseDocx(buffer: ArrayBuffer): Promise<ParsedResume> {
  try {
    // Basic text extraction for demo
    const text = new TextDecoder().decode(buffer);
    if (!text.trim()) {
      throw new ParseError('No text content found in DOCX');
    }
    return extractResumeData(text);
  } catch (error) {
    if (error instanceof ParseError) {
      throw error;
    }
    throw new ParseError(`Failed to parse DOCX: ${error.message}`);
  }
}