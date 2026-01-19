import { motion } from 'framer-motion';

export const Philosophy = () => {
  return (
    <section className="bg-secondary section-padding">
      <div className="section-container">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            className="text-subtitle text-secondary-foreground/60 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our Philosophy
          </motion.p>
          
          <motion.h2
            className="font-heading text-3xl md:text-5xl lg:text-6xl text-secondary-foreground leading-tight mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Light shapes everything. It defines mood, reveals character, 
            and transforms ordinary moments into extraordinary memories.
          </motion.h2>
          
          <motion.p
            className="font-body text-lg text-secondary-foreground/70 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Our name, LUMEN, reflects this core belief. We approach every session 
            with intention, finding the perfect light to tell your story.
          </motion.p>
        </div>
      </div>
    </section>
  );
};
