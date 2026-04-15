import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Services.scss';

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const services = [
    {
      title: 'Commercial Construction',
      desc: 'High-quality commercial buildings designed for durability, functionality, and professional aesthetics.',
      features: ['Durable Structure', 'Modern Design', 'Efficient Layout']
    },
    {
      title: 'Residential Construction',
      desc: 'Custom homes and residential projects built to your specifications with premium materials.',
      features: ['Custom Design', 'Premium Materials', 'Quality Finishing']
    },
    {
      title: 'Permits & Paperwork',
      desc: 'Complete legal assistance for all your construction needs.',
      features: ['Licenses & Permits', 'Legal Compliance', 'Documentation']
    },
    {
      title: 'A to Z Project Execution',
      desc: 'Complete end-to-end management from initial concept through to final handover.',
      features: ['Total Management', 'Seamless Workflow', 'Complete Handover']
    },
    {
      title: 'Structural Construction',
      desc: 'Expert structural work with precision engineering and high-grade materials for lasting stability.',
      features: ['Precision Engineering', 'Reinforced Stability', 'High-Grade Materials']
    },
    {
      title: 'Interior Design',
      desc: 'Spaces where every detail whispers of timeless elegance.',
      features: ['Spatial Planning', 'Custom Furniture', 'Art Curation']
    },
    {
      title: 'Tile Work & Finishing',
      desc: 'Premium tile installation and finishing services that elevate the final look and feel.',
      features: ['Premium Installation', 'Seamless Finishing', 'Elegant Detailing']
    },
    {
      title: 'Epoxy Flooring',
      desc: 'Durable, high-gloss epoxy flooring for commercial and industrial spaces.',
      features: ['High Durability', 'Gloss Finish', 'Chemical Resistant']
    },
    {
      title: 'Water Tank Installation',
      desc: 'Professional water tank planning, installation, and waterproofing for all building types.',
      features: ['Leak-Proof Setup', 'Durable Materials', 'Expert Waterproofing']
    },
    {
      title: 'Landscaping',
      desc: 'Transformative landscaping solutions that enhance your outdoor spaces with thoughtful design, lush greenery, and precise execution for a balanced, beautiful environment.',
      features: ['Aesthetic Design', 'Lush Greenery', 'Precision Execution']
    },
    {
      title: 'Renovation & Upgrades',
      desc: 'Transforming existing spaces with thoughtful renovation and modern upgrade solutions.',
      features: ['Modern Makeover', 'Quality Enhancement', 'Space Optimization']
    },
    {
      title: 'Outdoor Structures',
      desc: 'Gazebos, pergolas, and outdoor structures blending beauty with structural integrity.',
      features: ['Elegant Craftsmanship', 'Weather-Resistant', 'Durable Framework']
    }
  ];

  return (
    <section id="services" className="services-premium">
      <Container>
        {/* Section Header */}
        <div className="section-header">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="header-subtitle">Expertise</span>
            <h2 className="header-title">
              What We <span>Do</span>
            </h2>
            <div className="header-line"></div>
          </motion.div>
        </div>

        {/* Services Grid */}
        <Row ref={ref} className="services-grid">
          {services.map((service, index) => (
            <Col lg={4} md={6} key={index} className="mb-4">
              <motion.div
                className="service-card"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <div className="card-number">0{index + 1}</div>
                <h3 className="card-title">{service.title}</h3>
                <p className="card-desc">{service.desc}</p>
                
                <ul className="card-features">
                  {service.features.map((feature, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.6 + index * 0.1 + i * 0.05 }}
                    >
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                <div className="card-line"></div>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Services;