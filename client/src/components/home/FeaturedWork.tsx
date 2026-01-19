import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import weddingImage from '@/assets/gallery-wedding.jpg';
import portraitImage from '@/assets/gallery-portrait.jpg';
import corporateImage from '@/assets/gallery-corporate.jpg';
import eventImage from '@/assets/gallery-event.jpg';

const featuredWorks = [
  {
    id: 1,
    title: 'Weddings',
    subtitle: 'Timeless Love Stories',
    image: weddingImage,
    category: 'weddings',
  },
  {
    id: 2,
    title: 'Portraits',
    subtitle: 'Character & Soul',
    image: portraitImage,
    category: 'portraits',
  },
  {
    id: 3,
    title: 'Corporate',
    subtitle: 'Professional Excellence',
    image: corporateImage,
    category: 'corporate',
  },
  {
    id: 4,
    title: 'Events',
    subtitle: 'Captured Moments',
    image: eventImage,
    category: 'events',
  },
];

export const FeaturedWork = () => {
  return (
    <section className="bg-background section-padding">
      <div className="section-container">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-subtitle text-muted mb-4">Our Work</p>
          <h2 className="text-display text-foreground">Featured Projects</h2>
        </motion.div>
        
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {featuredWorks.map((work, index) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                to={`/portfolio?category=${work.category}`}
                className="group block relative overflow-hidden aspect-[4/3]"
              >
                {/* Image */}
                <img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                
                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <p className="text-studio-light/70 font-body text-sm uppercase tracking-widest mb-2">
                    {work.subtitle}
                  </p>
                  <div className="flex items-end justify-between">
                    <h3 className="font-heading text-3xl md:text-4xl text-studio-light">
                      {work.title}
                    </h3>
                    <ArrowRight 
                      className="text-studio-light opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" 
                      size={24} 
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        {/* View All Link */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-foreground font-body uppercase tracking-widest text-sm hover:text-muted transition-colors link-underline"
          >
            View All Projects
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
