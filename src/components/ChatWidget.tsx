import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Phone, Mail, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "👋 Bonjour! Je suis l'assistant virtuel de Sara Diakité. Comment puis-je vous aider aujourd'hui?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const getBotResponse = async (userMessage: string): Promise<string> => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Réponses préprogrammées basées sur des mots-clés
    if (lowerMessage.includes('concert') || lowerMessage.includes('spectacle') || lowerMessage.includes('événement')) {
      return "🎵 Sara Diakité propose des concerts gospel émouvants. Pour réserver un concert ou événement, contactez-nous via WhatsApp ou email. Quel type d'événement organisez-vous?";
    }
    
    if (lowerMessage.includes('tarif') || lowerMessage.includes('prix') || lowerMessage.includes('coût')) {
      return "💰 Les tarifs varient selon le type d'événement et la durée. Pour un devis personnalisé, contactez Sara directement via WhatsApp ou email avec les détails de votre projet.";
    }
    
    if (lowerMessage.includes('album') || lowerMessage.includes('musique') || lowerMessage.includes('chanson')) {
      return "🎶 Sara Diakité a sorti l'album 'YESU' et le clip 'Invoque Moi'. Vous pouvez écouter ses chansons dans la section audio du site. Souhaitez-vous organiser un concert?";
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('réserver') || lowerMessage.includes('booking')) {
      return "📞 Parfait! Vous pouvez contacter Sara directement via WhatsApp ou email. Je peux vous aider à préparer votre message. De quel type de prestation avez-vous besoin?";
    }
    
    if (lowerMessage.includes('whatsapp') || lowerMessage.includes('téléphone')) {
      return "📱 Cliquez sur le bouton WhatsApp pour un contact direct et immédiat avec Sara. C'est le moyen le plus rapide pour organiser votre événement!";
    }
    
    if (lowerMessage.includes('email') || lowerMessage.includes('mail')) {
      return "✉️ Vous pouvez envoyer un email via le bouton email direct ou utiliser le formulaire de contact. Décrivez votre projet et Sara vous répondra rapidement!";
    }
    
    // Réponse par défaut qui incite au contact
    return "🎵 Sara Diakité est une chantre gospel reconnue qui propose des concerts et prestations. Pour toute demande de réservation ou collaboration, je vous encourage à la contacter directement via WhatsApp ou email. Puis-je vous aider avec autre chose?";
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentMessage.trim()) return;

    // Ajouter le message de l'utilisateur
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: currentMessage,
      isBot: false,
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setCurrentMessage("");
    setIsTyping(true);

    // Simuler un délai de réponse
    setTimeout(async () => {
      const botResponse = await getBotResponse(currentMessage);
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isBot: true,
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const openWhatsAppDirect = () => {
    const whatsappUrl = "https://wa.me/22370000000?text=Bonjour Sara, j'aimerais discuter d'une collaboration ou d'une réservation.";
    window.open(whatsappUrl, "_blank");
    toast({
      title: "WhatsApp ouvert!",
      description: "Vous pouvez maintenant discuter directement avec Sara.",
    });
  };

  const openEmailDirect = () => {
    const emailSubject = "Demande de réservation - Sara Diakité";
    const emailBody = "Bonjour Sara,\n\nJ'aimerais discuter d'une collaboration ou réservation pour un événement.\n\nCordialement,";
    const emailUrl = `mailto:booking@saradiakite.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.open(emailUrl, "_blank");
    toast({
      title: "Email ouvert!",
      description: "Votre client email va s'ouvrir pour contacter Sara.",
    });
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen ? (
          <Button
            onClick={() => setIsOpen(true)}
            className="rounded-full w-16 h-16 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-xl animate-pulse"
          >
            <Bot className="w-7 h-7" />
          </Button>
        ) : (
          <div className="bg-card border rounded-xl shadow-2xl w-96 max-h-[500px] overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-accent text-primary-foreground p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Assistant IA Sara</h3>
                  <p className="text-xs opacity-90">En ligne • Répond instantanément</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-primary-foreground hover:bg-primary-foreground/20"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="p-3 bg-card/50 border-b flex gap-2">
              <Button
                onClick={openWhatsAppDirect}
                size="sm"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white gap-2"
              >
                <Phone className="w-4 h-4" />
                WhatsApp
              </Button>
              <Button
                onClick={openEmailDirect}
                size="sm"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white gap-2"
              >
                <Mail className="w-4 h-4" />
                Email
              </Button>
            </div>

            {/* Chat Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((msg) => (
                <div key={msg.id} className={`flex gap-3 ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                  {msg.isBot && (
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  <div className={`max-w-[250px] p-3 rounded-lg ${
                    msg.isBot 
                      ? 'bg-primary/10 text-foreground' 
                      : 'bg-primary text-primary-foreground ml-auto'
                  }`}>
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  {!msg.isBot && (
                    <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-accent" />
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-3 border-t">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input
                  placeholder="Tapez votre message..."
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  className="flex-1"
                  disabled={isTyping}
                />
                <Button 
                  type="submit" 
                  size="sm" 
                  disabled={!currentMessage.trim() || isTyping}
                  className="px-3"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
              <p className="text-xs text-foreground/60 mt-2 text-center">
                💡 Demandez-moi des infos sur Sara, ses concerts, ou comment la contacter!
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatWidget;