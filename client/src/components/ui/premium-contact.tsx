import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  User, 
  MessageSquare, 
  Building, 
  ArrowRight,
  Sparkles,
  CheckCircle,
  Clock,
  Globe,
  Shield,
  Zap
} from 'lucide-react';
import { bookingsApi, servicesApi, type Service } from '@/lib/store';
import { toast } from '@/hooks/use-toast';

const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Get in touch via email",
    value: "hello@49studio.com",
    link: "mailto:hello@49studio.com",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak directly with our team",
    value: "+91 98765 43210",
    link: "tel:+919876543210",
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    description: "Our studio location",
    value: "Mumbai, India",
    link: "#location",
    gradient: "from-purple-500/20 to-pink-500/20",
  }
];

const companyStats = [
  { label: "Response Time", value: "< 2 hours", icon: Clock },
  { label: "Happy Clients", value: "500+", icon: Globe },
  { label: "Years Experience", value: "10+", icon: Shield },
  { label: "Success Rate", value: "99.9%", icon: Zap }
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export function PremiumContact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [services, setServices] = useState<Service[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const loadServices = async () => {
      const data = await servicesApi.getEnabled();
      setServices(data);
    };
    loadServices();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      await bookingsApi.create({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service || 'General Inquiry',
        preferredDate: new Date().toISOString().split('T')[0],
        message: formData.message,
      });
      setIsSubmitted(true);
      toast({
        title: 'Message Sent!',
        description: "We'll get back to you within 24 hours.",
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8 }
    }
  } as const;

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  } as const;

  return (
    <section className="relative min-h-screen bg-primary overflow-hidden py-20">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(107,114,142,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(80,87,122,0.15),transparent_50%)]" />
        
        {/* Moving orbs */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-studio-accent/10 rounded-full blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Communication lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          {[...Array(6)].map((_, i) => (
            <motion.line
              key={i}
              x1={`${10 + i * 15}%`}
              y1="0%"
              x2={`${90 - i * 15}%`}
              y2="100%"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-accent"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, repeatType: "reverse" }}
            />
          ))}
        </svg>
      </div>

      <motion.div 
        ref={containerRef}
        className="relative z-10 section-container"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {/* Header */}
        <motion.div className="text-center mb-16" variants={fadeInUp}>
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 text-accent mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-body">Let's Connect</span>
          </motion.div>

          <h1 className="font-heading text-5xl md:text-6xl text-primary-foreground mb-6">
            Get in <span className="text-accent">Touch</span>
          </h1>
          
          <p className="text-primary-foreground/60 font-body text-lg max-w-2xl mx-auto">
            Ready to capture your special moments? Let's start a conversation about your vision and how we can bring it to life.
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          variants={fadeInUp}
        >
          {companyStats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-4 rounded-xl bg-secondary/30 border border-studio-medium/30"
              whileHover={{ scale: 1.02, borderColor: 'rgba(107, 114, 142, 0.5)' }}
            >
              <stat.icon className="w-6 h-6 text-accent mx-auto mb-2" />
              <p className="font-heading text-2xl text-primary-foreground">{stat.value}</p>
              <p className="text-sm text-primary-foreground/60 font-body">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <motion.div 
            className="bg-secondary/30 backdrop-blur-xl rounded-2xl border border-studio-medium/30 p-8 md:p-10"
            variants={fadeInUp}
          >
            <div className="mb-8">
              <h2 className="text-2xl font-heading text-primary-foreground mb-2">Send us a message</h2>
              <p className="text-primary-foreground/60 font-body">
                Tell us about your project and we'll get back to you within 24 hours.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="relative">
                      <User className="absolute left-4 top-4 h-5 w-5 text-primary-foreground/40" />
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`w-full pl-12 pr-4 py-4 bg-primary/50 border rounded-xl text-primary-foreground placeholder-primary-foreground/40 focus:outline-none focus:border-accent transition-all ${
                          errors.name ? 'border-red-400' : 'border-studio-medium/30'
                        }`}
                      />
                      {errors.name && (
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-sm mt-2">
                          {errors.name}
                        </motion.p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="relative">
                      <Mail className="absolute left-4 top-4 h-5 w-5 text-primary-foreground/40" />
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full pl-12 pr-4 py-4 bg-primary/50 border rounded-xl text-primary-foreground placeholder-primary-foreground/40 focus:outline-none focus:border-accent transition-all ${
                          errors.email ? 'border-red-400' : 'border-studio-medium/30'
                        }`}
                      />
                      {errors.email && (
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-sm mt-2">
                          {errors.email}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="relative">
                    <Phone className="absolute left-4 top-4 h-5 w-5 text-primary-foreground/40" />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`w-full pl-12 pr-4 py-4 bg-primary/50 border rounded-xl text-primary-foreground placeholder-primary-foreground/40 focus:outline-none focus:border-accent transition-all ${
                        errors.phone ? 'border-red-400' : 'border-studio-medium/30'
                      }`}
                    />
                    {errors.phone && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-sm mt-2">
                        {errors.phone}
                      </motion.p>
                    )}
                  </div>

                  {/* Service Select */}
                  <div className="relative">
                    <Building className="absolute left-4 top-4 h-5 w-5 text-primary-foreground/40" />
                    <select
                      value={formData.service}
                      onChange={(e) => handleInputChange('service', e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-primary/50 border border-studio-medium/30 rounded-xl text-primary-foreground focus:outline-none focus:border-accent transition-all appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-primary">Select a Service (Optional)</option>
                      {services.map(service => (
                        <option key={service.id} value={service.name} className="bg-primary">
                          {service.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 h-5 w-5 text-primary-foreground/40" />
                    <textarea
                      placeholder="Tell us about your project..."
                      rows={4}
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className={`w-full pl-12 pr-4 py-4 bg-primary/50 border rounded-xl text-primary-foreground placeholder-primary-foreground/40 focus:outline-none focus:border-accent transition-all resize-none ${
                        errors.message ? 'border-red-400' : 'border-studio-medium/30'
                      }`}
                    />
                    {errors.message && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-sm mt-2">
                        {errors.message}
                      </motion.p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full relative group overflow-hidden bg-accent hover:bg-accent/90 text-accent-foreground font-medium py-4 px-6 rounded-xl transition-all disabled:opacity-50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary-foreground/10 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                    <span className="relative flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <motion.div
                          className="w-5 h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          Send Message
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <motion.div
                    className="w-20 h-20 rounded-full bg-green-500/20 border border-green-400/30 flex items-center justify-center mx-auto mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <CheckCircle className="w-10 h-10 text-green-400" />
                  </motion.div>
                  <h3 className="text-2xl font-heading text-primary-foreground mb-4">Message Sent!</h3>
                  <p className="text-primary-foreground/60 text-lg mb-6 font-body">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <motion.button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
                    }}
                    className="px-6 py-3 bg-primary/50 border border-studio-medium/30 rounded-xl text-primary-foreground hover:bg-primary/70 transition-all font-body"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Send Another Message
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Contact Methods */}
          <motion.div className="space-y-8" variants={fadeInUp}>
            <div>
              <h3 className="text-3xl font-heading text-primary-foreground mb-4">Other ways to reach us</h3>
              <p className="text-primary-foreground/60 text-lg font-body">
                Choose the method that works best for you.
              </p>
            </div>

            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={index}
                  href={method.link}
                  className="block p-6 bg-secondary/30 backdrop-blur-xl rounded-2xl border border-studio-medium/30 hover:bg-secondary/50 transition-all group"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${method.gradient} border border-primary-foreground/20 flex items-center justify-center`}
                      whileHover={{ scale: 1.1, rotateY: 180 }}
                      transition={{ duration: 0.6 }}
                    >
                      <method.icon className="w-7 h-7 text-primary-foreground" />
                    </motion.div>
                    <div className="flex-1">
                      <h4 className="text-xl font-heading text-primary-foreground mb-1">{method.title}</h4>
                      <p className="text-primary-foreground/60 text-sm mb-2 font-body">{method.description}</p>
                      <p className="text-primary-foreground font-medium font-body">{method.value}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-primary-foreground/40 group-hover:text-primary-foreground group-hover:translate-x-1 transition-all" />
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Additional Info */}
            <motion.div
              className="p-6 bg-gradient-to-br from-accent/10 to-studio-accent/10 backdrop-blur-xl rounded-2xl border border-accent/30"
              variants={fadeInUp}
            >
              <h4 className="text-lg font-heading text-primary-foreground mb-3">Quick Response Guarantee</h4>
              <p className="text-primary-foreground/80 text-sm leading-relaxed font-body">
                We pride ourselves on rapid response times. All inquiries are typically answered within 2 hours during business hours, 
                and we'll schedule a call within 24 hours to discuss your project in detail.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary-foreground/20 rounded-full"
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${20 + (i * 10)}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 2, 1],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.6,
            }}
          />
        ))}
      </motion.div>
    </section>
  );
}
