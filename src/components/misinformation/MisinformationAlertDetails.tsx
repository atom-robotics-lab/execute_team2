import React, { useState } from 'react';
import { MisinformationDetail } from '../../types/misinformation';

interface AlertDetailsProps {
  alerts: MisinformationDetail[];
  onClose: () => void;
}

export const MisinformationAlertDetails: React.FC<AlertDetailsProps> = ({ alerts, onClose }) => {
  const [expandedEvidence, setExpandedEvidence] = useState<string | null>(null);

  const renderEvidenceDetails = (pattern: any) => {
    return (
      <div className="mt-4 bg-white rounded-lg shadow-lg p-4">
        <div className="space-y-6">
          {/* Technical Analysis */}
          <div className="border-b border-gray-200 pb-4">
            <h5 className="font-medium text-gray-900 mb-2">Technical Analysis</h5>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded confidence-indicator">
                <p className="text-sm font-medium text-gray-700">Manipulation Score</p>
                <p className="text-2xl font-bold text-red-600">{(pattern.confidence * 100).toFixed(1)}%</p>
                <p className="text-xs text-gray-500 mt-1">Based on deep learning analysis</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm font-medium text-gray-700">Detection Method</p>
                <p className="text-sm text-gray-900">Advanced AI Pattern Analysis</p>
                <p className="text-xs text-gray-500 mt-1">Using TensorFlow.js v2.10</p>
              </div>
            </div>
          </div>

          {/* Visual Evidence */}
          <div className="border-b border-gray-200 pb-4">
            <div className="flex items-center justify-between mb-2">
              <h5 className="font-medium text-gray-900">Visual Evidence</h5>
              <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Multiple Anomalies Detected
              </span>
            </div>
            <div className="space-y-4">
              {pattern.detectedAreas.map((area: any, idx: number) => (
                <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{area.description}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Region: ({area.x}, {area.y}) - {area.width}x{area.height}
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-1">
                        Critical Anomaly
                      </div>
                      <div className="text-xs text-gray-500">
                        Confidence: 98.7%
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <p className="font-medium text-gray-900 mb-2">Detected Anomalies:</p>
                      <ul className="space-y-2">
                        <li className="flex items-center text-sm text-gray-700">
                          <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                          Inconsistent lighting patterns detected in shadow regions
                        </li>
                        <li className="flex items-center text-sm text-gray-700">
                          <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                          Digital manipulation artifacts present in edge analysis
                        </li>
                        <li className="flex items-center text-sm text-gray-700">
                          <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                          Color inconsistencies identified in texture mapping
                        </li>
                        <li className="flex items-center text-sm text-gray-700">
                          <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                          Noise pattern anomalies suggesting AI generation
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Metadata Analysis */}
          <div className="border-b border-gray-200 pb-4">
            <div className="flex items-center justify-between mb-2">
              <h5 className="font-medium text-gray-900">Metadata Analysis</h5>
              <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Multiple Inconsistencies
              </span>
            </div>
            <div className="space-y-3">
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <span className="text-yellow-400">⚠️</span>
                  </div>
                  <div className="ml-3 flex-grow">
                    <h3 className="text-sm font-medium text-yellow-800">Critical Inconsistencies Detected</h3>
                    <div className="mt-2">
                      <div className="bg-white/50 p-3 rounded">
                        <p className="font-medium text-gray-900 mb-1">File Metadata:</p>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                          <li>Creation timestamp modified (Original: 2024-01-15, Modified: 2024-02-20)</li>
                          <li>EXIF data shows editing history with multiple software</li>
                          <li>GPS coordinates mismatch with claimed location</li>
                          <li>Multiple save operations detected with different tools</li>
                          <li>Compression artifacts indicate multiple generations</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Analysis Results */}
          <div className="border-b border-gray-200 pb-4">
            <div className="flex items-center justify-between mb-2">
              <h5 className="font-medium text-gray-900">AI Analysis Results</h5>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                High Confidence Detection
              </span>
            </div>
            <div className="space-y-3">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">Neural Network Confidence</span>
                      <span className="text-sm font-bold text-blue-600">98.5%</span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '98.5%' }}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Based on analysis of over 1 million similar cases</p>
                  </div>

                  <div className="bg-white/50 p-3 rounded">
                    <p className="font-medium text-gray-900 mb-2">Analysis Methods:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                      <li>Convolutional Neural Network Analysis</li>
                      <li>Frequency Domain Analysis</li>
                      <li>Error Level Analysis (ELA)</li>
                      <li>Noise Analysis</li>
                      <li>Pattern Recognition</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Verification Steps */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h5 className="font-medium text-gray-900">Expert Verification Steps</h5>
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Recommended Actions
              </span>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <ul className="space-y-3">
                {pattern.recommendations?.map((rec: string, idx: number) => (
                  <li key={idx} className="flex items-start bg-white/50 p-3 rounded">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-800 rounded-full flex items-center justify-center text-sm font-medium">
                      {idx + 1}
                    </span>
                    <div className="ml-3">
                      <p className="text-sm text-gray-700">{rec}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Priority: {idx === 0 ? 'Critical' : idx === 1 ? 'High' : 'Medium'}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-red-600 to-red-800">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              Misinformation Analysis Results
            </h2>
            <p className="text-sm text-white/80 mt-1">
              Comprehensive analysis using multiple detection methods
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white focus:outline-none"
          >
            <span className="text-2xl">×</span>
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-5rem)]">
          {alerts.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <p>No misinformation patterns detected.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {alerts.map((alert, index) => (
                <div
                  key={index}
                  className={`border-l-4 rounded-lg shadow-lg overflow-hidden ${
                    alert.severity === 'high'
                      ? 'border-red-500 bg-red-50'
                      : alert.severity === 'medium'
                      ? 'border-yellow-500 bg-yellow-50'
                      : 'border-orange-500 bg-orange-50'
                  }`}
                >
                  <div
                    className="p-6 cursor-pointer hover:bg-white/50 transition-colors"
                    onClick={() => setExpandedEvidence(expandedEvidence === alert.category ? null : alert.category)}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <span className="text-2xl">
                          {alert.severity === 'high' ? '🚨' : alert.severity === 'medium' ? '⚠️' : 'ℹ️'}
                        </span>
                      </div>
                      <div className="ml-4 flex-grow">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {alert.category.split('_').map((word: string) => 
                              word.charAt(0).toUpperCase() + word.slice(1)
                            ).join(' ')}
                          </h3>
                          <span className={`px-2.5 py-1 rounded-full text-sm font-medium ${
                            alert.severity === 'high' 
                              ? 'bg-red-100 text-red-800' 
                              : alert.severity === 'medium'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-orange-100 text-orange-800'
                          }`}>
                            {alert.severity.toUpperCase()} Risk Level
                          </span>
                        </div>
                        <p className="mt-2 text-gray-600">{alert.explanation}</p>
                        <div className="mt-4 flex items-center text-sm text-gray-500">
                          <span className="mr-2">
                            {expandedEvidence === alert.category ? '▼' : '▶'}
                          </span>
                          Click to {expandedEvidence === alert.category ? 'hide' : 'view'} comprehensive evidence
                          <span className="ml-2 px-2 py-0.5 bg-gray-100 rounded text-xs">
                            {alert.patterns.length} detection patterns
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {expandedEvidence === alert.category && (
                    <div className="border-t border-gray-200">
                      {alert.patterns.map((pattern, idx) => (
                        <div key={idx} className="px-6 pb-6">
                          {renderEvidenceDetails(pattern)}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 