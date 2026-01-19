import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { servicesApi, formatINR, type Service } from '@/lib/store';
import { FeatureSteps } from '@/components/ui/feature-steps';
import { CardStack, type CardStackItem } from '@/components/ui/card-stack';
import { PricingCards } from '@/components/ui/pricing-cards';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'How far in advance should I book?',
    answer: 'We recommend booking at least 3-6 months in advance for weddings and major events. Portrait sessions can often be scheduled within 2-4 weeks.',
  },
  {
    question: 'Do you travel for destination shoots?',
    answer: 'Yes! We love destination work. Travel fees vary based on location. Contact us for a custom quote for your destination wedding or event.',
  },
  {
    question: 'How long until I receive my photos?',
    answer: 'Portrait sessions are typically delivered within 2 weeks. Weddings and larger events are delivered within 4-6 weeks. Rush delivery is available.',
  },
  {
    question: 'Do you offer payment plans?',
    answer: 'Yes, we offer flexible payment plans for all our packages. Typically a 30% deposit secures your date, with the balance due before delivery.',
  },
  {
    question: 'Can I request specific editing styles?',
    answer: 'Absolutely. While we have our signature style, we work with clients to achieve their desired aesthetic. Reference images are always welcome.',
  },
];

// Services data for FeatureSteps
const serviceFeatures = [
  {
    step: 'Wedding',
    title: 'Wedding Collection',
    content: 'Complete wedding day coverage with a cinematic approach. We capture every precious moment from preparation to celebration with two photographers for full coverage.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop',
  },
  {
    step: 'Portrait',
    title: 'Portrait Session',
    content: 'Personal or professional portraits crafted with artistic vision. Perfect for individuals, families, or creative projects with studio or location options.',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=2070&auto=format&fit=crop',
  },
  {
    step: 'Corporate',
    title: 'Corporate & Events',
    content: 'Professional event documentation and corporate photography. From conferences to headshots, we deliver polished images that represent your brand.',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2070&auto=format&fit=crop',
  },
  {
    step: 'Editorial',
    title: 'Editorial & Fashion',
    content: 'High-end fashion and editorial photography for magazines, brands, and creative portfolios. Creative direction included for stunning visual stories.',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop',
  },
];

// Process steps for CardStack
const processSteps: CardStackItem[] = [
  {
    id: 1,
    title: 'Consultation',
    description: 'We start with a detailed consultation to understand your vision, preferences, and requirements. This helps us tailor our approach specifically to you.',
    imageSrc: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Planning',
    description: 'Our team creates a detailed plan including timelines, locations, and creative concepts. We handle all logistics so you can focus on enjoying the moment.',
    imageSrc: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'The Shoot',
    description: 'On the day, our experienced team captures every precious moment with artistic precision. We ensure a relaxed atmosphere for natural, authentic shots.',
    imageSrc: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Editing',
    description: 'After careful selection, each image is meticulously edited to bring out its full potential. Our signature style ensures consistency across your gallery.',
    imageSrc: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'Delivery',
    description: 'You receive your final images in a beautiful online gallery. Prints and albums are available upon request to preserve your memories forever.',
    imageSrc: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop',
  },
];

// Pricing plans
const pricingPlans = [
  {
    title: "Portrait",
    popular: false,
    description: "Perfect for individuals or families looking for professional portraits and headshots.",
    price: "₹35,000",
    duration: "2 hours",
    features: [
      "Studio or location shoot",
      "30+ edited images",
      "2 outfit changes",
      "Light retouching",
      "Digital delivery",
    ],
  },
  {
    title: "Wedding",
    popular: true,
    description: "Complete wedding coverage with a cinematic approach for your special day.",
    price: "₹2,50,000",
    duration: "full day",
    features: [
      "Two photographers",
      "Full day coverage (8-10 hrs)",
      "500+ edited images",
      "Online gallery",
      "Engagement session",
      "Album design included",
    ],
  },
  {
    title: "Corporate",
    popular: false,
    description: "Professional event documentation and corporate photography services.",
    price: "₹85,000",
    duration: "4 hours",
    features: [
      "Event coverage",
      "Team headshots",
      "150+ edited images",
      "Same-day previews",
      "Commercial license",
    ],
  },
];

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadServices = async () => {
      const data = await servicesApi.getEnabled();
      setServices(data);
      setLoading(false);
    };
    loadServices();
  }, []);
  
  return (
    <div className="bg-background min-h-screen pt-24">
      {/* Header */}
      <section className="bg-primary section-padding overflow-hidden">
        <div className="section-container relative">
          <motion.div
            className="absolute -top-20 -right-20 w-64 h-64 border border-primary-foreground/5 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          />
          
          <motion.p
            className="text-subtitle text-primary-foreground/60 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            What We Offer
          </motion.p>
          <motion.h1
            className="text-display text-primary-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Services & Pricing
          </motion.h1>
          <motion.p
            className="text-primary-foreground/70 font-body text-lg max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Every project is unique. Our packages are designed to be comprehensive yet flexible, 
            ensuring you receive exactly what you need.
          </motion.p>
        </div>
      </section>

      {/* Our Services - Feature Steps */}
      <section className="bg-secondary/30">
        <FeatureSteps
          features={serviceFeatures}
          title="Our Services"
          autoPlayInterval={5000}
          imageHeight="h-[400px] md:h-[500px]"
        />
      </section>

      {/* Our Process - Card Stack */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-subtitle text-muted-foreground mb-4">How We Work</p>
            <h2 className="text-display text-foreground">Our Process</h2>
          </motion.div>

          <CardStack
            items={processSteps}
            autoAdvance
            intervalMs={4000}
            cardWidth={480}
            cardHeight={320}
            className="py-8"
          />
        </div>
      </section>
      
      {/* Pricing */}
      <section className="section-padding bg-secondary/30">
        <div className="section-container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-subtitle text-muted-foreground mb-4">Invest in Quality</p>
            <h2 className="text-display text-foreground">Simple & Transparent Pricing</h2>
          </motion.div>

          <PricingCards plans={pricingPlans} />
        </div>
      </section>
      
      {/* Add-ons */}
      <section className="bg-primary section-padding overflow-hidden">
        <div className="section-container relative">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-subtitle text-primary-foreground/60 mb-4">Enhance Your Package</p>
            <h2 className="text-display text-primary-foreground">Add-Ons</h2>
          </motion.div>
          
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {[
              { name: 'Second Photographer', price: '₹35,000', desc: 'Additional coverage and angles' },
              { name: 'Photo Album', price: 'From ₹25,000', desc: 'Custom-designed premium album' },
              { name: 'Rush Delivery', price: '₹20,000', desc: 'Delivery within 1 week' },
            ].map((addon, index) => (
              <motion.div 
                key={addon.name} 
                className="p-6 bg-secondary/30 border border-studio-medium/30 rounded-xl text-center group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)" }}
              >
                <h4 className="font-heading text-xl text-primary-foreground mb-2">{addon.name}</h4>
                <p className="font-body text-primary-foreground/60 text-sm mb-3">{addon.desc}</p>
                <motion.p 
                  className="font-heading text-2xl text-primary-foreground"
                  whileHover={{ scale: 1.05 }}
                >
                  {addon.price}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* FAQ */}
      <section className="section-padding bg-background">
        <div className="section-container max-w-3xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-subtitle text-muted-foreground mb-4">Questions & Answers</p>
            <h2 className="text-display text-foreground">FAQ</h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  <AccordionItem value={`item-${index}`} className="border-border">
                    <AccordionTrigger className="font-heading text-lg text-left hover:no-underline hover:text-accent transition-colors">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="font-body text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="bg-accent section-padding overflow-hidden">
        <div className="section-container text-center relative">
          <motion.div
            className="absolute -top-10 left-1/2 -translate-x-1/2 w-96 h-96 border border-accent-foreground/5 rounded-full"
            animate={{ scale: [1, 1.1, 1], rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          
          <motion.h2
            className="font-heading text-3xl md:text-4xl text-accent-foreground mb-6 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ready to discuss your project?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="outline" size="lg" asChild className="border-accent-foreground text-accent-foreground hover:bg-accent-foreground hover:text-accent">
              <Link to="/contact">
                Get in Touch
                <ArrowRight size={16} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
