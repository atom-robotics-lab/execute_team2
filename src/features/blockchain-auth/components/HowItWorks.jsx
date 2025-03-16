const HowItWorks = () => {
  const steps = [
    {
      title: "Upload Content",
      description: "Upload any news article, image, or video that you want to verify",
      icon: "📤",
      color: "from-blue-500 to-blue-700"
    },
    {
      title: "Cryptographic Signature",
      description: "Our system generates a unique cryptographic signature and stores it on the blockchain",
      icon: "🔐",
      color: "from-purple-500 to-purple-700"
    },
    {
      title: "Track Modifications",
      description: "Monitor any changes or alterations made to the content over time",
      icon: "📊",
      color: "from-indigo-500 to-indigo-700"
    },
    {
      title: "Verify Authenticity",
      description: "Get detailed authenticity ratings based on the content's blockchain history",
      icon: "✅",
      color: "from-green-500 to-green-700"
    }
  ];

  return (
    <div className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-white text-center mb-16">
          How It Works
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/4 w-full h-px bg-gradient-to-r from-blue-500/50 to-transparent" />
              )}

              {/* Step Card */}
              <div className={`relative z-10 bg-gradient-to-br ${step.color} rounded-xl p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl`}>
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-white/80 text-sm">
                  {step.description}
                </p>
                <div className="absolute top-2 left-2 text-white/20 font-bold text-xl">
                  {index + 1}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our blockchain technology ensures immutable records of content authenticity,
            making it impossible for bad actors to manipulate information without detection.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks; 