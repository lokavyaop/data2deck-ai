import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ImageIcon, Loader2, Download, X, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AIImageGeneratorProps {
  onImageGenerated?: (imageUrl: string) => void;
}

const AIImageGenerator = ({ onImageGenerated }: AIImageGeneratorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [quality, setQuality] = useState<"fast" | "high">("fast");
  const { toast } = useToast();

  const presetPrompts = [
    "Modern luxury apartment building with glass facade at sunset",
    "Aerial view of a commercial real estate development",
    "Interior of a high-end office space with city views",
    "Mixed-use development with retail and residential",
    "Sustainable green building with rooftop garden",
    "Industrial warehouse converted to creative offices"
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Please enter a prompt",
        description: "Describe the image you want to generate",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setGeneratedImage(null);

    try {
      const { data, error } = await supabase.functions.invoke("generate-image", {
        body: { prompt, quality }
      });

      if (error) {
        throw error;
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setGeneratedImage(data.imageUrl);
      toast({
        title: "Image generated!",
        description: "Your AI-generated image is ready"
      });

      if (onImageGenerated) {
        onImageGenerated(data.imageUrl);
      }
    } catch (error) {
      console.error("Error generating image:", error);
      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : "Failed to generate image",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    
    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = `ai-generated-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-primary to-accent text-primary-foreground gap-2 shadow-glow hover:shadow-glow-lg transition-all">
          <Sparkles className="w-4 h-4" />
          AI Image Generator
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-display">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Wand2 className="w-5 h-5 text-primary-foreground" />
            </div>
            AI Image Generator
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Prompt Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Describe your image
            </label>
            <div className="flex gap-2">
              <Input
                placeholder="e.g., Modern skyscraper with glass facade at golden hour..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="flex-1 bg-background border-border"
                onKeyDown={(e) => e.key === "Enter" && !isGenerating && handleGenerate()}
              />
            </div>
          </div>

          {/* Quality Toggle */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Quality:</span>
            <div className="flex gap-2">
              <Button
                variant={quality === "fast" ? "default" : "outline"}
                size="sm"
                onClick={() => setQuality("fast")}
                className="text-xs"
              >
                Fast
              </Button>
              <Button
                variant={quality === "high" ? "default" : "outline"}
                size="sm"
                onClick={() => setQuality("high")}
                className="text-xs"
              >
                High Quality
              </Button>
            </div>
          </div>

          {/* Preset Prompts */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Quick prompts
            </label>
            <div className="flex flex-wrap gap-2">
              {presetPrompts.map((preset, index) => (
                <button
                  key={index}
                  onClick={() => setPrompt(preset)}
                  className="px-3 py-1.5 text-xs rounded-full bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {preset.slice(0, 40)}...
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating... (this may take 10-30 seconds)
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate Image
              </>
            )}
          </Button>

          {/* Generated Image Display */}
          <AnimatePresence>
            {generatedImage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div className="relative rounded-xl overflow-hidden border border-border bg-muted">
                  <img
                    src={generatedImage}
                    alt="AI Generated"
                    className="w-full h-auto object-contain max-h-[400px]"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <Button
                      size="icon"
                      variant="secondary"
                      onClick={handleDownload}
                      className="w-8 h-8 bg-background/80 backdrop-blur-sm"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      onClick={() => setGeneratedImage(null)}
                      className="w-8 h-8 bg-background/80 backdrop-blur-sm"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  Right-click to save or use the download button
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Placeholder when no image */}
          {!generatedImage && !isGenerating && (
            <div className="flex flex-col items-center justify-center py-12 rounded-xl border border-dashed border-border bg-muted/30">
              <ImageIcon className="w-12 h-12 text-muted-foreground/50 mb-3" />
              <p className="text-sm text-muted-foreground">
                Your generated image will appear here
              </p>
            </div>
          )}

          {/* Loading State */}
          {isGenerating && (
            <div className="flex flex-col items-center justify-center py-12 rounded-xl border border-border bg-muted/30">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                <Sparkles className="w-6 h-6 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                AI is creating your image...
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIImageGenerator;
