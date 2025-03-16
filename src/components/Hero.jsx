const Hero = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
        <span className="text-red-500">TRUTH</span>GUARD
      </h1>
      <p className="text-xl md:text-2xl text-gray-300 mb-8">
        Advanced AI-powered defense against digital misinformation
      </p>
      <div className="inline-flex items-center justify-center space-x-4">
        <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105">
          Get Started
        </button>
        <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition-all">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default Hero; 