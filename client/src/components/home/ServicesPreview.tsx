import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Camera, Users, Sparkles, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: Users,
    title: 'Weddings',
    description: 'Complete wedding day coverage with a cinematic approach',
    price: 'From ₹2,50,000',
  },
  {
    icon: Camera,
    title: 'Portraits',
    description: 'Personal or professional portraits crafted with artistic vision',
    price: 'From ₹35,000',
  },
  {
    icon: Building2,
    title: 'Corporate',
    description: 'Professional event documentation and corporate photography',
    price: 'From ₹85,000',
  },
  {
    icon: Sparkles,
    title: 'Editorial',
    description: 'High-end fashion and editorial photography for brands',
    price: 'From ₹1,75,000',
  },
];

export const ServicesPreview = () => {
  return (
    <section className="bg-background section-padding overflow-hidden">
      <div className="section-container">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <motion.p 
              className="text-subtitle text-muted mb-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              What We Offer
            </motion.p>
            <motion.h2 
              className="text-display text-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Our Services
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
          >
            <Button variant="outline" asChild>
              <Link to="/services">
                View All Services
                <ArrowRight size={16} />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <motion.div 
                className="p-8 bg-card border border-border hover:border-accent/50 transition-all duration-500 h-full relative overflow-hidden"
                whileHover={{ y: -8, boxShadow: "0 20px 40px -20px rgba(0,0,0,0.2)" }}
              >
                {/* Background glow on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <service.icon 
                    className="w-10 h-10 text-accent mb-6 group-hover:text-foreground transition-colors duration-300" 
                    strokeWidth={1.5} 
                  />
                </motion.div>
                
                <h3 className="font-heading text-2xl text-card-foreground mb-3 relative z-10">
                  {service.title}
                </h3>
                <p className="font-body text-muted-foreground text-sm leading-relaxed mb-6 relative z-10">
                  {service.description}
                </p>
                <motion.p 
                  className="font-body text-foreground font-medium relative z-10"
                  whileHover={{ scale: 1.05 }}
                >
                  {service.price}
                </motion.p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
