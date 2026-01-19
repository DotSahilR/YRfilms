"use client";
import React from "react";
import { Link } from "react-router-dom";
import { Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

interface FooterProps {
  brandName?: string;
  brandDescription?: string;
  socialLinks?: SocialLink[];
  navLinks?: FooterLink[];
  creatorName?: string;
  creatorUrl?: string;
  brandIcon?: React.ReactNode;
  className?: string;
}

export const ModernFooter = ({
  brandName = "49 STUDIO",
  brandDescription = "Capturing moments that transcend time",
  socialLinks = [],
  navLinks = [],
  creatorName,
  creatorUrl,
  brandIcon,
  className,
}: FooterProps) => {
  return (
    <footer
      className={cn(
        "relative bg-primary text-primary-foreground pt-24 pb-8 overflow-hidden",
        className
      )}
    >
      <div className="section-container relative z-10">
        <div className="flex flex-col items-center">
          {/* Main Content */}
          <motion.div 
            className="flex flex-col items-center text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Brand */}
            <div className="flex flex-col items-center mb-8">
              <motion.div 
                className="flex items-center gap-3 mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-12 h-12 border-2 border-primary-foreground flex items-center justify-center">
                  <span className="font-heading text-xl font-bold">49</span>
                </div>
                <span className="text-3xl font-heading font-semibold tracking-tight">
                  {brandName}
                </span>
              </motion.div>

              <p className="text-primary-foreground/60 font-body max-w-md leading-relaxed">
                {brandDescription}
              </p>
            </div>

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="flex gap-4 mb-8">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground hover:text-primary transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    aria-label={link.label}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            )}

            {/* Nav Links */}
            {navLinks.length > 0 && (
              <nav className="flex flex-wrap justify-center gap-8 mb-8">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                  >
                    <Link
                      to={link.href}
                      className="text-primary-foreground/70 hover:text-primary-foreground transition-colors font-body text-sm uppercase tracking-widest link-underline"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            )}
          </motion.div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent mb-8" />

          {/* Bottom */}
          <div className="flex flex-col md:flex-row justify-between items-center w-full gap-4 text-sm text-primary-foreground/50">
            <p className="font-body">
              ©{new Date().getFullYear()} {brandName}. All rights reserved.
            </p>

            {creatorName && creatorUrl && (
              <p className="font-body">
                Crafted by{" "}
                <a
                  href={creatorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  {creatorName}
                </a>
              </p>
            )}
          </div>
        </div>

        {/* Large Background Text */}
        <motion.div 
          className="absolute inset-x-0 bottom-0 flex justify-center pointer-events-none overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <span className="text-[15vw] font-heading font-bold text-primary-foreground/[0.03] whitespace-nowrap select-none leading-none translate-y-1/3">
            {brandName.toUpperCase().replace(" ", "")}
          </span>
        </motion.div>

        {/* Bottom Logo Icon */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="w-16 h-16 rounded-full border border-primary-foreground/10 flex items-center justify-center">
            {brandIcon || (
              <Camera className="w-6 h-6 text-primary-foreground/30" strokeWidth={1.5} />
            )}
          </div>
        </motion.div>

        {/* Decorative line at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
      </div>
    </footer>
  );
};
