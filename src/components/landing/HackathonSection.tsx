import { motion } from "framer-motion";
import { Rocket, Code, Users, Trophy } from "lucide-react";

const HackathonSection = () => {
  return (
    <section className="section-padding bg-primary relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent text-sm font-medium mb-6">
            <Trophy className="w-4 h-4" />
            <span>Hackathon Project</span>
          </div>

          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Built for Innovation,{" "}
            <span className="text-accent">Ready for Impact</span>
          </h2>

          <p className="text-primary-foreground/70 text-lg mb-12 leading-relaxed max-w-3xl mx-auto">
            ConsultDeck was born from a vision to democratize consulting-quality presentations 
            for real estate professionals. This hackathon solution demonstrates real-world 
            viability with immediate market applicability.
          </p>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: Rocket,
                title: "Rapid Development",
                description: "Built in 48 hours with production-ready architecture",
              },
              {
                icon: Code,
                title: "Cutting-Edge Tech",
                description: "AI/ML, real-time data, and modern web technologies",
              },
              {
                icon: Users,
                title: "Real-World Impact",
                description: "Solving actual pain points for real estate professionals",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display text-lg font-semibold text-primary-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-primary-foreground/60 text-sm">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HackathonSection;
