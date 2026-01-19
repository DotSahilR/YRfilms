import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Camera, Heart, Award } from 'lucide-react';
import heroImage from '@/assets/hero-portrait.jpg';

const About = () => {
  return (
    <div className="bg-background min-h-screen pt-24">
      {/* Hero */}
      <section className="bg-primary">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="section-padding section-container flex items-center">
            <div>
              <motion.p
                className="text-subtitle text-primary-foreground/60 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Our Story
              </motion.p>
              <motion.h1
                className="text-display text-primary-foreground mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                About LUMEN Studio
              </motion.h1>
              <motion.p
                className="text-primary-foreground/70 font-body text-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                At LUMEN Studio, we believe photography is more than documentation—it is art. 
                Founded on the principles of storytelling and authenticity, we approach every 
                session with intention and craft.
              </motion.p>
            </div>
          </div>
          <motion.div
            className="aspect-square lg:aspect-auto relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <img
              src={heroImage}
              alt="LUMEN Studio"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>
      
      {/* Philosophy */}
      <section className="section-padding">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <motion.p
              className="text-subtitle text-muted mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Our Philosophy
            </motion.p>
            <motion.h2
              className="font-heading text-3xl md:text-4xl text-foreground mb-8 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Light shapes everything. It defines mood, reveals character, and transforms 
              ordinary moments into extraordinary memories.
            </motion.h2>
            <motion.p
              className="font-body text-muted-foreground text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Our name, LUMEN—the unit of luminous flux—reflects this core belief. 
              We are constantly seeking the perfect light, the decisive moment, 
              the authentic emotion.
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* Values */}
      <section className="bg-secondary section-padding">
        <div className="section-container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-subtitle text-secondary-foreground/60 mb-4">What Drives Us</p>
            <h2 className="text-display text-secondary-foreground">Our Values</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Camera,
                title: 'Craftsmanship',
                description: 'Every detail matters. We approach our work with the precision and care of master artisans.',
              },
              {
                icon: Heart,
                title: 'Authenticity',
                description: 'We seek genuine moments and real emotions. Posed perfection has its place, but truth is timeless.',
              },
              {
                icon: Award,
                title: 'Excellence',
                description: 'We never stop learning, never stop improving. Each project pushes us to be better.',
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                className="text-center p-8"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <value.icon 
                  className="w-12 h-12 text-accent mx-auto mb-6" 
                  strokeWidth={1.5} 
                />
                <h3 className="font-heading text-2xl text-secondary-foreground mb-4">
                  {value.title}
                </h3>
                <p className="font-body text-secondary-foreground/70 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Process */}
      <section className="section-padding">
        <div className="section-container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-subtitle text-muted mb-4">How We Work</p>
            <h2 className="text-display text-foreground">Our Process</h2>
          </motion.div>
          
          <div className="max-w-3xl mx-auto">
            {[
              { step: '01', title: 'Consultation', desc: 'We begin with a conversation. Understanding your vision, your story, and your needs.' },
              { step: '02', title: 'Planning', desc: 'Together we craft a timeline, scout locations, and prepare every detail.' },
              { step: '03', title: 'The Session', desc: 'This is where the magic happens. We guide you naturally while capturing authentic moments.' },
              { step: '04', title: 'Curation & Editing', desc: 'We carefully select and refine each image, applying our signature style.' },
              { step: '05', title: 'Delivery', desc: 'Your final gallery is delivered through a beautiful online platform, ready to share.' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                className="flex gap-8 mb-12 last:mb-0"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex-shrink-0">
                  <span className="font-heading text-5xl text-muted/30">{item.step}</span>
                </div>
                <div className="pt-2">
                  <h3 className="font-heading text-2xl text-foreground mb-2">{item.title}</h3>
                  <p className="font-body text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="bg-primary section-padding">
        <div className="section-container text-center">
          <motion.h2
            className="font-heading text-3xl md:text-4xl text-primary-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Let's create something beautiful together
          </motion.h2>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact">
                Start a Conversation
                <ArrowRight size={16} />
              </Link>
            </Button>
            <Button variant="heroSolid" size="lg" asChild>
              <Link to="/portfolio">View Our Work</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
