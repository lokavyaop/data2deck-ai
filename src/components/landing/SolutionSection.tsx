import { motion } from "framer-motion";
import { Brain, Zap, FileCheck, TrendingUp } from "lucide-react";

const SolutionSection = () => {
  return (
    <section className="section-padding bg-primary relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-medium mb-4">
              The Solution
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
              AI-Powered Pitch Decks{" "}
              <span className="text-accent">in Minutes</span>
            </h2>
            <p className="text-primary-foreground/70 text-lg mb-8 leading-relaxed">
              ConsultDeck automatically analyzes market data and generates consultant-grade 
              presentations that would make McKinsey proud. No design skills required.
            </p>

            <div className="space-y-4">
              {[
                { icon: Brain, text: "AI-driven market analysis and insights" },
                { icon: Zap, text: "Generate complete decks in under 5 minutes" },
                { icon: FileCheck, text: "Professional, client-ready output" },
                { icon: TrendingUp, text: "Real-time market data integration" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-accent" />
                  </div>
                  <span className="text-primary-foreground/90">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-white/10 to-white/5 border border-white/10 p-8">
              {/* Mockup Cards */}
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur rounded-xl p-4 transform hover:scale-105 transition-transform">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-accent/30 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-accent" />
                    </div>
                    <span className="text-primary-foreground font-medium">Market Analysis</span>
                  </div>
                  <div className="h-20 bg-white/5 rounded-lg flex items-end justify-around p-2">
                    {[40, 65, 45, 80, 55, 70].map((height, i) => (
                      <div
                        key={i}
                        className="w-6 rounded-t bg-accent/60"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                    <div className="text-2xl font-bold text-primary-foreground">$2.4M</div>
                    <div className="text-primary-foreground/60 text-sm">Avg. Property Value</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                    <div className="text-2xl font-bold text-accent">+12.5%</div>
                    <div className="text-primary-foreground/60 text-sm">YoY Growth</div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FileCheck className="w-4 h-4 text-accent" />
                    <span className="text-primary-foreground text-sm font-medium">Generated Slides</span>
                  </div>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((_, i) => (
                      <div key={i} className="flex-1 h-16 bg-white/10 rounded-lg" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
