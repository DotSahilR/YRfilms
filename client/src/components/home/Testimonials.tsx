import { motion } from 'framer-motion';
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';

const testimonials = [
  {
    quote: "YRfilms captured our wedding day with such artistry and care. Every photo feels like a piece of art we will treasure forever. The attention to detail and ability to capture genuine emotions was remarkable.",
    name: "Sarah & James",
    designation: "Wedding Clients",
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3560&auto=format&fit=crop",
  },
  {
    quote: "Professional, creative, and incredibly easy to work with. Our corporate headshots exceeded expectations. The team understood our brand vision perfectly.",
    name: "Michael Chen",
    designation: "CEO, Vertex Consulting",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3540&auto=format&fit=crop",
  },
  {
    quote: "They understood our vision immediately. The editorial shoot was perfect for our brand launch. Exceptional creativity and technical skill.",
    name: "Emma Laurent",
    designation: "Creative Director, Maison Étoile",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop",
  },
  {
    quote: "The team at YRfilms brings a unique perspective to every project. Their work has elevated our brand's visual identity significantly.",
    name: "Raj Patel",
    designation: "Founder, Artisan Collective",
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=3540&auto=format&fit=crop",
  },
];

export const Testimonials = () => {
  return (
    <section className="bg-background section-padding overflow-hidden">
      <div className="section-container">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-subtitle text-muted mb-4">Testimonials</p>
          <h2 className="text-display text-foreground">Kind Words</h2>
        </motion.div>
        
        {/* Animated Testimonials */}
        <AnimatedTestimonials 
          testimonials={testimonials} 
          autoplay={true}
        />
      </div>
    </section>
  );
};
