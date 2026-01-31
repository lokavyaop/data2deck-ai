import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BarChart3, 
  ArrowLeft, 
  Upload, 
  FileText, 
  MapPin, 
  DollarSign,
  Building2,
  Calendar,
  CheckCircle,
  Loader2,
  Image,
  FileSpreadsheet,
  X,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const steps = [
  { id: 1, title: "Property Details", icon: Building2 },
  { id: 2, title: "Documentation", icon: FileText },
  { id: 3, title: "Generate Pitch", icon: Sparkles },
];

const CreatePitch = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  
  const [formData, setFormData] = useState({
    propertyName: "",
    propertyType: "",
    address: "",
    city: "",
    state: "",
    askingPrice: "",
    squareFootage: "",
    yearBuilt: "",
    description: "",
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
    toast.success(`${files.length} file(s) uploaded`);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Save pitch to localStorage
    const existingPitches = JSON.parse(localStorage.getItem("consultdeck_pitches") || "[]");
    const newPitch = {
      id: Date.now().toString(),
      ...formData,
      files: uploadedFiles.map(f => f.name),
      status: "completed",
      createdAt: new Date().toISOString(),
      views: 0,
    };
    localStorage.setItem("consultdeck_pitches", JSON.stringify([...existingPitches, newPitch]));
    
    toast.success("Pitch deck generated successfully!");
    navigate("/pitch-view/" + newPitch.id);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="propertyName">Property Name</Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="propertyName"
                    placeholder="Manhattan Luxury Towers"
                    value={formData.propertyName}
                    onChange={(e) => setFormData({ ...formData, propertyName: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="propertyType">Property Type</Label>
                <Select
                  value={formData.propertyType}
                  onValueChange={(value) => setFormData({ ...formData, propertyType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential">Residential</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="mixed-use">Mixed-Use</SelectItem>
                    <SelectItem value="industrial">Industrial</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="hospitality">Hospitality</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Street Address</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="address"
                  placeholder="245 Park Avenue"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder="New York"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  placeholder="NY"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="askingPrice">Asking Price</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="askingPrice"
                    placeholder="24,500,000"
                    value={formData.askingPrice}
                    onChange={(e) => setFormData({ ...formData, askingPrice: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="squareFootage">Square Footage</Label>
                <Input
                  id="squareFootage"
                  placeholder="125,000"
                  value={formData.squareFootage}
                  onChange={(e) => setFormData({ ...formData, squareFootage: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="yearBuilt">Year Built</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="yearBuilt"
                    placeholder="2020"
                    value={formData.yearBuilt}
                    onChange={(e) => setFormData({ ...formData, yearBuilt: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Property Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the property, its unique features, and investment highlights..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
              />
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                Upload Supporting Documents
              </h3>
              <p className="text-muted-foreground">
                Add property photos, floor plans, financial data, and market reports for a more comprehensive pitch.
              </p>
            </div>

            {/* Upload Zone */}
            <label className="block cursor-pointer">
              <div className="border-2 border-dashed border-border rounded-2xl p-12 text-center hover:border-accent/50 hover:bg-accent/5 transition-colors">
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="font-medium text-foreground mb-2">
                  Drop files here or click to upload
                </p>
                <p className="text-sm text-muted-foreground">
                  Supports PDF, XLSX, CSV, JPG, PNG (max 50MB each)
                </p>
              </div>
              <input
                type="file"
                multiple
                accept=".pdf,.xlsx,.csv,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            {/* Uploaded Files */}
            {uploadedFiles.length > 0 && (
              <div className="space-y-3">
                <Label>Uploaded Files</Label>
                <div className="space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border"
                    >
                      <div className="flex items-center gap-3">
                        {file.type.includes("image") ? (
                          <Image className="w-5 h-5 text-accent" />
                        ) : file.type.includes("spreadsheet") || file.name.endsWith(".xlsx") || file.name.endsWith(".csv") ? (
                          <FileSpreadsheet className="w-5 h-5 text-success" />
                        ) : (
                          <FileText className="w-5 h-5 text-warning" />
                        )}
                        <div>
                          <p className="text-sm font-medium text-foreground">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFile(index)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommended Documents */}
            <div className="bg-muted/30 rounded-xl p-6">
              <h4 className="font-medium text-foreground mb-4">Recommended Documents</h4>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  "Property Photos",
                  "Floor Plans",
                  "Financial Statements",
                  "Market Analysis",
                  "Rent Roll",
                  "Property Survey",
                  "Environmental Reports",
                  "Title Documents",
                ].map((doc) => (
                  <div key={doc} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-success/50" />
                    {doc}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            {!isGenerating ? (
              <>
                <div className="text-center">
                  <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                    <Sparkles className="w-10 h-10 text-accent" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
                    Ready to Generate Your Pitch Deck
                  </h3>
                  <p className="text-muted-foreground max-w-lg mx-auto">
                    Our AI will analyze your property data and create a consultant-grade 
                    presentation with market insights, financial projections, and risk assessments.
                  </p>
                </div>

                {/* Summary */}
                <div className="bg-muted/30 rounded-xl p-6 space-y-4">
                  <h4 className="font-medium text-foreground">Summary</h4>
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Property:</span>
                      <p className="font-medium text-foreground">{formData.propertyName || "—"}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Type:</span>
                      <p className="font-medium text-foreground capitalize">{formData.propertyType || "—"}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Location:</span>
                      <p className="font-medium text-foreground">
                        {formData.city && formData.state ? `${formData.city}, ${formData.state}` : "—"}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Asking Price:</span>
                      <p className="font-medium text-foreground">
                        {formData.askingPrice ? `$${formData.askingPrice}` : "—"}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Documents:</span>
                      <p className="font-medium text-foreground">{uploadedFiles.length} files</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button
                    onClick={handleGenerate}
                    size="lg"
                    className="bg-accent hover:bg-accent/90 text-accent-foreground px-12 py-6 text-lg shadow-glow"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Pitch Deck
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6 animate-pulse">
                  <Loader2 className="w-10 h-10 text-accent animate-spin" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
                  Generating Your Pitch Deck...
                </h3>
                <p className="text-muted-foreground max-w-lg mx-auto mb-8">
                  Our AI is analyzing market data, creating visualizations, and crafting 
                  your consultant-grade presentation.
                </p>

                <div className="max-w-md mx-auto space-y-3">
                  {[
                    { label: "Analyzing property data", done: true },
                    { label: "Fetching market comparables", done: true },
                    { label: "Generating financial projections", done: false },
                    { label: "Creating visualizations", done: false },
                    { label: "Compiling final presentation", done: false },
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      {step.done ? (
                        <CheckCircle className="w-5 h-5 text-success" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30" />
                      )}
                      <span className={step.done ? "text-foreground" : "text-muted-foreground"}>
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        );
    }
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
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center group-hover:shadow-glow transition-shadow">
                  <BarChart3 className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-display font-bold text-foreground">
                  Consult<span className="text-accent">Deck</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="container-custom py-8">
        {/* Progress Steps */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                      currentStep >= step.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <step.icon className="w-6 h-6" />
                  </div>
                  <span className={`mt-2 text-sm font-medium ${
                    currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-24 h-0.5 mx-4 ${
                    currentStep > step.id ? "bg-primary" : "bg-border"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>

          {/* Navigation Buttons */}
          {!isGenerating && (
            <div className="flex justify-between mt-8 pt-8 border-t border-border">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              {currentStep < 3 && (
                <Button
                  onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Continue
                  <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                </Button>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CreatePitch;
