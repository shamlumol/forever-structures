import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import './FloatingWhatsApp.scss';

const FloatingWhatsApp = () => {
  const phoneNumber = '919074467044';
  const message = encodeURIComponent('Hi Forever Structures, I would like to inquire about your services.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp fw-bold"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp />
      <span className="whatsapp-tooltip">Chat with us on WhatsApp</span>
    </a>
  );
};

export default FloatingWhatsApp;