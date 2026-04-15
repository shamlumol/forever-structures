import React, { useEffect, useRef, useState } from 'react';
import { Container } from 'react-bootstrap';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { FaArrowDown } from 'react-icons/fa';
import './Hero.scss';

const Hero = () => {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const cursorRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Smooth parallax with spring
  const y = useSpring(useTransform(scrollYProgress, [0, 1], ['0%', '25%']), {
    stiffness: 100,
    damping: 30,
    mass: 0.5
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  // Mouse move effect for custom cursor
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Set mouse position for parallax layers
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
      
      // Update custom cursor position
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Text reveal animation
  const titleVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
      rotateX: -15
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.9,
        ease: [0.33, 1, 0.68, 1]
      }
    })
  };

  // Letter animation for "Forever"
  const foreverLetters = "Forever".split('');
  
  // Word animation for "Structures"
  const structuresLetters = "Structures".split('');

  return (
    <section ref={containerRef} id="home" className="hero-premium">
      {/* Custom Cursor - Now properly positioned */}
      <div 
        ref={cursorRef}
        className={`custom-cursor ${cursorVariant === 'hover' ? 'hover' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: cursorVariant === 'hover' ? 60 : 30,
          height: cursorVariant === 'hover' ? 60 : 30,
          borderRadius: '50%',
          backgroundColor: 'rgba(243, 116, 18, 0.1)',
          border: '2px solid #F37412',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.3s ease, height 0.3s ease',
          backdropFilter: 'blur(2px)'
        }}
      />

      {/* Parallax Layers */}
      <motion.div 
        className="parallax-layer layer-1"
        animate={{
          x: mousePosition.x * 0.5,
          y: mousePosition.y * 0.5
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 30 }}
      />
      
      <motion.div 
        className="parallax-layer layer-2"
        animate={{
          x: mousePosition.x * -0.3,
          y: mousePosition.y * -0.3
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 30 }}
      />

      {/* Background Image with Parallax */}
      <motion.div className="hero-background" style={{ y, scale }}>
        <img 
          src="https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
          alt="Vagamon Hills"
        />
        <div className="hero-overlay"></div>
      </motion.div>

      {/* Animated Particles */}
      <div className="hero-particles">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              scale: 0
            }}
            animate={{
              x: [null, Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000)],
              y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000)],
              scale: [0, Math.random() * 0.5 + 0.3, 0],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              width: Math.random() * 10 + 2 + 'px',
              height: Math.random() * 10 + 2 + 'px',
              backgroundColor: i % 3 === 0 ? '#F07412' : 'rgba(243, 243, 243, 0.3)',
            }}
          />
        ))}
      </div>

      {/* Floating Geometric Shapes */}
      <div className="floating-shapes">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`shape shape-${i + 1}`}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}
      </div>

      {/* Decorative Lines */}
      <div className="decorative-lines">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="deco-line"
            animate={{
              x: ['-100%', '200%'],
              opacity: [0, 0.3, 0]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 2,
              ease: "linear"
            }}
            style={{
              top: `${30 + i * 20}%`,
              height: i % 2 === 0 ? '1px' : '2px'
            }}
          />
        ))}
      </div>

      <Container className="h-100">
        <motion.div 
          className="hero-content"
          style={{ opacity }}
        >
          {/* Left Column - Main Content */}
          <div className="hero-left">
            {/* Est. Badge with Slide Animation */}
            <motion.div 
              className="hero-est"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.span 
                className="est-line"
                initial={{ width: 0 }}
                animate={{ width: 40 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
              <motion.span 
                className="est-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                Est. 2021
              </motion.span>
            </motion.div>

            {/* Main Title with Letter Animation */}
            <div className="title-block">
              <motion.h1 
                className="hero-title"
                variants={titleVariants}
                initial="hidden"
                animate="visible"
                custom={0}
              >
                {foreverLetters.map((letter, index) => (
                  <motion.span
                    key={index}
                    className="title-letter"
                    initial={{ opacity: 0, y: 50, rotateZ: 10 }}
                    animate={{ opacity: 1, y: 0, rotateZ: 0 }}
                    transition={{
                      delay: 0.2 + index * 0.03,
                      duration: 0.5,
                      ease: [0.33, 1, 0.68, 1]
                    }}
                    whileHover={{
                      color: '#F07412',
                      scale: 1.1,
                      transition: { duration: 0.2 }
                    }}
                    onMouseEnter={() => setCursorVariant('hover')}
                    onMouseLeave={() => setCursorVariant('default')}
                  >
                    {letter === ' ' ? '\u00A0' : letter}
                  </motion.span>
                ))}
              </motion.h1>
              
              <motion.h2 
                className="hero-subtitle"
                variants={titleVariants}
                initial="hidden"
                animate="visible"
                custom={1}
              >
                {structuresLetters.map((letter, index) => (
                  <motion.span
                    key={index}
                    className="subtitle-letter"
                    initial={{ opacity: 0, y: 50, rotateZ: -10 }}
                    animate={{ opacity: 1, y: 0, rotateZ: 0 }}
                    transition={{
                      delay: 0.4 + index * 0.02,
                      duration: 0.5,
                      ease: [0.33, 1, 0.68, 1]
                    }}
                    whileHover={{
                      color: '#F07412',
                      scale: 1.1,
                      transition: { duration: 0.2 }
                    }}
                    onMouseEnter={() => setCursorVariant('hover')}
                    onMouseLeave={() => setCursorVariant('default')}
                  >
                    {letter === ' ' ? '\u00A0' : letter}
                  </motion.span>
                ))}
              </motion.h2>
            </div>

            {/* Location with Pulse Animation */}
            <motion.div 
              className="hero-location"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <motion.span 
                className="location-dot"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <span className="location-text">Vagamon, Kerala</span>
            </motion.div>

            {/* Description with Fade */}
            <motion.p 
              className="hero-description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              Crafting luxury resorts and dream homes in the misty peaks of Vagamon. 
              Five years of architectural excellence.
            </motion.p>

            {/* CTA Buttons with Hover Effects */}
            <motion.div 
              className="hero-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
            >
              <motion.button 
                className="btn-primary"
                onClick={() => scrollToSection('projects')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                <span>View Projects</span>
                <motion.span 
                  className="btn-arrow"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.button>
              
              <motion.button 
                className="btn-secondary"
                onClick={() => scrollToSection('contact')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                Contact Us
              </motion.button>
            </motion.div>
          </div>

          {/* Right Column - Stats with Staggered Animation */}
          <motion.div 
            className="hero-right"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.div 
              className="stats-wrapper"
              animate={{
                boxShadow: [
                  '0 0 0 rgba(240, 116, 18, 0)',
                  '0 0 30px rgba(240, 116, 18, 0.2)',
                  '0 0 0 rgba(240, 116, 18, 0)'
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {[
                { number: '5+', label: 'Years of Excellence' },
                { number: '12+', label: 'Projects Completed' },
                { number: '100%', label: 'Client Satisfaction' }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="stat-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  <motion.span 
                    className="stat-number"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, delay: index * 0.3, repeat: Infinity }}
                  >
                    {stat.number}
                  </motion.span>
                  <span className="stat-label">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll Indicator with Bounce */}
      <motion.div 
        className="scroll-indicator"
        animate={{ 
          y: [0, 8, 0],
          opacity: [0.4, 1, 0.4]
        }}
        transition={{ 
          duration: 2.5, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
        onClick={() => scrollToSection('about')}
        whileHover={{ scale: 1.2 }}
        onMouseEnter={() => setCursorVariant('hover')}
        onMouseLeave={() => setCursorVariant('default')}
      >
        <span className="scroll-text">Scroll</span>
        <FaArrowDown className="scroll-icon" />
      </motion.div>

      {/* Corner Decorations */}
      <div className="corner-decoration top-left"></div>
      <div className="corner-decoration top-right"></div>
      <div className="corner-decoration bottom-left"></div>
      <div className="corner-decoration bottom-right"></div>
    </section>
  );
};

export default Hero;