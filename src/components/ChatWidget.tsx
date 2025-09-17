import { useState } from "react";
import { MessageCircle, X, Send, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !message) {
      toast({
        title: "Information manquante",
        description: "Veuillez remplir votre nom et votre message.",
        variant: "destructive",
      });
      return;
    }

    // Send to WhatsApp
    const whatsappMessage = `Bonjour Sara,\n\nNom: ${name}\nEmail: ${email}\nTéléphone: ${phone}\n\nMessage: ${message}`;
    const whatsappUrl = `https://wa.me/22370000000?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, "_blank");
    
    toast({
      title: "Message envoyé!",
      description: "Votre message a été transmis via WhatsApp.",
    });
    
    // Reset form
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setIsOpen(false);
  };

  const openWhatsAppDirect = () => {
    const whatsappUrl = "https://wa.me/22370000000?text=Bonjour Sara, j'aimerais discuter d'une collaboration ou d'une réservation.";
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen ? (
          <Button
            onClick={() => setIsOpen(true)}
            className="rounded-full w-14 h-14 bg-primary hover:bg-primary/90 shadow-lg animate-pulse"
          >
            <MessageCircle className="w-6 h-6" />
          </Button>
        ) : (
          <div className="bg-card border rounded-lg shadow-xl w-80 max-h-96 overflow-hidden">
            {/* Header */}
            <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Chat avec Sara</h3>
                  <p className="text-xs opacity-90">Réservations & Contact</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-primary-foreground hover:bg-primary-foreground/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Chat Content */}
            <div className="p-4 space-y-4 max-h-64 overflow-y-auto">
              <div className="bg-primary/10 p-3 rounded-lg">
                <p className="text-sm text-foreground/80">
                  👋 Bonjour! Je suis disponible pour discuter de vos projets musicaux, 
                  réservations de concerts ou collaborations.
                </p>
              </div>

              {/* Quick Actions */}
              <div className="space-y-2">
                <Button
                  onClick={openWhatsAppDirect}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Contact WhatsApp Direct
                </Button>
              </div>

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <Input
                  placeholder="Votre nom*"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-sm"
                />
                <Input
                  type="email"
                  placeholder="Email (optionnel)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-sm"
                />
                <Input
                  type="tel"
                  placeholder="Téléphone (optionnel)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="text-sm"
                />
                <Textarea
                  placeholder="Votre message*"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="text-sm resize-none"
                  rows={3}
                />
                <Button type="submit" size="sm" className="w-full gap-2">
                  <Send className="w-4 h-4" />
                  Envoyer via WhatsApp
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatWidget;