import { motion } from "framer-motion";
import { Clock, Award, TrendingUp, Handshake } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Save 10+ Hours Per Pitch",
    description: "What used to take days now takes minutes. Focus on client relationships, not slide formatting.",
    stat: "90%",
    statLabel: "Time Saved",
  },
  {
    icon: Award,
    title: "Professional Quality",
    description: "Every presentation looks like it came from a top consulting firm. Impress clients from the first slide.",
    stat: "100%",
    statLabel: "Client Ready",
  },
  {
    icon: TrendingUp,
    title: "Scale Your Business",
    description: "Handle more clients and properties without sacrificing quality. Grow without growing pains.",
    stat: "3x",
    statLabel: "More Pitches",
  },
  {
    icon: Handshake,
    title: "Win More Deals",
    description: "Data-driven insights and professional presentations build trust and close more deals.",
    stat: "45%",
    statLabel: "Higher Win Rate",
  },
];

const WhyItMattersSection = () => {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-success/10 text-success text-sm font-medium mb-4">
            Why It Matters
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Real Impact for{" "}
            <span className="bg-gradient-to-r from-success to-emerald-400 bg-clip-text text-transparent">
              Real Results
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            ConsultDeck isn't just a tool—it's a competitive advantage that transforms how you do business.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="h-full p-8 rounded-2xl bg-gradient-to-br from-card to-muted/30 border border-border hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-success/10 flex items-center justify-center group-hover:bg-success/20 transition-colors">
                    <benefit.icon className="w-7 h-7 text-success" />
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-success">{benefit.stat}</div>
                    <div className="text-sm text-muted-foreground">{benefit.statLabel}</div>
                  </div>
                </div>

                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyItMattersSection;
