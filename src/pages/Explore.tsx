import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  ArrowLeft, 
  Search, 
  Filter,
  Eye,
  Star,
  TrendingUp,
  MapPin,
  Building2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const communityPitches = [
  {
    id: "e1",
    title: "Manhattan Commercial Tower",
    author: "John Smith",
    company: "Smith Realty",
    location: "New York, NY",
    type: "Commercial",
    value: "$45.2M",
    views: 2345,
    rating: 4.9,
    status: "completed",
  },
  {
    id: "e2",
    title: "Miami Beach Resort Development",
    author: "Sarah Johnson",
    company: "Coastal Properties",
    location: "Miami, FL",
    type: "Hospitality",
    value: "$28.5M",
    views: 1892,
    rating: 4.8,
  },
  {
    id: "e3",
    title: "San Francisco Tech Campus",
    author: "Mike Chen",
    company: "Bay Area Investments",
    location: "San Francisco, CA",
    type: "Commercial",
    value: "$62.0M",
    views: 3201,
    rating: 4.9,
  },
  {
    id: "e4",
    title: "Austin Mixed-Use Development",
    author: "Emily Davis",
    company: "Texas Holdings",
    location: "Austin, TX",
    type: "Mixed-Use",
    value: "$18.7M",
    views: 1456,
    rating: 4.7,
  },
  {
    id: "e5",
    title: "Chicago Industrial Park",
    author: "Robert Wilson",
    company: "Midwest Industrial",
    location: "Chicago, IL",
    type: "Industrial",
    value: "$35.4M",
    views: 987,
    rating: 4.6,
  },
  {
    id: "e6",
    title: "Seattle Waterfront Condo",
    author: "Amanda Lee",
    company: "Pacific Northwest RE",
    location: "Seattle, WA",
    type: "Residential",
    value: "$22.1M",
    views: 2156,
    rating: 4.8,
  },
  {
    id: "e7",
    title: "Denver Retail Center",
    author: "James Brown",
    company: "Rocky Mountain Properties",
    location: "Denver, CO",
    type: "Retail",
    value: "$15.3M",
    views: 876,
    rating: 4.5,
  },
  {
    id: "e8",
    title: "Boston Healthcare Facility",
    author: "Lisa Martinez",
    company: "New England Investments",
    location: "Boston, MA",
    type: "Healthcare",
    value: "$42.8M",
    views: 1654,
    rating: 4.7,
  },
];

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");

  const filteredPitches = communityPitches.filter(pitch => {
    const matchesSearch = pitch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pitch.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || pitch.type.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesType;
  });

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
                <span className="font-display font-bold text-foreground">Explore Community</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="container-custom py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Community Showcase
          </h1>
          <p className="text-muted-foreground">
            Explore pitch decks from real estate professionals around the world
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search pitches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="residential">Residential</SelectItem>
              <SelectItem value="mixed-use">Mixed-Use</SelectItem>
              <SelectItem value="industrial">Industrial</SelectItem>
              <SelectItem value="retail">Retail</SelectItem>
              <SelectItem value="hospitality">Hospitality</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="grid sm:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: "Total Pitches", value: "2,847" },
            { label: "Total Value", value: "$1.2B" },
            { label: "Active Users", value: "892" },
            { label: "This Week", value: "+124" },
          ].map((stat, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Pitches Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPitches.map((pitch, index) => (
            <motion.div
              key={pitch.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className="group"
            >
              <Link to={`/pitch-view/${pitch.id}`}>
                <div className="rounded-xl bg-card border border-border overflow-hidden hover:shadow-card-hover hover:border-accent/30 transition-all">
                  {/* Thumbnail */}
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BarChart3 className="w-10 h-10 text-primary/40" />
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 rounded-full bg-background/90 text-xs font-medium text-foreground">
                        {pitch.type}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-warning/20 text-warning text-xs font-medium">
                      <Star className="w-3 h-3 fill-current" />
                      {pitch.rating}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-medium text-foreground mb-1 line-clamp-1 group-hover:text-accent transition-colors">
                      {pitch.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      by {pitch.author} • {pitch.company}
                    </p>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <MapPin className="w-4 h-4" />
                      {pitch.location}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-foreground">{pitch.value}</span>
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Eye className="w-4 h-4" />
                        {pitch.views.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPitches.length === 0 && (
          <div className="text-center py-16">
            <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">
              No pitches found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Explore;
