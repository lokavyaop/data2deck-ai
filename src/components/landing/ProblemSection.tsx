import { motion } from "framer-motion";
import { Clock, Palette, TrendingDown, Users } from "lucide-react";

const problems = [
  {
    icon: Clock,
    title: "Hours of Manual Work",
    description: "Real estate agents spend 8-12 hours creating each pitch deck, pulling data from multiple sources and formatting slides.",
  },
  {
    icon: Palette,
    title: "Lack of Design Skills",
    description: "Most agents aren't designers. Their presentations look unprofessional, undermining their credibility with clients.",
  },
  {
    icon: TrendingDown,
    title: "Outdated Market Data",
    description: "By the time a pitch is ready, market conditions may have changed, making the analysis obsolete.",
  },
  {
    icon: Users,
    title: "Lost Client Trust",
    description: "Subpar presentations fail to convey expertise, leading to lost deals and diminished professional reputation.",
  },
];

const ProblemSection = () => {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--muted)/0.3)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--muted)/0.3)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      <div className="container-custom relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-destructive/10 text-destructive text-sm font-medium mb-4">
            The Problem
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Real Estate Pitches Are{" "}
            <span className="text-destructive">Broken</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The traditional approach to creating real estate presentations is inefficient, 
            inconsistent, and fails to impress today's sophisticated clients.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full p-6 lg:p-8 rounded-2xl bg-card border border-border hover:border-destructive/30 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center group-hover:bg-destructive/20 transition-colors">
                    <problem.icon className="w-6 h-6 text-destructive" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                      {problem.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {problem.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
