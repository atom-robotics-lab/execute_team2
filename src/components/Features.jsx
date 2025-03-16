import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Features = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  const features = [
    {
      title: "AI-Powered Media Detection",
      description: "Advanced deep learning algorithms to detect manipulated images and videos with high precision",
      icon: "🔍",
      color: "from-red-500 to-red-700",
      path: "/ai-detection"
    },
    {
      title: "Blockchain Authentication",
      description: "Verify content authenticity using distributed ledger technology",
      icon: "🔐",
      color: "from-gray-700 to-gray-900",
      path: "/blockchain-auth"
    },
    {
      title: "Explainable Misinformation Alerts",
      description: "Real-time alerts with detailed explanations of detected misinformation patterns",
      icon: "⚠️",
      color: "from-red-600 to-red-800",
      path: "/alerts"
    },
    {
      title: "Misinformation Heatmap",
      description: "Visual analytics of misinformation spread across platforms and regions",
      icon: "🌍",
      color: "from-red-700 to-red-900",
      path: "/heatmap"
    },
    {
      title: "Gamified Education",
      description: "Learn to spot fake news through interactive challenges and rewards",
      icon: "🎮",
      color: "from-gray-800 to-black",
      path: "/education"
    }
  ];

  const handleCardClick = (path) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
      {features.map((feature, index) => (
        <div
          key={index}
          className={`relative overflow-hidden rounded-xl p-6 bg-gradient-to-br ${feature.color} transform transition-all duration-300 ease-in-out cursor-pointer
            ${hoveredCard === index ? 'scale-105' : ''}`}
          onMouseEnter={() => setHoveredCard(index)}
          onMouseLeave={() => setHoveredCard(null)}
          onClick={() => handleCardClick(feature.path)}
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
  );
};

export default Features; 