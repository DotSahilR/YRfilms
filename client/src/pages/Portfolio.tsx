import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight, Images } from 'lucide-react';
import { projectsApi, type Project } from '@/lib/store';
import weddingImage from '@/assets/gallery-wedding.jpg';
import portraitImage from '@/assets/gallery-portrait.jpg';
import corporateImage from '@/assets/gallery-corporate.jpg';
import eventImage from '@/assets/gallery-event.jpg';

const categories = [
  { id: 'all', label: 'All Work' },
  { id: 'weddings', label: 'Weddings' },
  { id: 'portraits', label: 'Portraits' },
  { id: 'corporate', label: 'Corporate' },
  { id: 'events', label: 'Events' },
];

// Map for local images
const imageMap: Record<string, string> = {
  '/gallery-wedding.jpg': weddingImage,
  '/gallery-portrait.jpg': portraitImage,
  '/gallery-corporate.jpg': corporateImage,
  '/gallery-event.jpg': eventImage,
};

const Portfolio = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const activeCategory = searchParams.get('category') || 'all';
  
  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      const data = activeCategory === 'all' 
        ? await projectsApi.getVisible()
        : await projectsApi.getByCategory(activeCategory);
      setProjects(data);
      setLoading(false);
    };
    loadProjects();
  }, [activeCategory]);
  
  const handleCategoryChange = (category: string) => {
    if (category === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };
  
  const getImageSrc = (src: string) => {
    return imageMap[src] || src;
  };
  
  const openProject = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };
  
  const closeProject = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };
  
  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };
  
  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };
  
  return (
    <div className="bg-primary min-h-screen pt-24">
      {/* Header */}
      <div className="section-container py-16">
        <motion.div
          className="flex items-center gap-3 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-12 h-px bg-studio-light/30" />
          <span className="text-sm font-body uppercase tracking-[0.3em] text-primary-foreground/60">
            Portfolio
          </span>
        </motion.div>
        
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-heading text-primary-foreground mb-6 leading-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Selected
          <br />
          <span className="text-studio-accent">Works</span>
        </motion.h1>
        
        <motion.p
          className="text-primary-foreground/60 font-body text-lg max-w-xl mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          A curated collection of our finest photography projects, showcasing our passion for visual storytelling.
        </motion.p>
        
        {/* Category Filter - Elegant Pills */}
        <motion.div
          className="flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`font-body text-sm uppercase tracking-widest px-6 py-3 transition-all duration-500 relative overflow-hidden ${
                activeCategory === cat.id
                  ? 'text-primary bg-studio-light'
                  : 'text-primary-foreground/60 hover:text-primary-foreground border border-primary-foreground/20 hover:border-primary-foreground/50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>
      </div>
      
      {/* Projects Grid - Masonry-like Layout */}
      <div className="section-container pb-24">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div 
                key={i} 
                className={`bg-secondary/50 animate-pulse ${i % 3 === 0 ? 'aspect-[4/5]' : 'aspect-[4/3]'}`} 
              />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <motion.div 
            className="text-center py-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Images className="w-16 h-16 text-primary-foreground/20 mx-auto mb-4" />
            <p className="text-primary-foreground/60 font-body text-lg">
              No projects found in this category.
            </p>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            layout
          >
            <AnimatePresence mode="popLayout">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className={`cursor-pointer group relative overflow-hidden ${
                    index % 5 === 0 ? 'md:col-span-2 md:row-span-2' : ''
                  }`}
                  onClick={() => openProject(project)}
                >
                  <div className={`relative overflow-hidden ${index % 5 === 0 ? 'aspect-square' : 'aspect-[4/3]'}`}>
                    <img
                      src={getImageSrc(project.coverImage)}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    
                    {/* Content */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <span className="font-body text-xs uppercase tracking-widest text-studio-light/70 mb-2">
                        {project.category}
                      </span>
                      <h3 className="font-heading text-2xl text-studio-light mb-2">
                        {project.title}
                      </h3>
                      <p className="font-body text-sm text-studio-light/70 line-clamp-2">
                        {project.description}
                      </p>
                      {project.images.length > 1 && (
                        <div className="mt-4 flex items-center gap-2 text-studio-light/50">
                          <Images size={16} />
                          <span className="font-body text-xs">{project.images.length} images</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Image Count Badge */}
                    {project.images.length > 1 && (
                      <div className="absolute top-4 right-4 bg-primary/80 backdrop-blur-sm px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="font-body text-xs text-studio-light">
                          {project.images.length} photos
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
      
      {/* Project Lightbox */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 bg-primary/98 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Close Button */}
            <button
              onClick={closeProject}
              className="absolute top-6 right-6 z-50 text-primary-foreground/70 hover:text-primary-foreground transition-colors p-2"
            >
              <X size={32} />
            </button>
            
            {/* Main Content */}
            <div className="h-full flex flex-col">
              {/* Image Viewer */}
              <div className="flex-1 relative flex items-center justify-center p-8">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={getImageSrc(selectedProject.images[currentImageIndex]?.src || selectedProject.coverImage)}
                    alt={selectedProject.images[currentImageIndex]?.alt || selectedProject.title}
                    className="max-w-full max-h-[70vh] object-contain"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>
                
                {/* Navigation Arrows */}
                {selectedProject.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-secondary/50 hover:bg-secondary text-primary-foreground transition-colors"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-secondary/50 hover:bg-secondary text-primary-foreground transition-colors"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}
              </div>
              
              {/* Project Info */}
              <div className="bg-secondary/30 p-6 md:p-8">
                <div className="section-container">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                      <span className="font-body text-xs uppercase tracking-widest text-primary-foreground/50 mb-2 block">
                        {selectedProject.category} • {selectedProject.date}
                      </span>
                      <h2 className="font-heading text-3xl text-primary-foreground mb-2">
                        {selectedProject.title}
                      </h2>
                      <p className="font-body text-primary-foreground/70 max-w-xl">
                        {selectedProject.description}
                      </p>
                    </div>
                    
                    {/* Thumbnail Strip */}
                    {selectedProject.images.length > 1 && (
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {selectedProject.images.map((img, idx) => (
                          <button
                            key={img.id}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`flex-shrink-0 w-16 h-16 overflow-hidden transition-all ${
                              idx === currentImageIndex 
                                ? 'ring-2 ring-studio-light ring-offset-2 ring-offset-primary' 
                                : 'opacity-50 hover:opacity-100'
                            }`}
                          >
                            <img
                              src={getImageSrc(img.src)}
                              alt={img.alt}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Portfolio;
