import BlockchainHero from './components/BlockchainHero';
import HowItWorks from './components/HowItWorks';
import VerificationTool from './components/VerificationTool';
import CaseStudies from './components/CaseStudies';

const BlockchainAuth = () => {
  return (
    <div className="min-h-screen bg-black">
      <BlockchainHero />
      <HowItWorks />
      <VerificationTool />
      <CaseStudies />
    </div>
  );
};

export default BlockchainAuth; 