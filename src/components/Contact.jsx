import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaPhone, FaEnvelope, FaMapMarkerAlt} from 'react-icons/fa';
import './Contact.scss';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState('');

  // WhatsApp number 
  const WHATSAPP_NUMBER = '919074467044';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus('error');
      setTimeout(() => setFormStatus(''), 3000);
      return;
    }

    setFormStatus('sending');

    // Create WhatsApp message
    const message = `*Contact Form Submission from Forever Structures Website*%0A%0A
*Name:* ${formData.name}%0A
*Email:* ${formData.email}%0A
*Phone:* ${formData.phone || 'Not provided'}%0A
*Message:*%0A${formData.message}%0A%0A
---%0A
Sent from Forever Structures Website`;

    //WhatsApp URL
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

    window.open(whatsappUrl, '_blank');
    
    // Reset form
    setFormStatus('success');
    setFormData({ name: '', email: '', phone: '', message: '' });
    
    setTimeout(() => setFormStatus(''), 3000);
  };

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt />,
      label: 'Forever Structures',
      value: 'Vagamon, Idukki, 685503',
      isLink: false,
      href: null
    },
    {
      icon: <FaPhone />,
      label: 'Founder',
      value: '+91 9847273761',
      isLink: true,
      href: 'tel:+919847273761'
    },
    {
      icon: <FaPhone />,
      label: 'Proprietor',
      value: '+91 9074467044',
      isLink: true,
      href: 'tel:+919074467044'
    },
    {
      icon: <FaEnvelope />,
      label: 'Email',
      value: 'info@foreverstructures.co.in',
      isLink: true,
      href: 'mailto:info@foreverstructures.co.in'
    }
  ];

  return (
    <section id="contact" className="contact-premium">
      <Container>
        <div className="section-header">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="header-subtitle">Connect</span>
            <h2 className="header-title">
              Start Your <span>Journey</span>
            </h2>
            <div className="header-line"></div>
          </motion.div>
        </div>

        <Row ref={ref}>
          <Col lg={5}>
            <motion.div
              className="contact-info"
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="info-intro">
                Ready to bring your vision to life? Reach out to us for a consultation. 
                We'll respond within minutes on WhatsApp.
              </p>

              <div className="info-details">
                {contactInfo.map((item, index) => (
                  <motion.div 
                    key={index} 
                    className="info-item"
                    whileHover={{ x: 5 }}
                  >
                    <span className="item-icon">{item.icon}</span>
                    <div className="item-text">
                      <span className="item-label">{item.label}</span>
                      {item.isLink ? (
                        <a 
                          href={item.href}
                          className="item-value-link"
                          target={item.label === 'Email' ? '_blank' : '_self'}
                          rel={item.label === 'Email' ? 'noopener noreferrer' : ''}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span className="item-value">{item.value}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="info-hours">
                <h4>Studio Hours</h4>
                <div className="hours-grid">
                  <div className="hours-item">
                    <span>Monday — Saturday</span>
                    <span>7:00 AM — 9:00 PM</span>
                  </div>
                  <div className="hours-item">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </Col>

          <Col lg={7}>
            <motion.div
              className="contact-form"
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3>Send a Message</h3>
              <p className="form-note">
                Your message will be sent directly to our WhatsApp. We'll respond within minutes.
              </p>
              
              {formStatus === 'sending' && (
                <div className="info-message sending">Opening WhatsApp...</div>
              )}
              {formStatus === 'success' && (
                <div className="info-message success">WhatsApp opened! Send your message.</div>
              )}
              {formStatus === 'error' && (
                <div className="info-message error">Please fill all required fields.</div>
              )}
              
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="form-group">
                      <Form.Label>Your Name *</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder='Enter Your Full Name'
                        required
                      />
                    </Form.Group>
                  </Col>
                  
                  <Col md={6}>
                    <Form.Group className="form-group">
                      <Form.Label>Email Address *</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder='Enter Your Email'
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="form-group">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder='Enter Your Phone Number'
                  />
                </Form.Group>

                <Form.Group className="form-group">
                  <Form.Label>Your Message *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your vision..."
                    required
                  />
                </Form.Group>

                <motion.button 
                  type="submit" 
                  className="submit-btn whatsapp-btn"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Connect With Us</span>
                </motion.button>
              </Form>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact;