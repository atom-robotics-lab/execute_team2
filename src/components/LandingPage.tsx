import { useState } from 'react';
import { MediaUpload } from './MediaUpload';
import { AnalysisResults } from './AnalysisResults';
import { analyzeMedia } from '../services/mediaAnalysis';
import { UploadModal } from './UploadModal';

interface FeatureCard {
  title: string;
  description: string;
  icon: string;
  color: string;
}

export const LandingPage = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const handleFileSelect = async (file: File) => {
    setIsAnalyzing(true);
    try {
      const result = await analyzeMedia(file);
      setAnalysisResult(result);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const features: FeatureCard[] = [
    {
      title: "AI-Powered Media Detection",
      description: "Advanced deep learning algorithms to detect manipulated images and videos with high precision",
      icon: "🔍",
      color: "from-red-500 to-red-700"
    },
    {
      title: "Explainable Misinformation Alerts",
      description: "Real-time alerts with detailed explanations of detected misinformation patterns",
      icon: "⚠️",
      color: "from-red-600 to-red-800"
    },
    {
      title: "Blockchain Authentication",
      description: "Verify content authenticity using distributed ledger technology",
      icon: "🔐",
      color: "from-gray-700 to-gray-900"
    },
    {
      title: "Misinformation Heatmap",
      description: "Visual analytics of misinformation spread across platforms and regions",
      icon: "🌍",
      color: "from-red-700 to-red-900"
    },
    {
      title: "Gamified Education",
      description: "Learn to spot fake news through interactive challenges and rewards",
      icon: "🎮",
      color: "from-gray-800 to-black"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-red-900">
      {/* Breaking News Alert Banner */}
      <div className="bg-red-600 text-white px-4 py-2 flex items-center justify-center">
        <span className="animate-pulse mr-2">🔴</span>
        <p className="text-sm font-medium">BREAKING: Misinformation levels at an all-time high. Stay protected.</p>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            <span className="text-red-500">TRUTH</span>GUARD
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Advanced AI-powered defense against digital misinformation
          </p>
          
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="btn btn-primary text-lg px-8 py-3 mb-12"
          >
            Get Started
          </button>

          {/* Analysis Results */}
          {(isAnalyzing || analysisResult) ? (
            <div className="max-w-3xl mx-auto mt-8 bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10">
              <AnalysisResults
                result={analysisResult}
                isLoading={isAnalyzing}
              />
            </div>
          ) : (
            <>
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 text-center">
                <div className="bg-black/30 p-4 rounded-lg backdrop-blur-sm">
                  <p className="text-red-500 text-2xl font-bold">98%</p>
                  <p className="text-gray-400">Detection Rate</p>
                </div>
                <div className="bg-black/30 p-4 rounded-lg backdrop-blur-sm">
                  <p className="text-red-500 text-2xl font-bold">500K+</p>
                  <p className="text-gray-400">Scans Daily</p>
                </div>
                <div className="bg-black/30 p-4 rounded-lg backdrop-blur-sm">
                  <p className="text-red-500 text-2xl font-bold">50M+</p>
                  <p className="text-gray-400">Users Protected</p>
                </div>
                <div className="bg-black/30 p-4 rounded-lg backdrop-blur-sm">
                  <p className="text-red-500 text-2xl font-bold">24/7</p>
                  <p className="text-gray-400">Active Defense</p>
                </div>
              </div>

              {/* Features */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={`relative overflow-hidden rounded-xl p-6 bg-gradient-to-br ${feature.color} transform transition-all duration-300 ease-in-out ${
                      hoveredCard === index ? 'scale-105' : ''
                    }`}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className="relative z-10">
                      <span className="text-4xl mb-4 block">{feature.icon}</span>
                      <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-200 text-sm">{feature.description}</p>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/0 to-black/20 z-0"></div>
                  </div>
                ))}
              </div>

              {/* Footer CTA */}
              <div className="text-center mt-20">
                <h2 className="text-3xl font-bold text-white mb-6">
                  Ready to Fight Misinformation?
                </h2>
                <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                  Join the global movement against digital deception. Start protecting yourself and your community today.
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-400 text-sm">
            © 2024 TruthGuard. All rights reserved. Powered by Advanced AI Technology.
          </div>
        </div>
      </footer>

      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onFileSelect={handleFileSelect}
      />
    </div>
  );
}; 