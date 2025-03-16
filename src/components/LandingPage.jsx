import AlertBanner from './AlertBanner';
import Hero from './Hero';
import Stats from './Stats';
import Features from './Features';
import CTA from './CTA';
import Footer from './Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-red-900">
      <AlertBanner />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <Hero />
        <Stats />
        <Features />
        <CTA />
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage; 