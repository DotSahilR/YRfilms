import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-portrait.jpg';

export const Hero = () => {
  return (
    <section className="relative min-h-screen bg-primary overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-studio-light/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Background Image */}
      <div className="absolute inset-0">
        <motion.img
          src={heroImage}
          alt="Portrait photography"
          className="w-full h-full object-cover object-center"
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1] }}
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/70 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-primary/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 section-container min-h-screen flex flex-col justify-end pb-16 md:pb-24">
        {/* Editorial Typography */}
        <div className="mb-8 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 80, rotateX: 45 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
              <h1 className="text-editorial text-studio-light leading-[0.85] relative">
                <motion.span
                  className="inline-block"
                  animate={{ 
                    textShadow: [
                      "0 0 20px rgba(255,255,255,0.1)",
                      "0 0 40px rgba(255,255,255,0.2)",
                      "0 0 20px rgba(255,255,255,0.1)",
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  YR
                </motion.span>
              </h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 80, rotateX: 45 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <h2 className="text-editorial text-studio-light/30 leading-[0.85] -mt-2 md:-mt-4">
                FILMS
              </h2>
          </motion.div>
        </div>
        
        {/* Tagline and CTA */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="max-w-md">
            <motion.p 
              className="text-studio-light/80 font-body text-lg leading-relaxed mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              We capture moments that transcend time. Every frame tells a story, 
              every image holds emotion.
            </motion.p>
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <Button variant="hero" size="lg" asChild className="group overflow-hidden relative">
                <Link to="/portfolio">
                  <span className="relative z-10">View Portfolio</span>
                  <motion.div
                    className="absolute inset-0 bg-studio-light"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </Button>
              <Button variant="heroSolid" size="lg" asChild className="group">
                <Link to="/contact">
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    Book a Session
                  </motion.span>
                </Link>
              </Button>
            </motion.div>
          </div>
          
          <motion.div 
            className="hidden md:block text-right"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            <motion.p 
              className="text-studio-light/50 font-body text-sm uppercase tracking-widest mb-2"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Scroll to explore
            </motion.p>
            <motion.div
              className="w-px h-16 bg-gradient-to-b from-studio-light/50 to-transparent ml-auto"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.8, delay: 1.6 }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-1/4 right-10 w-32 h-32 border border-studio-light/10 rounded-full"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-48 h-48 border border-studio-light/5 rounded-full"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 1.7 }}
      />
    </section>
  );
};
