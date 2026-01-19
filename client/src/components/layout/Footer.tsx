import { ModernFooter } from '@/components/ui/modern-footer';
import { Instagram, Mail, Phone, Twitter } from 'lucide-react';

export const Footer = () => {
  const socialLinks = [
    {
      icon: <Instagram className="w-5 h-5" />,
      href: "https://instagram.com/yrfilms",
      label: "Instagram",
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      href: "https://twitter.com/yrfilms",
      label: "Twitter",
    },
    {
      icon: <Mail className="w-5 h-5" />,
      href: "mailto:hello@yrfilms.com",
      label: "Email",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      href: "tel:+919876543210",
      label: "Phone",
    },
  ];

  const navLinks = [
    { label: "Portfolio", href: "/portfolio" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <ModernFooter
      brandName="YR FILMS"
      brandDescription="Capturing moments that transcend time. Every frame tells a story, every image holds emotion."
      socialLinks={socialLinks}
      navLinks={navLinks}
    />
  );
};
