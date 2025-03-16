import AlertBanner from './components/AlertBanner';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Features from './components/Features';
import CTA from './components/CTA';
import Footer from './components/Footer';

function App() {
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
}

export default App;
