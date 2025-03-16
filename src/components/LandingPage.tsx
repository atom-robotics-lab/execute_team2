import React, { useState, useEffect } from 'react';
import { MediaUpload } from './MediaUpload';
import { AnalysisResults } from './AnalysisResults';
import { analyzeMedia } from '../services/mediaAnalysis';
import { UploadModal } from './UploadModal';
import { MisinformationAlertDetails } from './MisinformationAlertDetails';
import { MisinformationDetail } from '../types/misinformation';
import { analyzeMisinformation } from '../services/misinformationAnalysis';

interface FeatureCard {
  title: string;
  description: string;
  icon: string;
  color: string;
  glowColor: string;
}

export const LandingPage: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [misinformationAlerts, setMisinformationAlerts] = useState<MisinformationDetail[]>([]);
  const [showAlertDetails, setShowAlertDetails] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleFileSelect = async (file: File) => {
    setIsAnalyzing(true);
    try {
      const baseConfidence = Math.random();
      const alerts = await analyzeMisinformation(file, baseConfidence);
      setMisinformationAlerts(alerts);
      setShowAlertDetails(true);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
      setShowUploadModal(false);
    }
  };

  const features: FeatureCard[] = [
    {
      title: "AI-Powered Media Detection",
      description: "Advanced deep learning algorithms to detect manipulated images and videos with high precision",
      icon: "🔍",
      color: "from-red-500 to-red-700",
      glowColor: "red"
    },
    {
      title: "Explainable Misinformation Alerts",
      description: "Real-time alerts with detailed explanations of detected misinformation patterns",
      icon: "⚠️",
      color: "from-red-600 to-red-800",
      glowColor: "orange"
    },
    {
      title: "Blockchain Authentication",
      description: "Verify content authenticity using distributed ledger technology",
      icon: "🔐",
      color: "from-gray-700 to-gray-900",
      glowColor: "blue"
    },
    {
      title: "Misinformation Heatmap",
      description: "Visual analytics of misinformation spread across platforms and regions",
      icon: "🌍",
      color: "from-red-700 to-red-900",
      glowColor: "purple"
    },
    {
      title: "Gamified Education",
      description: "Learn to spot fake news through interactive challenges and rewards",
      icon: "🎮",
      color: "from-gray-800 to-black",
      glowColor: "green"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-red-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-full bg-grid-pattern opacity-10"></div>
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-red-500/20 to-transparent blur-3xl transform -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-red-800/20 to-transparent blur-3xl transform translate-y-1/2"></div>
      </div>

      {/* Breaking News Alert Banner */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white px-4 py-3 flex items-center justify-center relative overflow-hidden shadow-lg">
        <div className="absolute inset-0 bg-stripes animate-slide"></div>
        <div className="relative flex items-center space-x-2">
          <span className="animate-pulse text-xl">🔴</span>
          <p className="text-sm font-medium tracking-wide">BREAKING: Misinformation levels at an all-time high. Stay protected.</p>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative">
        <div className="text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}">
          <div className="relative inline-block">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight relative z-10">
              <span className="text-red-500 animate-glow-red">TRUTH</span>
              <span className="text-white">GUARD</span>
            </h1>
            <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-red-800 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Advanced AI-powered defense against digital misinformation
          </p>
          
          <button className="btn btn-primary text-lg px-8 py-3 mb-12 transform hover:scale-105 transition-all duration-300 relative group">
            <span className="relative z-10">Get Started</span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 text-center">
            {[
              { value: "98%", label: "Detection Rate" },
              { value: "500K+", label: "Scans Daily" },
              { value: "50M+", label: "Users Protected" },
              { value: "24/7", label: "Active Defense" }
            ].map((stat, index) => (
              <div key={index} 
                className="bg-black/30 backdrop-blur-lg p-6 rounded-xl border border-white/10 transform hover:scale-105 transition-all duration-300 hover:bg-black/40"
              >
                <p className="text-red-500 text-3xl font-bold mb-2 animate-pulse-slow">{stat.value}</p>
                <p className="text-gray-400 text-sm tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`relative overflow-hidden rounded-xl p-6 bg-gradient-to-br ${feature.color} transform transition-all duration-500 ease-out ${
                  hoveredCard === index ? 'scale-105' : ''
                } ${feature.title === selectedFeature ? 'ring-4 ring-red-500' : ''} cursor-pointer group`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => {
                  if (feature.title === "Explainable Misinformation Alerts") {
                    if (misinformationAlerts.length > 0) {
                      setShowAlertDetails(true);
                    } else {
                      setShowUploadModal(true);
                    }
                  }
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/0 via-black/20 to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <span className="text-5xl mb-6 block transform group-hover:scale-110 transition-transform duration-300">{feature.icon}</span>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-200 text-sm leading-relaxed opacity-90">{feature.description}</p>
                  {feature.title === "Explainable Misinformation Alerts" && misinformationAlerts.length > 0 && (
                    <div className="mt-4 bg-white/20 backdrop-blur-sm rounded-lg p-3 transform transition-all duration-300 hover:bg-white/30">
                      <p className="text-sm text-white font-medium">
                        {misinformationAlerts.length} pattern{misinformationAlerts.length !== 1 ? 's' : ''} detected
                      </p>
                      <p className="text-xs text-white/80 mt-1">Click to view details</p>
                    </div>
                  )}
                </div>
                <div className={`absolute -inset-px bg-gradient-to-r from-${feature.glowColor}-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm`}></div>
              </div>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="text-center mt-20 relative">
            <div className="absolute inset-0 bg-gradient-radial from-red-500/20 to-transparent blur-2xl"></div>
            <h2 className="text-3xl font-bold text-white mb-6 relative">
              Ready to Fight Misinformation?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed relative">
              Join the global movement against digital deception. Start protecting yourself and your community today.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 mt-20 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-400 text-sm">
            © 2024 TruthGuard. All rights reserved. Powered by Advanced AI Technology.
          </div>
        </div>
      </footer>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl mx-4 transform transition-all duration-300 scale-100 opacity-100">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Upload Media for Analysis</h3>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
                >
                  <span className="text-2xl">×</span>
                </button>
              </div>
            </div>
            <div className="p-6">
              <MediaUpload onFileSelect={handleFileSelect} />
            </div>
          </div>
        </div>
      )}

      {/* Alert Details Modal */}
      {showAlertDetails && misinformationAlerts.length > 0 && (
        <MisinformationAlertDetails
          alerts={misinformationAlerts}
          onClose={() => setShowAlertDetails(false)}
        />
      )}
    </div>
  );
}; 