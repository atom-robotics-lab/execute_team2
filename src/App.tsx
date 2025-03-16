import React from 'react';
import { LandingPage } from './components/LandingPage';
import { AlertProvider } from './context/AlertContext';

function App() {
  return (
    <AlertProvider>
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-red-900 text-white">
        <LandingPage />
      </div>
    </AlertProvider>
  );
}

export default App; 