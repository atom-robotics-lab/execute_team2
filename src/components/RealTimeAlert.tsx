import React, { useEffect, useState } from 'react';
import { MisinformationDetail } from '../types/misinformation';

interface RealTimeAlertProps {
  alert: MisinformationDetail;
  onDismiss: () => void;
}

export const RealTimeAlert: React.FC<RealTimeAlertProps> = ({ alert, onDismiss }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    setIsVisible(true);
    const timer = setInterval(() => {
      setProgress((prev) => Math.max(0, prev - 1));
    }, 50);

    const dismissTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onDismiss, 300);
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(dismissTimer);
    };
  }, [onDismiss]);

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-50 border-red-500 text-red-800';
      case 'medium':
        return 'bg-yellow-50 border-yellow-500 text-yellow-800';
      case 'low':
        return 'bg-orange-50 border-orange-500 text-orange-800';
      default:
        return 'bg-gray-50 border-gray-500 text-gray-800';
    }
  };

  const severityIcon = (severity: string) => {
    switch (severity) {
      case 'high':
        return '🚨';
      case 'medium':
        return '⚠️';
      case 'low':
        return 'ℹ️';
      default:
        return '📝';
    }
  };

  return (
    <div
      className={`fixed bottom-4 right-4 max-w-sm w-full transform transition-transform duration-300 ${
        isVisible ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div
        className={`relative border-l-4 p-4 shadow-lg rounded-lg ${getSeverityStyles(
          alert.severity
        )}`}
      >
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <span className="text-2xl">{severityIcon(alert.severity)}</span>
          </div>
          <div className="ml-3 w-full">
            <div className="flex justify-between items-start">
              <p className="text-sm font-medium">
                {alert.category.split('_').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </p>
              <button
                onClick={() => {
                  setIsVisible(false);
                  setTimeout(onDismiss, 300);
                }}
                className="ml-4 text-gray-400 hover:text-gray-500"
              >
                ✕
              </button>
            </div>
            <p className="mt-1 text-sm">{alert.explanation}</p>
            
            {alert.patterns.length > 0 && (
              <div className="mt-2">
                <p className="text-sm font-medium">Detected Patterns:</p>
                <ul className="mt-1 text-sm list-disc list-inside">
                  {alert.patterns.map((pattern, index) => (
                    <li key={index}>{pattern.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 rounded-b-lg overflow-hidden">
          <div
            className="h-full bg-current transition-all duration-50 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}; 