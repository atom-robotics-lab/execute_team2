import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface MediaUploadProps {
  onFileSelect: (file: File) => void;
}

export const MediaUpload = ({ onFileSelect }: MediaUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
      'video/*': ['.mp4', '.webm']
    },
    multiple: false
  });

  return (
    <div
      {...getRootProps()}
      className={`p-8 border-2 border-dashed rounded-lg transition-colors ${
        isDragging ? 'border-primary-500 bg-primary-50' : 'border-gray-300 bg-gray-50'
      }`}
      onDragEnter={() => setIsDragging(true)}
      onDragLeave={() => setIsDragging(false)}
    >
      <input {...getInputProps()} />
      <div className="text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
          />
        </svg>
        <p className="mt-1 text-sm text-gray-600">
          Drag and drop your image or video here, or click to select
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Supported formats: JPEG, PNG, MP4, WEBM
        </p>
      </div>
    </div>
  );
}; 