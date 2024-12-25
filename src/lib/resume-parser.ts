import { parsePDF } from './parsers/pdf-parser';
import { parseDocx } from './parsers/docx-parser';
import { ParseError } from './errors';
import type { ParsedResume } from '../types';

export async function parseResume(file: File): Promise<ParsedResume> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    
    if (file.type === 'application/pdf') {
      return await parsePDF(arrayBuffer);
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      return await parseDocx(arrayBuffer);
    }
    
    throw new ParseError('Unsupported file type');
  } catch (error) {
    if (error instanceof ParseError) {
      throw error;
    }
    throw new ParseError(`Failed to parse resume: ${error.message}`);
  }
}