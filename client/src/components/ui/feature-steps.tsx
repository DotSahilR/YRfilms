"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface Feature {
  step: string
  title?: string
  content: string
  image: string
}

interface FeatureStepsProps {
  features: Feature[]
  className?: string
  title?: string
  autoPlayInterval?: number
  imageHeight?: string
}

export function FeatureSteps({
  features,
  className,
  title = "How to get Started",
  autoPlayInterval = 3000,
  imageHeight = "h-[400px]",
}: FeatureStepsProps) {
  const [currentFeature, setCurrentFeature] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => prev + 100 / (autoPlayInterval / 100))
      } else {
        setCurrentFeature((prev) => (prev + 1) % features.length)
        setProgress(0)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [progress, features.length, autoPlayInterval])

  return (
    <div className={cn("p-8 md:p-12", className)}>
      <div className="max-w-7xl mx-auto w-full">
        <motion.h2 
          className="text-display text-foreground text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h2>

        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
          {/* Steps List */}
          <div className="w-full md:w-1/2 order-2 md:order-1">
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className={cn(
                    "flex items-start gap-4 cursor-pointer group p-4 rounded-lg transition-all duration-300",
                    index === currentFeature 
                      ? "bg-primary/10" 
                      : "hover:bg-primary/5"
                  )}
                  onClick={() => {
                    setCurrentFeature(index)
                    setProgress(0)
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  {/* Step Number */}
                  <motion.div 
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-all duration-300",
                      index <= currentFeature 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted text-muted-foreground"
                    )}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {index < currentFeature ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      index + 1
                    )}
                  </motion.div>

                  {/* Step Content */}
                  <div className="flex-1">
                    <motion.h3 
                      className={cn(
                        "font-heading text-xl transition-colors duration-300",
                        index === currentFeature 
                          ? "text-foreground" 
                          : "text-muted-foreground group-hover:text-foreground"
                      )}
                    >
                      {feature.title || feature.step}
                    </motion.h3>
                    
                    <AnimatePresence mode="wait">
                      {index === currentFeature && (
                        <motion.p 
                          className="text-muted-foreground mt-2 font-body leading-relaxed"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {feature.content}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    {/* Progress Bar */}
                    {index === currentFeature && (
                      <motion.div 
                        className="h-1 bg-muted rounded-full mt-4 overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <motion.div 
                          className="h-full bg-accent rounded-full"
                          style={{ width: `${progress}%` }}
                          transition={{ duration: 0.1 }}
                        />
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Image Display */}
          <div className={cn("w-full md:w-1/2 order-1 md:order-2", imageHeight)}>
            <div className="relative h-full w-full rounded-lg overflow-hidden bg-muted">
              <AnimatePresence mode="wait">
                {features.map(
                  (feature, index) =>
                    index === currentFeature && (
                      <motion.div
                        key={index}
                        className="absolute inset-0"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                      >
                        <img
                          src={feature.image}
                          alt={feature.title || feature.step}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
                      </motion.div>
                    )
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
