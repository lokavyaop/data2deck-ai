import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  Plus, 
  FileText, 
  TrendingUp, 
  Clock, 
  Users,
  LogOut,
  Settings,
  HelpCircle,
  Search,
  Bell,
  ChevronRight,
  Eye,
  Download,
  MoreHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AIImageGenerator from "@/components/AIImageGenerator";

// Mock data for demonstration
const mockPitches = [
  {
    id: "1",
    title: "Manhattan Luxury Condo Development",
    property: "245 Park Avenue, New York",
    value: "$24.5M",
    status: "completed",
    views: 156,
    createdAt: "2024-01-15",
    imagePrompt: "Luxurious modern Manhattan high-rise condominium building with glass facade, aerial view of New York City skyline at golden hour, ultra realistic architectural visualization",
  },
  {
    id: "2",
    title: "Miami Beach Resort Investment",
    property: "Ocean Drive, Miami Beach",
    value: "$18.2M",
    status: "in_progress",
    views: 89,
    createdAt: "2024-01-18",
    imagePrompt: "Stunning beachfront luxury resort hotel in Miami Beach with palm trees, art deco style architecture, turquoise ocean water, sunny day, professional real estate photography",
  },
  {
    id: "3",
    title: "San Francisco Tech Campus",
    property: "1 Market Street, San Francisco",
    value: "$45.0M",
    status: "completed",
    views: 234,
    createdAt: "2024-01-20",
    imagePrompt: "Modern tech company campus building in San Francisco with sustainable design, glass and steel architecture, green rooftop garden, Bay Bridge visible in background",
  },
];

const communityPitches = [
  {
    id: "c1",
    title: "Chicago Commercial Plaza",
    author: "Sarah Johnson",
    value: "$32.1M",
    views: 1245,
    rating: 4.8,
  },
  {
    id: "c2",
    title: "Austin Mixed-Use Development",
    author: "Mike Chen",
    value: "$15.8M",
    views: 892,
    rating: 4.6,
  },
  {
    id: "c3",
    title: "Seattle Waterfront Property",
    author: "Emily Davis",
    value: "$28.5M",
    views: 1567,
    rating: 4.9,
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [pitchImages, setPitchImages] = useState<Record<string, string>>({});
  const [loadingImages, setLoadingImages] = useState<Record<string, boolean>>({});

  // Generate AI images for pitch decks
  const generatePitchImage = async (pitchId: string, prompt: string) => {
    if (pitchImages[pitchId] || loadingImages[pitchId]) return;
    
    setLoadingImages(prev => ({ ...prev, [pitchId]: true }));
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-image`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ prompt, quality: "standard" }),
        }
      );

      if (!response.ok) throw new Error("Failed to generate image");

      const data = await response.json();
      if (data.imageUrl) {
        setPitchImages(prev => ({ ...prev, [pitchId]: data.imageUrl }));
      }
    } catch (error) {
      console.error(`Failed to generate image for pitch ${pitchId}:`, error);
    } finally {
      setLoadingImages(prev => ({ ...prev, [pitchId]: false }));
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("consultdeck_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // Generate images for all pitches on mount
  useEffect(() => {
    if (user) {
      mockPitches.forEach(pitch => {
        generatePitchImage(pitch.id, pitch.imagePrompt);
      });
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("consultdeck_user");
    toast.success("Logged out successfully");
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center group-hover:shadow-glow transition-shadow">
                <BarChart3 className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-lg text-foreground">
                Consult<span className="text-accent">Deck</span>
              </span>
            </Link>

            {/* Search */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search pitches..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-muted/50 border-0"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <AIImageGenerator />
              <Link to="/help">
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                  <HelpCircle className="w-5 h-5" />
                </Button>
              </Link>
              <Button variant="ghost" size="icon" className="text-muted-foreground relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 pl-2">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                      {user.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                    <span className="hidden sm:inline text-sm font-medium">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/help">
                      <HelpCircle className="w-4 h-4 mr-2" />
                      Help Center
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container-custom py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Welcome back, {user.name?.split(" ")[0] || "there"}!
          </h1>
          <p className="text-muted-foreground">
            Ready to create your next winning pitch deck?
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {[
            { icon: FileText, label: "Total Pitches", value: "12", change: "+2 this week" },
            { icon: TrendingUp, label: "Total Value", value: "$87.7M", change: "+$15M this month" },
            { icon: Eye, label: "Total Views", value: "1,847", change: "+234 this week" },
            { icon: Clock, label: "Time Saved", value: "48 hrs", change: "This month" },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-5 rounded-xl bg-card border border-border hover:shadow-card transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
              <div className="text-xs text-success mt-2">{stat.change}</div>
            </div>
          ))}
        </motion.div>

        {/* Create New Pitch CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <Link to="/create-pitch">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-accent p-8 text-primary-foreground hover:shadow-glow transition-shadow group">
              <div className="relative z-10">
                <h2 className="font-display text-2xl font-bold mb-2">Create New Pitch Deck</h2>
                <p className="text-primary-foreground/80 mb-4 max-w-md">
                  Upload your property data and let AI generate a consultant-grade presentation in minutes.
                </p>
                <Button className="bg-white text-primary hover:bg-white/90 group-hover:shadow-lg transition-all">
                  <Plus className="w-4 h-4 mr-2" />
                  Start New Pitch
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
              <div className="absolute right-20 bottom-0 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
            </div>
          </Link>
        </motion.div>

        {/* Your Pitches */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-semibold text-foreground">Your Pitch Decks</h2>
            <Button variant="ghost" size="sm" className="text-accent">
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockPitches.map((pitch, index) => (
              <motion.div
                key={pitch.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                className="group"
              >
                <div className="rounded-xl bg-card border border-border overflow-hidden hover:shadow-card-hover hover:border-accent/30 transition-all">
                  {/* Thumbnail */}
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 relative overflow-hidden">
                    {pitchImages[pitch.id] ? (
                      <img 
                        src={pitchImages[pitch.id]} 
                        alt={pitch.title}
                        className="w-full h-full object-cover"
                      />
                    ) : loadingImages[pitch.id] ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <BarChart3 className="w-12 h-12 text-primary/40" />
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        pitch.status === "completed" 
                          ? "bg-success/20 text-success" 
                          : "bg-warning/20 text-warning"
                      }`}>
                        {pitch.status === "completed" ? "Completed" : "In Progress"}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-display font-semibold text-foreground mb-1 line-clamp-1">
                      {pitch.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-1">
                      {pitch.property}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-lg font-bold text-foreground">{pitch.value}</span>
                        <span className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Eye className="w-4 h-4" />
                          {pitch.views}
                        </span>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Community Pitches */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display text-xl font-semibold text-foreground">Community Showcase</h2>
              <p className="text-sm text-muted-foreground">Explore pitches from other professionals</p>
            </div>
            <Link to="/explore">
              <Button variant="outline" size="sm">
                <Users className="w-4 h-4 mr-2" />
                Explore All
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {communityPitches.map((pitch, index) => (
              <motion.div
                key={pitch.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              >
                <div className="p-5 rounded-xl bg-card border border-border hover:shadow-card transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-medium text-foreground mb-1">{pitch.title}</h3>
                      <p className="text-sm text-muted-foreground">by {pitch.author}</p>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-warning/10 text-warning text-xs font-medium">
                      ★ {pitch.rating}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-foreground">{pitch.value}</span>
                    <span className="text-muted-foreground">{pitch.views} views</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
