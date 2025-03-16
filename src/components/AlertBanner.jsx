const AlertBanner = () => {
  return (
    <div className="bg-red-600 text-white px-4 py-2 flex items-center justify-center">
      <span className="animate-pulse mr-2">🔴</span>
      <p className="text-sm font-medium">BREAKING: Misinformation levels at an all-time high. Stay protected.</p>
    </div>
  );
};

export default AlertBanner; 