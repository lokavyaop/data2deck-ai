import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  ArrowLeft, 
  Download, 
  Share2,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Building2,
  MapPin,
  Calendar,
  DollarSign
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

// Mock financial projection data
const projectionData = [
  { year: "Year 1", revenue: 2.4, expenses: 1.8, noi: 0.6, cashFlow: 0.4 },
  { year: "Year 2", revenue: 2.6, expenses: 1.9, noi: 0.7, cashFlow: 0.5 },
  { year: "Year 3", revenue: 2.9, expenses: 2.0, noi: 0.9, cashFlow: 0.7 },
  { year: "Year 4", revenue: 3.2, expenses: 2.1, noi: 1.1, cashFlow: 0.9 },
  { year: "Year 5", revenue: 3.6, expenses: 2.2, noi: 1.4, cashFlow: 1.1 },
];

const marketCompData = [
  { name: "Subject Property", value: 24.5, pricePerSF: 196 },
  { name: "245 Madison Ave", value: 28.2, pricePerSF: 210 },
  { name: "One Bryant Park", value: 32.1, pricePerSF: 245 },
  { name: "350 Park Ave", value: 26.8, pricePerSF: 205 },
  { name: "390 Madison Ave", value: 22.4, pricePerSF: 185 },
];

const occupancyData = [
  { month: "Jan", occupancy: 92 },
  { month: "Feb", occupancy: 94 },
  { month: "Mar", occupancy: 93 },
  { month: "Apr", occupancy: 95 },
  { month: "May", occupancy: 96 },
  { month: "Jun", occupancy: 97 },
];

const tenantMixData = [
  { name: "Financial Services", value: 35, color: "hsl(217, 91%, 60%)" },
  { name: "Technology", value: 25, color: "hsl(160, 84%, 39%)" },
  { name: "Legal", value: 20, color: "hsl(38, 92%, 50%)" },
  { name: "Healthcare", value: 12, color: "hsl(280, 60%, 55%)" },
  { name: "Other", value: 8, color: "hsl(220, 14%, 70%)" },
];

const riskFactors = [
  {
    category: "Market Risk",
    level: "medium",
    title: "Market Volatility",
    description: "Commercial real estate in Manhattan shows moderate sensitivity to economic cycles. Current market indicators suggest stable conditions with 3-5% annual appreciation.",
    mitigation: "Diversified tenant base and long-term lease structures provide stability.",
  },
  {
    category: "Tenant Risk",
    level: "low",
    title: "Tenant Concentration",
    description: "Top 5 tenants represent 45% of rental income. All maintain investment-grade credit ratings with average remaining lease term of 7.2 years.",
    mitigation: "Staggered lease expirations and creditworthy tenants reduce concentration risk.",
  },
  {
    category: "Operational Risk",
    level: "low",
    title: "Building Age & Condition",
    description: "Built in 2020 with Class A specifications. Recent capital expenditure of $2.1M for HVAC upgrades and lobby renovation.",
    mitigation: "Modern systems and proactive maintenance program minimize operational risks.",
  },
  {
    category: "Financial Risk",
    level: "medium",
    title: "Interest Rate Sensitivity",
    description: "Current LTV of 55% with floating rate debt. A 100bps increase in rates would impact cash flow by approximately 8%.",
    mitigation: "Rate cap in place through 2027. Refinancing options being explored.",
  },
  {
    category: "Regulatory Risk",
    level: "low",
    title: "Zoning & Compliance",
    description: "Property fully compliant with NYC Local Law 97 emissions standards through 2030. No pending regulatory changes affecting operations.",
    mitigation: "Sustainability initiatives underway to exceed future requirements.",
  },
];

const PitchView = () => {
  const { id } = useParams();
  const [pitch, setPitch] = useState<any>(null);

  useEffect(() => {
    // Load pitch from localStorage or use mock data
    const storedPitches = JSON.parse(localStorage.getItem("consultdeck_pitches") || "[]");
    const foundPitch = storedPitches.find((p: any) => p.id === id);
    
    if (foundPitch) {
      setPitch(foundPitch);
    } else {
      // Use mock data
      setPitch({
        id,
        propertyName: "Manhattan Luxury Towers",
        propertyType: "commercial",
        address: "245 Park Avenue",
        city: "New York",
        state: "NY",
        askingPrice: "24,500,000",
        squareFootage: "125,000",
        yearBuilt: "2020",
        description: "Premier Class A office tower in the heart of Midtown Manhattan.",
      });
    }
  }, [id]);

  const handleDownload = () => {
    toast.success("Pitch deck downloaded successfully!");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  if (!pitch) return null;

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
                <span className="font-display font-bold text-foreground">Pitch Deck</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button onClick={handleDownload} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
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
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-primary-foreground">
            <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-sm font-medium mb-4 capitalize">
              {pitch.propertyType} Property
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
              {pitch.propertyName}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-primary-foreground/80">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {pitch.address}, {pitch.city}, {pitch.state}
              </span>
              <span className="flex items-center gap-1">
                <Building2 className="w-4 h-4" />
                {pitch.squareFootage} SF
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Built {pitch.yearBuilt}
              </span>
            </div>
            <div className="mt-6 text-4xl font-bold">
              ${pitch.askingPrice}
            </div>
          </div>
        </motion.div>

        {/* Executive Summary */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">Executive Summary</h2>
          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-muted-foreground leading-relaxed mb-4">
              {pitch.propertyName} represents a compelling investment opportunity in one of Manhattan's 
              most sought-after commercial corridors. This Class A office tower offers institutional-quality 
              tenancy, modern amenities, and strong cash flow characteristics with significant upside potential.
            </p>
            <div className="grid sm:grid-cols-4 gap-4">
              {[
                { label: "Cap Rate", value: "5.2%", trend: "up" },
                { label: "Occupancy", value: "97%", trend: "up" },
                { label: "NOI", value: "$1.4M", trend: "up" },
                { label: "IRR (5Y)", value: "12.8%", trend: "up" },
              ].map((metric, i) => (
                <div key={i} className="bg-muted/50 rounded-lg p-4">
                  <div className="text-sm text-muted-foreground mb-1">{metric.label}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-foreground">{metric.value}</span>
                    <TrendingUp className="w-4 h-4 text-success" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* 5-Year Financial Projections */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">5-Year Financial Projections</h2>
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-foreground mb-4">Revenue & NOI Forecast ($ Millions)</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={projectionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                      <XAxis dataKey="year" stroke="hsl(215, 16%, 47%)" fontSize={12} />
                      <YAxis stroke="hsl(215, 16%, 47%)" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(0, 0%, 100%)', 
                          border: '1px solid hsl(220, 13%, 91%)',
                          borderRadius: '8px'
                        }} 
                      />
                      <Legend />
                      <Area type="monotone" dataKey="revenue" name="Revenue" stackId="1" stroke="hsl(217, 91%, 60%)" fill="hsl(217, 91%, 60%)" fillOpacity={0.3} />
                      <Area type="monotone" dataKey="noi" name="NOI" stackId="2" stroke="hsl(160, 84%, 39%)" fill="hsl(160, 84%, 39%)" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-4">Cash Flow Analysis ($ Millions)</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={projectionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                      <XAxis dataKey="year" stroke="hsl(215, 16%, 47%)" fontSize={12} />
                      <YAxis stroke="hsl(215, 16%, 47%)" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(0, 0%, 100%)', 
                          border: '1px solid hsl(220, 13%, 91%)',
                          borderRadius: '8px'
                        }} 
                      />
                      <Legend />
                      <Bar dataKey="cashFlow" name="Cash Flow" fill="hsl(217, 91%, 60%)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Projection Table */}
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Metric</th>
                    {projectionData.map(d => (
                      <th key={d.year} className="text-right py-3 px-4 font-medium text-muted-foreground">{d.year}</th>
                    ))}
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground">CAGR</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium text-foreground">Gross Revenue</td>
                    {projectionData.map(d => (
                      <td key={d.year} className="text-right py-3 px-4 text-foreground">${d.revenue}M</td>
                    ))}
                    <td className="text-right py-3 px-4 text-success font-medium">+10.7%</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium text-foreground">Operating Expenses</td>
                    {projectionData.map(d => (
                      <td key={d.year} className="text-right py-3 px-4 text-foreground">${d.expenses}M</td>
                    ))}
                    <td className="text-right py-3 px-4 text-muted-foreground">+5.1%</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium text-foreground">Net Operating Income</td>
                    {projectionData.map(d => (
                      <td key={d.year} className="text-right py-3 px-4 text-foreground">${d.noi}M</td>
                    ))}
                    <td className="text-right py-3 px-4 text-success font-medium">+23.6%</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-foreground">Net Cash Flow</td>
                    {projectionData.map(d => (
                      <td key={d.year} className="text-right py-3 px-4 text-foreground">${d.cashFlow}M</td>
                    ))}
                    <td className="text-right py-3 px-4 text-success font-medium">+28.5%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </motion.section>

        {/* Market Analysis */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">Market Analysis</h2>
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-medium text-foreground mb-4">Comparable Sales ($ Millions)</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={marketCompData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                    <XAxis type="number" stroke="hsl(215, 16%, 47%)" fontSize={12} />
                    <YAxis dataKey="name" type="category" stroke="hsl(215, 16%, 47%)" fontSize={11} width={100} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(0, 0%, 100%)', 
                        border: '1px solid hsl(220, 13%, 91%)',
                        borderRadius: '8px'
                      }} 
                    />
                    <Bar dataKey="value" name="Sale Price ($M)" fill="hsl(217, 91%, 60%)" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-medium text-foreground mb-4">Tenant Mix by Industry</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={tenantMixData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {tenantMixData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(0, 0%, 100%)', 
                        border: '1px solid hsl(220, 13%, 91%)',
                        borderRadius: '8px'
                      }}
                      formatter={(value: number) => [`${value}%`, 'Share']}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Occupancy Trends */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mb-8"
        >
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">Occupancy Trends</h2>
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={occupancyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                  <XAxis dataKey="month" stroke="hsl(215, 16%, 47%)" fontSize={12} />
                  <YAxis domain={[85, 100]} stroke="hsl(215, 16%, 47%)" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(0, 0%, 100%)', 
                      border: '1px solid hsl(220, 13%, 91%)',
                      borderRadius: '8px'
                    }}
                    formatter={(value: number) => [`${value}%`, 'Occupancy']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="occupancy" 
                    name="Occupancy Rate"
                    stroke="hsl(160, 84%, 39%)" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(160, 84%, 39%)', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.section>

        {/* Risk Assessment */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">Risk Assessment & Mitigation</h2>
          <div className="space-y-4">
            {riskFactors.map((risk, index) => (
              <div key={index} className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                    risk.level === "low" ? "bg-success/10" :
                    risk.level === "medium" ? "bg-warning/10" : "bg-destructive/10"
                  }`}>
                    {risk.level === "low" ? (
                      <CheckCircle className={`w-5 h-5 text-success`} />
                    ) : risk.level === "medium" ? (
                      <AlertTriangle className={`w-5 h-5 text-warning`} />
                    ) : (
                      <AlertTriangle className={`w-5 h-5 text-destructive`} />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium uppercase ${
                        risk.level === "low" ? "bg-success/10 text-success" :
                        risk.level === "medium" ? "bg-warning/10 text-warning" : "bg-destructive/10 text-destructive"
                      }`}>
                        {risk.level} risk
                      </span>
                      <span className="text-sm text-muted-foreground">{risk.category}</span>
                    </div>
                    <h3 className="font-medium text-foreground mb-2">{risk.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{risk.description}</p>
                    <div className="bg-muted/50 rounded-lg p-3">
                      <span className="text-xs font-medium text-muted-foreground uppercase">Mitigation Strategy</span>
                      <p className="text-sm text-foreground mt-1">{risk.mitigation}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Investment Thesis */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">Investment Thesis</h2>
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 rounded-xl p-6">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Strong Fundamentals",
                  points: [
                    "97% occupancy with creditworthy tenants",
                    "7.2 year weighted average lease term",
                    "Below-market rents with 15% mark-to-market upside",
                  ],
                },
                {
                  title: "Value-Add Opportunity",
                  points: [
                    "Lobby and amenity renovation potential",
                    "ESG improvements for premium positioning",
                    "Lease-up of remaining 3% vacancy",
                  ],
                },
                {
                  title: "Exit Strategy",
                  points: [
                    "Core buyer appetite for stabilized assets",
                    "Potential condo conversion opportunity",
                    "Refinancing optionality in Year 3",
                  ],
                },
              ].map((section, i) => (
                <div key={i}>
                  <h3 className="font-medium text-foreground mb-3">{section.title}</h3>
                  <ul className="space-y-2">
                    {section.points.map((point, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default PitchView;
