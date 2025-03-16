import React from 'react';
import { MediaUpload } from './MediaUpload';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFileSelect: (file: File) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, onFileSelect }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl mx-4 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-900">
              Upload Media for Analysis
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <span className="text-2xl">×</span>
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <MediaUpload onFileSelect={(file) => {
            onFileSelect(file);
            onClose();
          }} />
        </div>
      </div>
    </div>
  );
}; 