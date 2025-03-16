import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BlockchainAuth from './features/blockchain-auth/BlockchainAuth';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/blockchain-auth" element={<BlockchainAuth />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
