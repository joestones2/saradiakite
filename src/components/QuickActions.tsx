import { Phone, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const QuickActions = () => {
  const { toast } = useToast();

  const openWhatsApp = () => {
    const whatsappUrl = "https://wa.me/22370000000?text=Bonjour Sara, j'aimerais discuter d'une réservation ou collaboration.";
    window.open(whatsappUrl, "_blank");
    toast({
      title: "WhatsApp ouvert!",
      description: "Contactez Sara directement sur WhatsApp.",
    });
  };

  const openEmail = () => {
    const emailSubject = "Demande de réservation - Sara Diakité";
    const emailBody = "Bonjour Sara,\n\nJ'aimerais discuter d'une réservation pour un événement.\n\nCordialement,";
    const emailUrl = `mailto:booking@saradiakite.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.open(emailUrl);
    toast({
      title: "Email ouvert!",
      description: "Votre client email va s'ouvrir.",
    });
  };

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3">
      <Button
        onClick={openWhatsApp}
        className="w-14 h-14 rounded-full bg-green-600 hover:bg-green-700 shadow-lg group"
        title="Contact WhatsApp"
      >
        <Phone className="w-6 h-6 text-white" />
      </Button>
      
      <Button
        onClick={openEmail}
        className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg group"
        title="Contact Email"
      >
        <Mail className="w-6 h-6 text-white" />
      </Button>
      
      <div className="mt-2 bg-primary/10 rounded-full p-2">
        <MessageCircle className="w-6 h-6 text-primary animate-pulse" />
      </div>
    </div>
  );
};

export default QuickActions;