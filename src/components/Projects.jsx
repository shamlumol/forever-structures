import React, { useState } from 'react';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { projectsData } from './data/projectData';
import './Projects.scss';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setShowModal(true);
    setActiveFilter('all');
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowImageModal(true);
  };

  // Filter images by category
  const getFilteredImages = () => {
    if (!selectedProject) return [];
    if (activeFilter === 'all') return selectedProject.galleryImages;
    return selectedProject.galleryImages.filter(img => img.category === activeFilter);
  };

  return (
    <>
      <section id="projects" className="projects-premium">
        <Container>
          {/* Section Header */}
          <div className="section-header">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <span className="header-subtitle">Portfolio</span>
              <h2 className="header-title">
                Featured <span>Works</span>
              </h2>
              <div className="header-line"></div>
            </motion.div>
          </div>

          {/* Projects Grid */}
          <Row ref={ref} className="projects-grid">
            {projectsData.map((project, index) => (
              <Col lg={6} key={project.id} className="mb-4">
                <motion.div
                  className="project-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  onClick={() => handleProjectClick(project)}
                >
                  <div className="card-image">
                    <img src={project.image} alt={project.title} />
                    <div className="image-overlay">
                      <div className="overlay-content">
                        <span className="view-text">View Gallery</span>
                      </div>
                    </div>
                    <div className="project-year-badge">
                      <span>{project.year}</span>
                    </div>
                  </div>
                  
                  <div className="card-content">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-category">{project.category}</p>
                    
                    <div className="project-meta">
                      <span className="meta-location">{project.location}</span>
                    </div>
                  </div>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Resort Gallery Modal */}
      <AnimatePresence>
        {showModal && selectedProject && (
          <Modal
            show={showModal}
            onHide={() => setShowModal(false)}
            size="xl"
            centered
            className="resort-gallery-modal"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Modal.Header closeButton>
                <Modal.Title>{selectedProject.title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {/* Resort Info */}
                <div className="resort-info">
                  <p className="resort-description">{selectedProject.description}</p>
                  <div className="resort-features">
                    {selectedProject.features.map((feature, idx) => (
                      <span key={idx} className="feature-tag">{feature}</span>
                    ))}
                  </div>
                </div>

                {/* Gallery Filter */}
                <div className="gallery-filter">
                  <button
                    className={`filter-chip ${activeFilter === 'all' ? 'active' : ''}`}
                    onClick={() => setActiveFilter('all')}
                  >
                    All Images
                  </button>
                  <button
                    className={`filter-chip ${activeFilter === 'indoor' ? 'active' : ''}`}
                    onClick={() => setActiveFilter('indoor')}
                  >
                    Indoor Images
                  </button>
                  <button
                    className={`filter-chip ${activeFilter === 'outdoor' ? 'active' : ''}`}
                    onClick={() => setActiveFilter('outdoor')}
                  >
                    Outdoor Images
                  </button>
                </div>

                {/* Images Grid */}
                <div className="images-grid">
                  {getFilteredImages().map((image) => (
                    <motion.div
                      key={image.id}
                      className="image-card"
                      whileHover={{ y: -5 }}
                      onClick={() => handleImageClick(image)}
                    >
                      <div className="image-wrapper">
                        <img src={image.image} alt={image.title} />
                        <div className="image-overlay-gallery">
                          <div className="overlay-content">
                            <span className="image-category">
                              {image.category === 'indoor' ? 'Indoor' : 'Outdoor'}
                            </span>
                            <button className="view-image-btn">View</button>
                          </div>
                        </div>
                      </div>
                      <div className="image-caption">
                        <span className="image-type">{image.type}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* No Images Message */}
                {getFilteredImages().length === 0 && (
                  <div className="no-images">
                    <p>No images found in this category.</p>
                  </div>
                )}
              </Modal.Body>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>

      {/* Individual Image Modal */}
      <AnimatePresence>
        {showImageModal && selectedImage && (
          <Modal
            show={showImageModal}
            onHide={() => setShowImageModal(false)}
            size="lg"
            centered
            className="image-view-modal"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Modal.Header closeButton>
                <Modal.Title>{selectedProject?.title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="modal-image-full">
                  <img src={selectedImage.image} alt={selectedImage.title} />
                </div>
                <div className="modal-image-details">
                  <div className="image-type-name">{selectedImage.type}</div>
                  <div className="image-description">
                    <p>{selectedImage.description}</p>
                  </div>
                </div>
              </Modal.Body>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default Projects;