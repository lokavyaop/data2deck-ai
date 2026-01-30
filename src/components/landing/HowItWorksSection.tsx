import { motion } from "framer-motion";
import { Upload, BarChart2, Lightbulb, Presentation, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Your Data",
    description: "Import property details, market data, and documentation. Support for CSV, Excel, and direct integrations.",
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    icon: BarChart2,
    title: "AI Analyzes Market",
    description: "Our AI processes market trends, comparables, demographics, and financial projections in seconds.",
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    icon: Lightbulb,
    title: "Generate Insights",
    description: "Receive actionable insights, risk assessments, and investment narratives tailored to your property.",
    color: "bg-amber-500/10 text-amber-500",
  },
  {
    icon: Presentation,
    title: "Create Pitch Deck",
    description: "Get a polished, consultant-grade presentation ready to impress clients and close deals.",
    color: "bg-green-500/10 text-green-500",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="section-padding bg-background relative overflow-hidden">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            How It Works
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Four Steps to{" "}
            <span className="bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent">
              Perfection
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Transform raw data into compelling presentations with our streamlined workflow.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-green-500/20 -translate-y-1/2" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="h-full p-6 rounded-2xl bg-card border border-border hover:shadow-card-hover hover:border-accent/30 transition-all duration-300 group">
                  {/* Step Number */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center shadow-lg">
                    {index + 1}
                  </div>

                  <div className={`w-14 h-14 rounded-2xl ${step.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <step.icon className="w-7 h-7" />
                  </div>

                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>

                  {/* Arrow for desktop */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                      <ArrowRight className="w-8 h-8 text-muted-foreground/30" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
