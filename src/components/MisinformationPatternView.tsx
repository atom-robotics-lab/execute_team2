import React from 'react';
import { MisinformationPattern } from '../types/misinformation';

interface PatternViewProps {
  pattern: MisinformationPattern;
  onAreaHover?: (area?: { x: number; y: number; width: number; height: number }) => void;
}

export const MisinformationPatternView: React.FC<PatternViewProps> = ({
  pattern,
  onAreaHover
}) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-3 hover:bg-gray-50 transition-colors">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-lg font-medium text-gray-900">{pattern.name}</h4>
          <p className="text-sm text-gray-600 mt-1">{pattern.description}</p>
        </div>
        <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
          {(pattern.confidence * 100).toFixed(0)}% confidence
        </div>
      </div>

      {pattern.detectedAreas && pattern.detectedAreas.length > 0 && (
        <div className="mt-3">
          <p className="text-sm font-medium text-gray-700 mb-2">Detected Areas:</p>
          <div className="space-y-2">
            {pattern.detectedAreas.map((area, index) => (
              <div
                key={index}
                className="text-sm p-2 bg-gray-50 rounded cursor-pointer hover:bg-gray-100"
                onMouseEnter={() => onAreaHover?.(area)}
                onMouseLeave={() => onAreaHover?.()}
              >
                <p className="text-gray-600">{area.description}</p>
                <p className="text-gray-500 text-xs mt-1">
                  Region: ({area.x}, {area.y}) - {area.width}x{area.height}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}; 