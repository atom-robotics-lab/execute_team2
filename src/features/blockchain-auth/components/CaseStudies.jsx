const CaseStudies = () => {
  const cases = [
    {
      title: "Manipulated Political Video Exposed",
      description: "A viral video showing a political figure making controversial statements was proven to be manipulated using our blockchain verification system.",
      originalDate: "2024-02-15",
      exposedDate: "2024-02-16",
      alterationType: "Video Splicing",
      views: "2.5M",
      impact: "Prevented widespread misinformation during election period"
    },
    {
      title: "Fake News Article Traced",
      description: "A fabricated news article about market manipulation was identified and traced back to its source using blockchain authentication.",
      originalDate: "2024-01-20",
      exposedDate: "2024-01-21",
      alterationType: "Content Fabrication",
      views: "500K",
      impact: "Protected investors from making decisions based on false information"
    },
    {
      title: "Deepfake Image Detection",
      description: "An AI-generated image claiming to show a natural disaster was quickly identified as synthetic through our verification process.",
      originalDate: "2024-03-01",
      exposedDate: "2024-03-01",
      alterationType: "AI Generation",
      views: "1.2M",
      impact: "Prevented panic and maintained public trust"
    }
  ];

  return (
    <div className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-white text-center mb-8">
          Real-World Impact
        </h2>
        <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
          Discover how our blockchain verification system has exposed and prevented the spread of misinformation.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((case_, index) => (
            <div 
              key={index}
              className="bg-gray-800/50 rounded-xl p-6 transform transition-all duration-300 hover:scale-105"
            >
              {/* Case Header */}
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">
                  {case_.title}
                </h3>
                <span className="bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded">
                  Exposed
                </span>
              </div>

              {/* Case Details */}
              <p className="text-gray-400 text-sm mb-4">
                {case_.description}
              </p>

              {/* Timeline */}
              <div className="border-l-2 border-gray-700 pl-4 mb-4">
                <div className="mb-2">
                  <p className="text-gray-500 text-xs">Original Content</p>
                  <p className="text-white text-sm">{case_.originalDate}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Exposed</p>
                  <p className="text-white text-sm">{case_.exposedDate}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700">
                <div>
                  <p className="text-gray-500 text-xs">Alteration Type</p>
                  <p className="text-white text-sm">{case_.alterationType}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Views Before Detection</p>
                  <p className="text-white text-sm">{case_.views}</p>
                </div>
              </div>

              {/* Impact */}
              <div className="mt-4 pt-4 border-t border-gray-700">
                <p className="text-gray-500 text-xs">Impact</p>
                <p className="text-green-400 text-sm">{case_.impact}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-8">
            Join the fight against misinformation and help maintain the integrity of digital content.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all">
            Start Verifying Content
          </button>
        </div>
      </div>
    </div>
  );
};

export default CaseStudies; 