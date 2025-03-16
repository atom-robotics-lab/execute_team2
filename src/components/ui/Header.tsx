import React from 'react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onClose: () => void;
}

export function Header({ title, subtitle, onClose }: HeaderProps) {
  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold">
              <span className="text-red-500">TRUTH</span>GUARD
            </h1>
            <div className="h-6 w-px bg-gray-300"></div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
              {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <span>Back to Home</span>
          </button>
        </div>
      </div>
    </div>
  );
} 