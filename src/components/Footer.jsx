import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt, FaArrowUp } from 'react-icons/fa';
import './Footer.scss';

const Footer = () => {
  const colors = {
    orange: '#F37412',
    darkNavy: '#1C2A44',
    offWhite: '#F2F2F2'
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    {
      icon: <FaInstagram />,
      url: 'https://www.instagram.com/forever_structures/',
      label: 'Instagram',
      color: '#E4405F'
    },
    {
      icon: <FaEnvelope />,
      url: 'mailto:info@foreverstructures.co.in',
      label: 'Email',
      color: colors.orange
    }
  ];

  return (
    <footer className="footer-premium">
      <Container>
        <Row className="footer-top">
          <Col lg={4} md={6} className="mb-4 mb-lg-0">
            <div className="footer-brand">
              <h3 className="brand-name">
                FOREVER <span>STRUCTURES</span>
              </h3>
              <p className="brand-tagline">
                Building timeless legacies in the misty hills of Vagamon since 2021
              </p>
            </div>
          </Col>

          <Col lg={4} md={6} className="mb-4 mb-lg-0">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              {['Home', 'About', 'Services', 'Projects', 'Gallery', 'Contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="footer-link-btn"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </Col>

          <Col lg={4} className="mb-4 mb-lg-0">
            <h4 className="footer-title">Connect With Us</h4>
            <div className="social-icons">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label={social.label}
                  style={{ '--hover-color': social.color }}
                >
                  {social.icon}
                  <span className="social-label">{social.label}</span>
                </a>
              ))}
            </div>

            <div className="contact-info-footer">
              <div className="contact-item">
                <FaMapMarkerAlt />
                <span>Vagamon, Idukki, Kerala 685503</span>
              </div>
              <div className="contact-item">
                <FaPhone />
                <span>+91 9074467044</span>
              </div>
              <div className="contact-item">
                <FaEnvelope />
                <a href="mailto:info@foreverstructures.co.in">info@foreverstructures.co.in</a>
              </div>
            </div>
          </Col>
        </Row>

        <div className="footer-bottom">
          <div className="footer-line"></div>
          
          {/* Back to Top Button */}
          <button onClick={scrollToTop} className="back-to-top-footer">
            <FaArrowUp />
            <span>Back to Top</span>
          </button>
          
          <p className="copyright">
            © {new Date().getFullYear()} Forever Structures. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;