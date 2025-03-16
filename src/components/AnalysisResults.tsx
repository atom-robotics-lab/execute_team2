import React, { useState } from 'react';
import { MisinformationDetail } from '../types/misinformation';
import { MisinformationPatternView } from './MisinformationPatternView';

interface AnalysisResult {
  isManipulated: boolean;
  confidence: number;
  detectionMethod: string;
  manipulatedRegions?: {
    x: number;
    y: number;
    width: number;
    height: number;
  }[];
  additionalInfo?: {
    key: string;
    value: string;
  }[];
  misinformationDetails?: MisinformationDetail[];
}

interface AnalysisResultsProps {
  result: AnalysisResult | null;
  isLoading: boolean;
  onAreaHighlight?: (area?: { x: number; y: number; width: number; height: number }) => void;
}

export const AnalysisResults = ({ result, isLoading, onAreaHighlight }: AnalysisResultsProps) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  const confidenceColor = result.confidence > 0.8 
    ? 'text-red-600' 
    : result.confidence > 0.5 
      ? 'text-yellow-600' 
      : 'text-green-600';

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'border-red-500 bg-red-50';
      case 'medium':
        return 'border-yellow-500 bg-yellow-50';
      case 'low':
        return 'border-orange-500 bg-orange-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Analysis Results</h3>
        
        <div className="space-y-4">
          <div>
            <p className="text-lg font-medium">
              Status: {' '}
              <span className={result.isManipulated ? 'text-red-600' : 'text-green-600'}>
                {result.isManipulated ? 'Potentially Manipulated' : 'Likely Authentic'}
              </span>
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Confidence Score</p>
            <p className={`text-lg font-medium ${confidenceColor}`}>
              {(result.confidence * 100).toFixed(1)}%
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Detection Method</p>
            <p className="text-base">{result.detectionMethod}</p>
          </div>

          {result.additionalInfo && result.additionalInfo.length > 0 && (
            <div>
              <p className="text-sm text-gray-600 mb-2">Additional Information</p>
              <dl className="grid grid-cols-2 gap-2">
                {result.additionalInfo.map(({ key, value }) => (
                  <div key={key} className="col-span-1">
                    <dt className="text-xs text-gray-500">{key}</dt>
                    <dd className="text-sm">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>

      {result.misinformationDetails && result.misinformationDetails.length > 0 && (
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Misinformation Analysis</h3>
          <div className="space-y-4">
            {result.misinformationDetails.map((detail, index) => (
              <div
                key={index}
                className={`border rounded-lg overflow-hidden ${getSeverityColor(detail.severity)}`}
              >
                <div
                  className="p-4 cursor-pointer"
                  onClick={() => setExpandedCategory(
                    expandedCategory === detail.category ? null : detail.category
                  )}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-lg font-medium">
                        {detail.category.split('_').map(word => 
                          word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(' ')}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">{detail.explanation}</p>
                    </div>
                    <span className="text-sm font-medium capitalize">
                      {detail.severity} Risk
                    </span>
                  </div>
                </div>

                {expandedCategory === detail.category && (
                  <div className="border-t p-4 bg-white">
                    <div className="space-y-4">
                      {detail.patterns.map((pattern, idx) => (
                        <MisinformationPatternView
                          key={idx}
                          pattern={pattern}
                          onAreaHover={onAreaHighlight}
                        />
                      ))}

                      {detail.recommendations.length > 0 && (
                        <div className="mt-4">
                          <h5 className="text-sm font-medium text-gray-900 mb-2">
                            Verification Steps:
                          </h5>
                          <ul className="list-disc list-inside space-y-1">
                            {detail.recommendations.map((rec, idx) => (
                              <li key={idx} className="text-sm text-gray-600">
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {detail.sourceAnalysis && (
                        <div className="mt-4 p-3 bg-gray-50 rounded">
                          <h5 className="text-sm font-medium text-gray-900 mb-2">
                            Source Analysis
                          </h5>
                          <p className="text-sm text-gray-600">
                            Verification Status:{' '}
                            <span className="capitalize">{detail.sourceAnalysis.verificationStatus}</span>
                          </p>
                          {detail.sourceAnalysis.originalContext && (
                            <p className="text-sm text-gray-600 mt-1">
                              Original Context: {detail.sourceAnalysis.originalContext}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}; 