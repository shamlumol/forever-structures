import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import './Navbar.scss';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update active section
      const sections = ['home', 'about', 'services', 'projects', 'gallery', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const navItems = [
    { id: 'home', name: 'Home' },
    { id: 'about', name: 'About' },
    { id: 'services', name: 'Services' },
    { id: 'projects', name: 'Projects' },
    { id: 'gallery', name: 'Gallery' },
    { id: 'contact', name: 'Contact' }
  ];

  return (
    <>
      <nav className={`navbar-premium ${scrolled ? 'scrolled' : ''}`}>
        <Container>
          <div className="navbar-container">
            {/* Logo with Image */}
            <div className="navbar-logo" onClick={() => scrollToSection('home')}>
              <img 
                src="/images/fs-logo.png" 
                alt="Forever Structures"
                className="logo-image"
              />
              <div className="logo-text">
                <span className="logo-forever">FOREVER</span>
                <span className="logo-structures">STRUCTURES</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="navbar-links">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className={`mobile-menu-btn ${mobileMenuOpen ? 'open' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              <span></span>
              <span></span>
            </button>
          </div>
        </Container>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu-premium ${mobileMenuOpen ? 'open' : ''}`}> 
        <div className="mobile-menu-header">
          <div className="mobile-logo navbar-logo ">
            <img 
              src="/images/fs-logo.png" 
              alt="Forever Structures" 
              className="mobile-logo-image"
            />
              <div className="logo-text">
                <span className="logo-forever">FOREVER</span>
                <span className="logo-structures">STRUCTURES</span>
              </div>
              
            </div>
          <button 
            className="mobile-close"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        
        <div className="mobile-menu-links">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              className="mobile-nav-link"
              onClick={() => scrollToSection(item.id)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="mobile-menu-footer">
          <p> Vagamon, Kerala</p>
          <p> +91 9074467044</p>
          <p> +91 9847273761</p>
        </div>
      </div>
    </>
  );
};

export default Navbar;