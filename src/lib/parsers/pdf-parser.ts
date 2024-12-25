import { PDFDocument } from 'pdf-lib';
import { ParseError } from '../errors';
import type { ParsedResume } from '../../types';
import { extractResumeData } from './resume-extractor';

export async function parsePDF(buffer: ArrayBuffer): Promise<ParsedResume> {
  try {
    const pdfDoc = await PDFDocument.load(buffer);
    const pages = pdfDoc.getPages();
    
    if (pages.length === 0) {
      throw new ParseError('PDF document is empty');
    }

    const textContent = await Promise.all(
      pages.map(async (page) => page.getText())
    );

    const text = textContent.join('\n');
    if (!text.trim()) {
      throw new ParseError('No text content found in PDF');
    }

    return extractResumeData(text);
  } catch (error) {
    if (error instanceof ParseError) {
      throw error;
    }
    throw new ParseError(`Failed to parse PDF: ${error.message}`);
  }
}