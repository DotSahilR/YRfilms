import { CheckIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface PricingPlan {
  title: string;
  popular: boolean;
  description: string;
  price: string;
  duration?: string;
  features: string[];
}

interface PricingCardsProps {
  plans: PricingPlan[];
  className?: string;
}

export function PricingCards({ plans, className }: PricingCardsProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative"
          >
            <div
              className={cn(
                "relative h-full rounded-2xl border transition-all duration-300 hover:shadow-xl",
                plan.popular
                  ? "border-accent bg-card shadow-lg shadow-accent/10"
                  : "border-border bg-card hover:border-accent/50"
              )}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    className="bg-accent text-accent-foreground text-xs font-body uppercase tracking-wider px-4 py-1 rounded-full"
                  >
                    Most Popular
                  </motion.div>
                </div>
              )}

              <div className="p-8">
                {/* Header */}
                <div className="mb-6">
                  <h3 className="font-heading text-2xl text-card-foreground mb-2">
                    {plan.title}
                  </h3>
                  <p className="text-muted-foreground text-sm font-body leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <motion.span
                    className="font-heading text-4xl text-card-foreground"
                    whileHover={{ scale: 1.05 }}
                  >
                    {plan.price}
                  </motion.span>
                  {plan.duration && (
                    <span className="text-muted-foreground font-body ml-2">
                      / {plan.duration}
                    </span>
                  )}
                </div>

                {/* Divider */}
                <div className="h-px bg-border mb-6" />

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + featureIndex * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                        <CheckIcon className="w-3 h-3 text-accent" />
                      </div>
                      <span className="text-card-foreground font-body text-sm">
                        {feature}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Footer */}
              <div className="px-8 pb-8">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/contact"
                    className={cn(
                      "block w-full py-4 text-center font-body font-medium rounded-xl transition-all duration-300",
                      plan.popular
                        ? "bg-accent text-accent-foreground hover:bg-accent/90"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    )}
                  >
                    Book a Call
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function PricingSection() {
  const pricingPlans: PricingPlan[] = [
    {
      title: "Portrait",
      popular: false,
      description:
        "Perfect for individuals or small teams looking for professional portraits and headshots.",
      price: "₹35,000",
      duration: "2 hours",
      features: [
        "Studio or location shoot",
        "30+ edited images",
        "2 outfit changes",
        "Light retouching",
        "Digital delivery",
        "Cancel anytime",
      ],
    },
    {
      title: "Wedding",
      popular: true,
      description:
        "Complete wedding coverage with a cinematic approach for your special day.",
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
      description:
        "Professional event documentation and corporate photography services.",
      price: "₹85,000",
      duration: "4 hours",
      features: [
        "Event coverage",
        "Team headshots",
        "150+ edited images",
        "Same-day previews",
        "Commercial license",
        "Cancel anytime",
      ],
    },
  ];

  return (
    <section className="section-padding bg-background">
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
  );
}
