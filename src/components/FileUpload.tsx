import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onUpload: (files: FileList) => void;
  accept: string;
  multiple?: boolean;
  label: string;
}

export function FileUpload({ onUpload, accept, multiple = false, label }: FileUploadProps) {
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onUpload(e.dataTransfer.files);
  }, [onUpload]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onUpload(e.target.files);
    }
  }, [onUpload]);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors"
    >
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        className="hidden"
        id="file-upload"
      />
      <label
        htmlFor="file-upload"
        className="cursor-pointer flex flex-col items-center gap-2"
      >
        <Upload className="w-12 h-12 text-gray-400" />
        <span className="text-gray-600">{label}</span>
        <span className="text-sm text-gray-400">
          Drag and drop or click to select
        </span>
      </label>
    </div>
  );
}