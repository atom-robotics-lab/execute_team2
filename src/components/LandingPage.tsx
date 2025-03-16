import { useState, useEffect } from 'react';

interface FeatureCard {
  title: string;
  description: string;
  icon: string;
  color: string;
  stats?: {
    value: string;
    label: string;
  };
}

interface LandingPageProps {
  onFeatureClick: (feature: string) => void;
}

export function LandingPage({ onFeatureClick }: LandingPageProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [animatedStats, setAnimatedStats] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      if (window.scrollY > 300) {
        setAnimatedStats(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features: FeatureCard[] = [
    {
      title: "AI-Powered Media Detection",
      description: "Advanced deep learning algorithms to detect manipulated images and videos with high precision",
      icon: "🔍",
      color: "from-purple-500 to-indigo-600",
      stats: {
        value: "98%",
        label: "Detection Accuracy"
      }
    },
    {
      title: "Explainable Misinformation Alerts",
      description: "Real-time alerts with detailed explanations of detected misinformation patterns",
      icon: "⚠️",
      color: "from-amber-500 to-orange-600",
      stats: {
        value: "500K+",
        label: "Daily Alerts"
      }
    },
    {
      title: "Collaborative Fact-Checking",
      description: "Join the community in verifying content, voting on credibility, and sharing trusted sources",
      icon: "👥",
      color: "from-blue-500 to-cyan-600",
      stats: {
        value: "50K+",
        label: "Active Checkers"
      }
    },
    {
      title: "Blockchain Authentication",
      description: "Verify content authenticity using distributed ledger technology",
      icon: "🔐",
      color: "from-emerald-500 to-teal-600",
      stats: {
        value: "1M+",
        label: "Verified Records"
      }
    },
    {
      title: "Misinformation Heatmap",
      description: "Visual analytics of misinformation spread across platforms and regions",
      icon: "🌍",
      color: "from-rose-500 to-pink-600",
      stats: {
        value: "180+",
        label: "Countries Covered"
      }
    },
    {
      title: "Gamified Education",
      description: "Learn to spot fake news through interactive challenges and rewards",
      icon: "🎮",
      color: "from-violet-500 to-purple-600",
      stats: {
        value: "2M+",
        label: "Active Players"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-red-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-[10px] opacity-50">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-pulse"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-red-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-md py-4' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-white">
                <span className="text-red-500">TRUTH</span>GUARD
              </h1>
              <div className="hidden md:flex space-x-6">
                <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
                <a href="#stats" className="text-gray-300 hover:text-white transition-colors">Stats</a>
                <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
              </div>
            </div>
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-all transform hover:scale-105">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Breaking News Alert Banner */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white px-4 py-3 flex items-center justify-center mt-20">
        <div className="flex items-center space-x-4 animate-marquee">
          <span className="animate-pulse">🔴</span>
          <p className="text-sm font-medium">BREAKING: Misinformation levels at an all-time high. Stay protected.</p>
          <span className="h-4 w-px bg-red-400/50"></span>
          <p className="text-sm font-medium">New AI detection models deployed worldwide.</p>
          <span className="h-4 w-px bg-red-400/50"></span>
          <p className="text-sm font-medium">Community fact-checkers prevent major disinformation campaign.</p>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
            <span className="inline-block animate-text-gradient bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Defend Truth
            </span>
            <br />
            in the Digital Age
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Advanced AI-powered defense against digital misinformation,
            <br className="hidden md:block" />
            protecting communities worldwide in real-time.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-800 text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/25">
              Start Protecting Now
            </button>
            <button className="w-full sm:w-auto border border-white/20 bg-white/10 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all backdrop-blur-sm">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
        <div className="absolute bottom-1/4 right-10 w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-float animation-delay-2000"></div>
      </div>

      {/* Stats Section */}
      <div className="relative py-20 bg-black/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className={`text-center transform transition-all duration-1000 ${
              animatedStats ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <p className="text-red-500 text-4xl font-bold mb-2">98%</p>
              <p className="text-gray-400">Detection Rate</p>
            </div>
            <div className={`text-center transform transition-all duration-1000 delay-300 ${
              animatedStats ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <p className="text-red-500 text-4xl font-bold mb-2">500K+</p>
              <p className="text-gray-400">Scans Daily</p>
            </div>
            <div className={`text-center transform transition-all duration-1000 delay-500 ${
              animatedStats ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <p className="text-red-500 text-4xl font-bold mb-2">50M+</p>
              <p className="text-gray-400">Users Protected</p>
            </div>
            <div className={`text-center transform transition-all duration-1000 delay-700 ${
              animatedStats ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <p className="text-red-500 text-4xl font-bold mb-2">24/7</p>
              <p className="text-gray-400">Active Defense</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
          Comprehensive Protection Features
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-xl p-6 bg-gradient-to-br ${feature.color} transform transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => onFeatureClick(feature.title)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-black/0 via-black/0 to-black/20 z-0 
                group-hover:via-black/10 transition-all duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-5xl transform group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </span>
                  {feature.stats && (
                    <div className="text-right">
                      <p className="text-2xl font-bold text-white">{feature.stats.value}</p>
                      <p className="text-sm text-white/80">{feature.stats.label}</p>
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white/90">
                  {feature.title}
                </h3>
                <p className="text-white/80 text-sm leading-relaxed group-hover:text-white/70">
                  {feature.description}
                </p>
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white/90">Explore →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 to-purple-900/20 mix-blend-multiply"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
            Ready to Fight Misinformation?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join the global movement against digital deception. Start protecting yourself and your community today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-800 text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/25">
              Start Your Free Trial
            </button>
            <button className="w-full sm:w-auto border border-white/20 bg-white/10 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all backdrop-blur-sm">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-20 bg-black/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 TruthGuard. All rights reserved. Powered by Advanced AI Technology.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 