import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Gallery from "./components/Gallery";
import Contact from './components/Contact';
import Footer from './components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/custom.scss';

function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: false,
      mirror: true,
      offset: 120,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    });

    // Simulate loading with progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

if (loading) {
  return (
    <div className="loading-screen">
      <div className="loading-container">
        {/* Logo Image */}
        <div className="loading-logo-image-wrapper">
          <img 
            src="/images/fs-logo.png" 
            alt="Forever Structures" 
            className="loading-logo-img"
          />
          <div className="loading-ring ring-1"></div>
          <div className="loading-ring ring-2"></div>
        </div>

        {/* Text Logo */}
        <div className="loading-text-logo">
          <span className="loading-forever">FOREVER</span>
          <span className="loading-structures">STRUCTURES</span>
        </div>

        {/* Progress Bar */}
        <div className="loading-progress-wrapper">
          <div className="loading-progress-bar">
            <div 
              className="loading-progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="loading-percentage">{progress}%</span>
        </div>

        {/* Loading Dots */}
        <div className="loading-dots">
          {[0, 1, 2].map((i) => (
            <div key={i} className="dot"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
  return (
    <AnimatePresence>
      <motion.div 
        className="app"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Navbar />
        <main>
          <Hero />
          <About />
          <Services />
          <Projects />
          <Gallery/>
          <Contact />
        </main>
        <Footer />
        <FloatingWhatsApp/>
      </motion.div>
    </AnimatePresence>
  );
}

export default App;