import { useState, useEffect } from 'react';

const BlockchainHero = () => {
  const [animationStep, setAnimationStep] = useState(0);

  // Simulate blockchain verification animation
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStep((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute h-px w-px bg-blue-500 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-24 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Verify the Truth, Fight Fake News
        </h1>
        <p className="text-xl text-blue-200 mb-12 max-w-3xl mx-auto">
          Blockchain-powered source authentication for news, images, and videos.
          Ensuring transparency and trust in digital content.
        </p>

        {/* Animated Verification Process */}
        <div className="flex justify-center mb-12">
          <div className="grid grid-cols-4 gap-4 items-center">
            {['Upload', 'Verify', 'Track', 'Trust'].map((step, index) => (
              <div
                key={step}
                className={`flex flex-col items-center transition-all duration-500 ${
                  animationStep === index ? 'scale-110 text-blue-400' : 'text-gray-400'
                }`}
              >
                <div className="w-12 h-12 rounded-full border-2 border-current flex items-center justify-center mb-2">
                  {index === 0 && '📤'}
                  {index === 1 && '🔐'}
                  {index === 2 && '📊'}
                  {index === 3 && '✅'}
                </div>
                <span className="text-sm">{step}</span>
                {index < 3 && (
                  <div className="h-px w-16 bg-current absolute translate-x-20" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold 
                     transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50"
        >
          Start Verifying Now
        </button>
      </div>
    </div>
  );
};

export default BlockchainHero; 