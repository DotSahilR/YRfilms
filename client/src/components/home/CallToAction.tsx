import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const CallToAction = () => {
  return (
    <section className="bg-background section-padding">
      <div className="section-container">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-subtitle text-muted mb-4">Ready to Begin?</p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            Let's Create Something Beautiful Together
          </h2>
          <p className="font-body text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Whether it's your wedding day, a corporate event, or a personal project, 
            we're here to capture your story.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/contact">
                Book a Session
                <ArrowRight size={16} />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/portfolio">Explore Our Work</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
