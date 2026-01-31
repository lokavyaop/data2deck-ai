import { Link } from "react-router-dom";
import { BarChart3, Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container-custom">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="font-display font-bold text-xl">
                Consult<span className="text-accent">Deck</span>
              </span>
            </Link>
            <p className="text-background/60 mb-6 max-w-md">
              AI-powered platform that transforms market data into consultant-grade 
              real estate pitch decks. Built for professionals who demand excellence.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-lg bg-background/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-background/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-background/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-display font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#features" 
                  onClick={(e) => { e.preventDefault(); document.querySelector("#features")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="text-background/60 hover:text-accent transition-colors text-sm cursor-pointer"
                >
                  Features
                </a>
              </li>
              <li>
                <a 
                  href="#how-it-works" 
                  onClick={(e) => { e.preventDefault(); document.querySelector("#how-it-works")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="text-background/60 hover:text-accent transition-colors text-sm cursor-pointer"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a 
                  href="#pricing" 
                  onClick={(e) => { e.preventDefault(); document.querySelector("#pricing")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="text-background/60 hover:text-accent transition-colors text-sm cursor-pointer"
                >
                  Pricing
                </a>
              </li>
              <li>
                <Link to="/explore" className="text-background/60 hover:text-accent transition-colors text-sm">
                  Explore
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display font-semibold mb-4">Support</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/help" className="text-background/60 hover:text-accent transition-colors text-sm">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-background/60 hover:text-accent transition-colors text-sm">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-background/60 hover:text-accent transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-background/60 hover:text-accent transition-colors text-sm">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-background/40 text-sm">
            © 2024 ConsultDeck. Hackathon Project. Built with ❤️
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-background/40 hover:text-accent transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-background/40 hover:text-accent transition-colors text-sm">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
