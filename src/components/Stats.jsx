const Stats = () => {
  const stats = [
    { value: "98%", label: "Detection Rate" },
    { value: "500K+", label: "Scans Daily" },
    { value: "50M+", label: "Users Protected" },
    { value: "24/7", label: "Active Defense" }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 text-center">
      {stats.map((stat, index) => (
        <div key={index} className="bg-black/30 p-4 rounded-lg backdrop-blur-sm">
          <p className="text-red-500 text-2xl font-bold">{stat.value}</p>
          <p className="text-gray-400">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default Stats; 