import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { MisinformationHeatmap } from './components/MisinformationHeatmap';

function App() {
  const [showHeatmap, setShowHeatmap] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {showHeatmap ? (
        <MisinformationHeatmap onClose={() => setShowHeatmap(false)} />
      ) : (
        <LandingPage onHeatmapClick={() => setShowHeatmap(true)} />
      )}
    </div>
  );
}

export default App; 