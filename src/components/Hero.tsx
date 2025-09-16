import { useState, useEffect } from "react";
import { Play, Calendar } from "lucide-react";
import heroImage from "@/assets/hero-sara-official.jpg";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background with Ken Burns */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Sara Diakité performing on stage"
          className="w-full h-full object-cover ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      {/* Hero Content */}
      <div className={`relative z-10 text-center max-w-4xl mx-auto px-6 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
        <h1 className="hero-title mb-6">
          Sara Diakité
        </h1>
        <p className="text-[var(--font-heading)] text-primary font-light mb-4 tracking-wide">
          Chantre de l'Éternel
        </p>
        <p className="text-[var(--font-body)] text-foreground/90 max-w-2xl mx-auto mb-8 leading-relaxed">
          Voix d'adoration, cœur pour les nations
        </p>
        
        {/* Bio courte */}
        <div className="divine-card max-w-3xl mx-auto mb-12 text-left">
          <p className="text-foreground/80 leading-relaxed">
            Sara Diakité — Chantre de l'Éternel. Chantre gospel d'Afrique de l'Ouest, voix d'adoration reconnue pour ses prestations live et ses clips. 
            Sa musique transcende les frontières et touche les cœurs à travers le monde. 
            <br /><br />
            <strong className="text-primary">Réservations :</strong> 
            <a href="mailto:booking@exemple.com" className="text-primary hover:text-accent transition-colors ml-2">
              booking@exemple.com
            </a>
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button 
            onClick={() => scrollToSection('audio')}
            className="btn-divine flex items-center gap-3 relative z-10"
          >
            <Play className="w-5 h-5" fill="currentColor" />
            Écouter
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="btn-outline-divine flex items-center gap-3"
          >
            <Calendar className="w-5 h-5" />
            Réserver
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;