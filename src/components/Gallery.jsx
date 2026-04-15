import React, { useState } from 'react';
import { Container, Modal } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { galleryImages } from './data/GalleryData';
import './Gallery.scss';

const Gallery = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState('upcoming');
  const [hoveredId, setHoveredId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter images based on project status
  const filteredImages = activeFilter === 'upcoming' 
    ? galleryImages.filter(img => img.projectStatus === 'upcoming')
    : galleryImages.filter(img => img.projectStatus === 'ongoing');

  // Pagination logic
  const totalPages = Math.ceil(filteredImages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedImages = filteredImages.slice(startIndex, startIndex + itemsPerPage);

  // Reset page when filter changes
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  return (
    <section id="gallery" className="premium-gallery">
      <Container fluid className="px-4">
        {/* Section Header */}
        <div className="section-header">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="header-subtitle">What's Next</span>
            <h2 className="header-title">
              On the<span>Horizon</span>
            </h2>
            <div className="header-line"></div>
          </motion.div>
        </div>

        {/* Project Status Buttons */}
        <motion.div
          className="gallery-filters"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <button
            className={`filter-btn ${activeFilter === 'upcoming' ? 'active' : ''}`}
            onClick={() => handleFilterChange('upcoming')}
          >
            Upcoming Projects
          </button>
          <button
            className={`filter-btn ${activeFilter === 'ongoing' ? 'active' : ''}`}
            onClick={() => handleFilterChange('ongoing')}
          >
            Ongoing Projects
          </button>
        </motion.div>

        {/* Horizontal Pill Gallery */}
        <div className="pill-gallery-wrapper" ref={ref}>
          <div className="pill-gallery">
            {paginatedImages.map((image, index) => (
              <motion.div
                key={image.id}
                className={`pill-item ${hoveredId === image.id ? 'expanded' : ''}`}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.5) }}
                onMouseEnter={() => setHoveredId(image.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => handleImageClick(image)}
              >
                <div className="pill-image">
                  <img src={image.image} alt={image.title} />
                  
                  {/* Hover Overlay - Glass Blur with View Button */}
                  <div className="hover-overlay">
                    <div className="hover-content">
                      <button className="view-btn">View</button>
                    </div>
                  </div>

                  {/* Bottom Left Text - Always Visible */}
                  <div className="bottom-left-text">
                    <div className="project-status">
                      {image.projectStatus === 'upcoming' ? 'Upcoming' : 'Ongoing'}
                    </div>
                    <div className="project-name">{image.projectName}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="page-btn"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <FaChevronLeft />
            </button>
            
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`page-number ${currentPage === i + 1 ? 'active' : ''}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            
            <button
              className="page-btn"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <FaChevronRight />
            </button>
          </div>
        )}

        {/* Image Count Display */}
        <div className="gallery-stats">
          <p>
            Showing {paginatedImages.length} of {filteredImages.length} {activeFilter === 'upcoming' ? 'Upcoming' : 'Ongoing'} Projects
          </p>
        </div>
      </Container>

      {/* Image Modal */}
      <AnimatePresence>
        {showModal && selectedImage && (
          <Modal
            show={showModal}
            onHide={() => setShowModal(false)}
            size="lg"
            centered
            className="gallery-modal-premium"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Modal.Header closeButton>
                <Modal.Title>{selectedImage.projectName}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="modal-image">
                  <img src={selectedImage.image} alt={selectedImage.title} />
                </div>
                
                <div className="modal-details">
                  <div className="project-status-badge">
                    {selectedImage.projectStatus === 'upcoming' ? 'Upcoming Project' : 'Ongoing Project'}
                  </div>
                  <div className="project-type">
                    {selectedImage.type}
                  </div>
                  <div className="modal-description">
                    <p>{selectedImage.description}</p>
                  </div>
                </div>
              </Modal.Body>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </section>
  );
};
 
export default Gallery;