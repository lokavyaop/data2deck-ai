import { motion } from "framer-motion";
import { Check, Sparkles, Building2, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PricingSection = () => {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      period: "",
      description: "Perfect for trying out ConsultDeck",
      icon: Sparkles,
      features: [
        "3 pitch decks per month",
        "Basic market analytics",
        "Standard templates",
        "Email support",
        "PDF export",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Professional",
      price: "$49",
      period: "/month",
      description: "For active real estate professionals",
      icon: Building2,
      features: [
        "Unlimited pitch decks",
        "Advanced market insights",
        "Premium templates",
        "Priority support",
        "PDF & PowerPoint export",
        "Custom branding",
        "Team collaboration",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large teams and brokerages",
      icon: Crown,
      features: [
        "Everything in Professional",
        "Dedicated account manager",
        "Custom integrations",
        "API access",
        "White-label solution",
        "Advanced analytics",
        "SLA guarantee",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-muted/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Pricing
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose the plan that fits your needs. Start free and scale as you grow.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl p-8 ${
                plan.popular
                  ? "bg-primary text-primary-foreground shadow-glow scale-105"
                  : "bg-card border border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    plan.popular ? "bg-primary-foreground/20" : "bg-primary/10"
                  }`}
                >
                  <plan.icon
                    className={`w-6 h-6 ${
                      plan.popular ? "text-primary-foreground" : "text-primary"
                    }`}
                  />
                </div>
                <h3
                  className={`font-display text-xl font-bold mb-2 ${
                    plan.popular ? "text-primary-foreground" : "text-foreground"
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`text-sm ${
                    plan.popular ? "text-primary-foreground/80" : "text-muted-foreground"
                  }`}
                >
                  {plan.description}
                </p>
              </div>

              <div className="mb-6">
                <span
                  className={`text-4xl font-bold ${
                    plan.popular ? "text-primary-foreground" : "text-foreground"
                  }`}
                >
                  {plan.price}
                </span>
                {plan.period && (
                  <span
                    className={`${
                      plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"
                    }`}
                  >
                    {plan.period}
                  </span>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check
                      className={`w-5 h-5 flex-shrink-0 ${
                        plan.popular ? "text-accent" : "text-primary"
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        plan.popular ? "text-primary-foreground/90" : "text-muted-foreground"
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link to="/signup">
                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                >
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
