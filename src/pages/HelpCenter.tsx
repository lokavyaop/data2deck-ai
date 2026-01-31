import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BarChart3, 
  ArrowLeft, 
  Search, 
  MessageCircle, 
  Book, 
  Video, 
  FileText,
  ChevronRight,
  ChevronDown,
  Send,
  Bot,
  User,
  Loader2,
  Play,
  Settings,
  Download,
  Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const categories = [
  {
    icon: Book,
    title: "Getting Started",
    description: "Learn the basics of ConsultDeck",
    articles: [
      { title: "Welcome to ConsultDeck", icon: Book, readTime: "3 min" },
      { title: "Setting up your account", icon: Settings, readTime: "5 min" },
      { title: "Understanding the dashboard", icon: BarChart3, readTime: "4 min" },
      { title: "Your first pitch deck", icon: FileText, readTime: "6 min" },
      { title: "Navigating the interface", icon: Book, readTime: "3 min" },
      { title: "Account settings & preferences", icon: Settings, readTime: "4 min" },
      { title: "Keyboard shortcuts guide", icon: Book, readTime: "2 min" },
      { title: "Mobile app overview", icon: Book, readTime: "5 min" },
    ],
  },
  {
    icon: FileText,
    title: "Creating Pitches",
    description: "Master the pitch creation workflow",
    articles: [
      { title: "How to upload property data", icon: FileText, readTime: "5 min" },
      { title: "Supported file formats (CSV, Excel, PDF)", icon: Download, readTime: "3 min" },
      { title: "Manual data entry guide", icon: FileText, readTime: "4 min" },
      { title: "Using AI to generate insights", icon: Bot, readTime: "6 min" },
      { title: "Customizing pitch templates", icon: Settings, readTime: "5 min" },
      { title: "Adding charts and visualizations", icon: BarChart3, readTime: "7 min" },
      { title: "Including market comparables", icon: FileText, readTime: "5 min" },
      { title: "Financial projections explained", icon: BarChart3, readTime: "8 min" },
      { title: "Risk assessment features", icon: FileText, readTime: "6 min" },
      { title: "Editing and revising pitches", icon: FileText, readTime: "4 min" },
      { title: "Version history & rollback", icon: FileText, readTime: "3 min" },
      { title: "Pitch deck best practices", icon: Book, readTime: "10 min" },
    ],
  },
  {
    icon: Video,
    title: "Video Tutorials",
    description: "Step-by-step visual guides",
    articles: [
      { title: "Quick start video walkthrough", icon: Play, readTime: "8 min" },
      { title: "Advanced features deep dive", icon: Play, readTime: "15 min" },
      { title: "Data import tutorial", icon: Play, readTime: "6 min" },
      { title: "Template customization demo", icon: Play, readTime: "10 min" },
      { title: "Collaboration features tour", icon: Play, readTime: "7 min" },
      { title: "Export options explained", icon: Play, readTime: "5 min" },
    ],
  },
  {
    icon: MessageCircle,
    title: "FAQ",
    description: "Common questions answered",
    articles: [
      { title: "What file formats are supported?", icon: MessageCircle, readTime: "2 min" },
      { title: "How secure is my data?", icon: MessageCircle, readTime: "3 min" },
      { title: "Can I collaborate with my team?", icon: Share2, readTime: "3 min" },
      { title: "What's included in each plan?", icon: MessageCircle, readTime: "4 min" },
      { title: "How do I export to PowerPoint?", icon: Download, readTime: "2 min" },
      { title: "Can I white-label my pitches?", icon: MessageCircle, readTime: "3 min" },
      { title: "How does AI analysis work?", icon: Bot, readTime: "5 min" },
      { title: "What markets are covered?", icon: MessageCircle, readTime: "3 min" },
      { title: "How do I share with clients?", icon: Share2, readTime: "2 min" },
      { title: "Troubleshooting upload issues", icon: MessageCircle, readTime: "4 min" },
      { title: "Browser compatibility", icon: MessageCircle, readTime: "2 min" },
      { title: "Billing and subscription FAQ", icon: MessageCircle, readTime: "5 min" },
      { title: "Data retention policies", icon: MessageCircle, readTime: "3 min" },
      { title: "API access and integrations", icon: Settings, readTime: "6 min" },
      { title: "Contact support", icon: MessageCircle, readTime: "1 min" },
    ],
  },
];

const popularArticles = [
  "How to upload property data",
  "Understanding market analysis reports",
  "Customizing your pitch deck templates",
  "Exporting to PowerPoint or PDF",
  "Sharing pitches with clients",
  "Interpreting risk assessments",
];

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    { 
      role: "assistant", 
      content: "Hi! I'm your ConsultDeck AI assistant. How can I help you today? You can ask me anything about creating pitch decks, understanding market data, or using the platform." 
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleCategory = (title: string) => {
    setExpandedCategory(expandedCategory === title ? null : title);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage;
    setInputMessage("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses: { [key: string]: string } = {
        default: "I'd be happy to help with that! ConsultDeck makes it easy to create professional pitch decks. Could you provide more details about what you're trying to accomplish?",
        upload: "To upload property data, go to 'Create New Pitch' from your dashboard. You can upload CSV, Excel files, or manually enter property details. We support various data formats including financial statements, rent rolls, and market reports.",
        export: "You can export your pitch decks in multiple formats! Click the 'Download' button on any completed pitch to get a PDF. For PowerPoint format, select 'Export to PPTX' from the dropdown menu.",
        share: "Sharing is simple! Click the 'Share' button on any pitch to copy a secure link. You can also invite collaborators directly via email. All shared pitches are view-only by default for security.",
        risk: "Our risk assessment analyzes multiple factors: market volatility, tenant concentration, building condition, interest rate sensitivity, and regulatory compliance. Each factor is rated low, medium, or high with specific mitigation strategies.",
      };

      const lowerMessage = userMessage.toLowerCase();
      let response = responses.default;
      
      if (lowerMessage.includes("upload") || lowerMessage.includes("data")) {
        response = responses.upload;
      } else if (lowerMessage.includes("export") || lowerMessage.includes("download") || lowerMessage.includes("pdf")) {
        response = responses.export;
      } else if (lowerMessage.includes("share") || lowerMessage.includes("collaborate")) {
        response = responses.share;
      } else if (lowerMessage.includes("risk")) {
        response = responses.risk;
      }

      setMessages(prev => [...prev, { role: "assistant", content: response }]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-display font-bold text-foreground">Help Center</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="container-custom py-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            How can we help you?
          </h1>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Find answers, explore tutorials, or chat with our AI assistant for instant help.
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 text-lg bg-card border-border"
            />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Categories & Articles */}
          <div className="lg:col-span-2 space-y-8">
            {/* Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">Browse by Category</h2>
              <div className="space-y-4">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className="rounded-xl bg-card border border-border overflow-hidden"
                  >
                    <div
                      onClick={() => toggleCategory(category.title)}
                      className="p-5 hover:bg-muted/30 transition-all cursor-pointer group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <category.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-foreground mb-1">{category.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{category.description}</p>
                          <span className="text-xs text-accent">{category.articles.length} articles</span>
                        </div>
                        <motion.div
                          animate={{ rotate: expandedCategory === category.title ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                        </motion.div>
                      </div>
                    </div>
                    
                    <AnimatePresence>
                      {expandedCategory === category.title && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-border divide-y divide-border">
                            {category.articles.map((article, articleIndex) => (
                              <div
                                key={articleIndex}
                                className="px-5 py-3 hover:bg-muted/50 transition-colors cursor-pointer flex items-center justify-between group/article"
                              >
                                <div className="flex items-center gap-3">
                                  <article.icon className="w-4 h-4 text-muted-foreground" />
                                  <span className="text-sm text-foreground">{article.title}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="text-xs text-muted-foreground">{article.readTime}</span>
                                  <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover/article:opacity-100 transition-opacity" />
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Popular Articles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">Popular Articles</h2>
              <div className="bg-card border border-border rounded-xl divide-y divide-border">
                {popularArticles.map((article, index) => (
                  <div
                    key={index}
                    className="p-4 hover:bg-muted/50 transition-colors cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-muted-foreground" />
                      <span className="text-foreground">{article}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* AI Chat */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24">
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">AI Assistant</h2>
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                {/* Chat Messages */}
                <div className="h-96 overflow-y-auto p-4 space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                    >
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        message.role === "user" ? "bg-primary" : "bg-accent"
                      }`}>
                        {message.role === "user" ? (
                          <User className="w-4 h-4 text-primary-foreground" />
                        ) : (
                          <Bot className="w-4 h-4 text-accent-foreground" />
                        )}
                      </div>
                      <div className={`max-w-[80%] p-3 rounded-xl text-sm ${
                        message.role === "user" 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-muted text-foreground"
                      }`}>
                        {message.content}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                        <Bot className="w-4 h-4 text-accent-foreground" />
                      </div>
                      <div className="bg-muted p-3 rounded-xl">
                        <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-border">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Ask a question..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button 
                      onClick={handleSendMessage} 
                      disabled={isLoading || !inputMessage.trim()}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default HelpCenter;
