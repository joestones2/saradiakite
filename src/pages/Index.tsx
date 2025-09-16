import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import AudioPlayer from "@/components/AudioPlayer";
import VideoSection from "@/components/VideoSection";
import EventsAndPresskit from "@/components/EventsAndPresskit";
import Contact from "@/components/Contact";
import StickyAudioPlayer from "@/components/StickyAudioPlayer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Gallery />
        <AudioPlayer />
        <VideoSection />
        <EventsAndPresskit />
        <Contact />
      </main>
      <StickyAudioPlayer />
      
      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border/50 bg-card/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-foreground/60 mb-2">
            © 2024 Sara Diakité - Chantre de l'Éternel. Tous droits réservés.
          </p>
          <p className="text-sm text-foreground/40">
            Booking: <a href="mailto:booking@exemple.com" className="text-primary hover:text-accent transition-colors">booking@exemple.com</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
