import { motion } from "framer-motion";
import { 
  Brain, 
  FileText, 
  BarChart3, 
  Download, 
  Shield, 
  Zap,
  Globe,
  Users,
  Lock
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Insights",
    description: "Advanced machine learning analyzes market trends, comparables, and investment potential.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: FileText,
    title: "Consulting-Style Narratives",
    description: "Generate executive summaries and investment theses written like top-tier consultants.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: BarChart3,
    title: "Automated Visualizations",
    description: "Beautiful charts, graphs, and data visualizations created automatically from your data.",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: Download,
    title: "Export Anywhere",
    description: "Download as PDF, PowerPoint, or share via secure links with your clients.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Shield,
    title: "Risk Assessment",
    description: "Comprehensive risk analysis with mitigation strategies and market sensitivity analysis.",
    gradient: "from-amber-500 to-yellow-500",
  },
  {
    icon: Zap,
    title: "Real-Time Data",
    description: "Live market data feeds ensure your presentations always reflect current conditions.",
    gradient: "from-indigo-500 to-violet-500",
  },
  {
    icon: Globe,
    title: "Market Coverage",
    description: "Access data and generate insights for properties across major metropolitan markets.",
    gradient: "from-teal-500 to-cyan-500",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Share pitches with team members, track views, and collaborate in real-time.",
    gradient: "from-rose-500 to-pink-500",
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    description: "Bank-grade encryption, SOC 2 compliance, and secure data handling.",
    gradient: "from-slate-500 to-gray-500",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="section-padding bg-muted/30 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />

      <div className="container-custom relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Key Features
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Close Deals
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Powerful features designed for real estate professionals who demand excellence.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group"
            >
              <div className="h-full p-6 rounded-2xl bg-card border border-border hover:shadow-card-hover hover:border-accent/30 transition-all duration-300">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
