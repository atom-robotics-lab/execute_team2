import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useAlerts } from '../context/AlertContext';
import { analyzeMisinformation } from '../services/misinformationAnalysis';

interface MediaUploadProps {
  onFileSelect: (file: File) => void;
}

export const MediaUpload = ({ onFileSelect }: MediaUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { showAlert } = useAlerts();

  const handleFileAnalysis = async (file: File) => {
    setIsAnalyzing(true);
    try {
      // Simulate base confidence from main analysis
      const baseConfidence = Math.random();
      
      // Analyze for misinformation with real-time alerts
      await analyzeMisinformation(file, baseConfidence, (detail) => {
        // Show real-time alert for each detected pattern
        showAlert(detail);
      });

      // Continue with main file processing
      onFileSelect(file);
    } catch (error) {
      console.error('Analysis failed:', error);
      showAlert({
        category: 'visual_manipulation',
        patterns: [],
        explanation: 'An error occurred during analysis. Please try again.',
        severity: 'high',
        recommendations: ['Try uploading a different file', 'Check file format and size'],
        timestamp: new Date().toISOString(),
        sourceAnalysis: {
          verificationStatus: 'pending'
        }
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      await handleFileAnalysis(acceptedFiles[0]);
    }
  }, [onFileSelect, showAlert]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
      'video/*': ['.mp4', '.webm']
    },
    multiple: false
  });

  return (
    <div className="upload-container">
      <div
        {...getRootProps()}
        className={`upload-zone ${isDragging ? 'upload-zone-dragging' : ''}`}
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
      >
        <input {...getInputProps()} />
        <div className="text-center">
          <svg
            className="upload-icon"
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
          <p className="upload-text">
            {isAnalyzing 
              ? 'Analyzing file for potential misinformation...'
              : 'Drag and drop your image or video here, or click to select'
            }
          </p>
          <p className="upload-subtext">
            Supported formats: JPEG, PNG, MP4, WEBM
          </p>
        </div>

        {isAnalyzing && (
          <div className="upload-loading">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <div className="upload-loading-spinner"></div>
              <p className="mt-2 text-sm text-gray-600">Analyzing content...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 