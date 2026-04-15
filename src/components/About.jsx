import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './About.scss';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const stats = [
    { number: '5+', label: 'Years of Excellence' },
    { number: '12+', label: 'Projects Completed' },
    { number: 'A to Z', label: 'End to End Solutions' }
  ];

  return (
    <section id="about" className="about-premium">
      <Container>
        {/* Section Header */}
        <div className="section-header">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="header-subtitle">Our Story</span>
            <h2 className="header-title">
              Crafting <span>Legacies</span>
            </h2>
            <div className="header-line"></div>
          </motion.div>
        </div>

        <Row ref={ref}>
          <Col lg={6}>
            {/* Main Content */}
            <motion.div
              className="about-content"
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="about-quote">
                "Five years ago, we planted our flag in the misty peaks of Vagamon. 
                Today, we're known for crafting spaces that feel like they've always 
                belonged."
              </p>
              
              <p className="about-text">
                Forever Structures isn't just a construction company — we're storytellers 
                who use stone, wood, and light as our medium. From boutique resorts that 
                hug the clouds to private estates that redefine privacy, our portfolio 
                speaks of a deep reverence for the land.
              </p>
            </motion.div>
          </Col>

          <Col lg={6}>
            {/* Stats */}
            <motion.div
              className="stats-wrapper"
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="stats-grid">
                {stats.map((stat, index) => (
                  <motion.div 
                    key={index} 
                    className="stat-card"
                    whileHover={{ y: -5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <span className="stat-number">{stat.number}</span>
                    <span className="stat-label">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Founder Info */}
            <motion.div
              className="founder-info"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              whileHover={{ y: -5 }}
            >
              {/* <div className="founder-image">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                  alt="Founder"
                />
              </div> */}
<div className="founder-details">
  <h4>Jinto Kuttikattu</h4>
  <p>Founder | Real Estate & Property Consultant</p>
  <p className="founder-quote-alt fw-bold fs-6">20+ years of excellence in real estate</p>
  <p className="founder-quote fw-bolder">"Real estate is not just about land, it's about building futures."</p>
</div>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;