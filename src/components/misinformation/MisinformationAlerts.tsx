import React, { useState, useCallback } from 'react';
import { MisinformationDetail, MisinformationPattern } from '../../types/misinformation';
import { RealTimeAlert } from './RealTimeAlert';
import { MisinformationAlertDetails } from './MisinformationAlertDetails';
import { Header } from '../ui/Header';

interface MisinformationAlertsProps {
  onClose: () => void;
}

export function MisinformationAlerts({ onClose }: MisinformationAlertsProps) {
  const [selectedAlert, setSelectedAlert] = useState<MisinformationDetail | null>(null);
  const [alerts] = useState<MisinformationDetail[]>([
    {
      category: 'visual_manipulation',
      patterns: [
        {
          name: 'Lighting Inconsistency',
          confidence: 0.95,
          detectedAreas: [
            {
              x: 100,
              y: 100,
              width: 200,
              height: 200,
              description: 'Inconsistent shadow patterns detected in facial region'
            }
          ],
          recommendations: [
            'Verify the original source of the image',
            'Check metadata for editing history',
            'Compare with trusted reference images'
          ]
        },
        {
          name: 'Digital Artifact Detection',
          confidence: 0.92,
          detectedAreas: [
            {
              x: 150,
              y: 150,
              width: 100,
              height: 100,
              description: 'Compression artifacts indicating multiple edits'
            }
          ]
        }
      ],
      explanation: 'Multiple visual inconsistencies detected in the image that suggest sophisticated manipulation',
      severity: 'high',
      recommendations: [
        'Verify the original source of the image',
        'Check metadata for editing history',
        'Compare with trusted reference images'
      ],
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
      sourceAnalysis: {
        verificationStatus: 'pending',
        potentialSources: ['news_outlet_a.com/original', 'social_media_platform/viral_post']
      }
    },
    {
      category: 'ai_generation',
      patterns: [
        {
          name: 'GAN Pattern Detection',
          confidence: 0.88,
          detectedAreas: [
            {
              x: 0,
              y: 0,
              width: 512,
              height: 512,
              description: 'AI generation artifacts consistent with StyleGAN2'
            }
          ],
          recommendations: [
            'Run reverse image search',
            'Check for similar AI-generated content',
            'Verify if source claims originality'
          ]
        }
      ],
      explanation: 'Image shows characteristic patterns of AI generation using advanced GAN models',
      severity: 'high',
      recommendations: [
        'Flag content as AI-generated',
        'Request source verification',
        'Check for similar generated images'
      ],
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
      sourceAnalysis: {
        verificationStatus: 'rejected',
        potentialSources: ['ai_art_generator.com']
      }
    },
    {
      category: 'metadata_tampering',
      patterns: [
        {
          name: 'EXIF Manipulation',
          confidence: 0.85,
          detectedAreas: [
            {
              x: 0,
              y: 0,
              width: 1024,
              height: 1024,
              description: 'Modified timestamp and location data'
            }
          ]
        }
      ],
      explanation: 'Image metadata shows signs of tampering, including modified timestamps and location data',
      severity: 'medium',
      recommendations: [
        'Extract original metadata',
        'Verify image creation date',
        'Check location consistency'
      ],
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
      sourceAnalysis: {
        verificationStatus: 'pending',
        potentialSources: []
      }
    },
    {
      category: 'context_manipulation',
      patterns: [
        {
          name: 'Temporal Mismatch',
          confidence: 0.78,
          detectedAreas: [
            {
              x: 0,
              y: 0,
              width: 800,
              height: 600,
              description: 'Image from different time period used out of context'
            }
          ]
        }
      ],
      explanation: 'Image appears to be from a different time period, being used to misrepresent current events',
      severity: 'medium',
      recommendations: [
        'Verify image timeline',
        'Check original context',
        'Search for similar historical images'
      ],
      timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 minutes ago
      sourceAnalysis: {
        verificationStatus: 'pending',
        potentialSources: ['historical_archive.org/2020', 'news_archive.com/2021']
      }
    },
    {
      category: 'visual_manipulation',
      patterns: [
        {
          name: 'Object Removal',
          confidence: 0.82,
          detectedAreas: [
            {
              x: 300,
              y: 200,
              width: 150,
              height: 150,
              description: 'Evidence of content-aware fill usage'
            }
          ]
        }
      ],
      explanation: 'Analysis reveals object removal and background manipulation using advanced editing tools',
      severity: 'low',
      recommendations: [
        'Compare with original scene photos',
        'Check for missing elements',
        'Verify with alternative angles'
      ],
      timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
      sourceAnalysis: {
        verificationStatus: 'pending',
        potentialSources: []
      }
    }
  ]);

  const handleDismissAlert = useCallback(() => {
    setSelectedAlert(null);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      <Header title="Explainable Misinformation Alerts" onClose={onClose} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Alert Feed */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Recent Alerts</h2>
              <div className="space-y-4">
                {alerts.map((alert, index) => (
                  <div
                    key={index}
                    className="bg-gray-700 rounded-lg p-4 cursor-pointer hover:bg-gray-600 transition-colors"
                    onClick={() => setSelectedAlert(alert)}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <span className="text-2xl">
                          {alert.severity === 'high' ? '🚨' : alert.severity === 'medium' ? '⚠️' : 'ℹ️'}
                        </span>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-white">
                          {alert.category.split('_').map((word: string) => 
                            word.charAt(0).toUpperCase() + word.slice(1)
                          ).join(' ')}
                        </h3>
                        <p className="text-gray-300 mt-1">{alert.explanation}</p>
                        <div className="mt-2 flex items-center space-x-4">
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                            alert.severity === 'high' 
                              ? 'bg-red-900/50 text-red-200' 
                              : alert.severity === 'medium'
                              ? 'bg-yellow-900/50 text-yellow-200'
                              : 'bg-orange-900/50 text-orange-200'
                          }`}>
                            {alert.severity.toUpperCase()} Risk
                          </span>
                          <span className="text-gray-400 text-sm">
                            {new Date(alert.timestamp).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Statistics and Insights */}
          <div>
            <div className="bg-gray-800 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Alert Statistics</h2>
              <div className="space-y-6">
                <div className="bg-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Risk Distribution</h3>
                  <div className="flex items-center space-x-2">
                    <div className="h-4 flex-grow rounded-full overflow-hidden bg-gray-600">
                      <div className="h-full bg-red-500" style={{ width: '40%' }}></div>
                      <div className="h-full bg-yellow-500" style={{ width: '35%' }}></div>
                      <div className="h-full bg-orange-500" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                  <div className="mt-2 grid grid-cols-3 gap-2 text-sm">
                    <div className="text-center">
                      <div className="text-red-400">High</div>
                      <div className="text-white font-semibold">40%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-yellow-400">Medium</div>
                      <div className="text-white font-semibold">35%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-orange-400">Low</div>
                      <div className="text-white font-semibold">25%</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Detection Methods</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Visual Analysis</span>
                      <span className="text-white font-semibold">45%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Metadata Check</span>
                      <span className="text-white font-semibold">30%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">AI Pattern Detection</span>
                      <span className="text-white font-semibold">25%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Details Modal */}
      {selectedAlert && (
        <MisinformationAlertDetails
          alerts={[selectedAlert]}
          onClose={handleDismissAlert}
        />
      )}

      {/* Real-time Alert Demo */}
      <RealTimeAlert
        alert={alerts[0]}
        onDismiss={() => {}}
      />
    </div>
  );
} 