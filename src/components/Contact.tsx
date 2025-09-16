import { useState } from "react";
import { Send, Phone, Mail, MessageCircle, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    eventType: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simuler l'envoi du formulaire
    setTimeout(() => {
      toast({
        title: "Message envoyé !",
        description: "Nous vous répondrons dans les plus brefs délais.",
      });
      setFormData({ name: "", email: "", message: "", eventType: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent("Bonjour Sara, je souhaiterais vous contacter pour un projet musical.");
    const whatsappUrl = `https://wa.me/223XXXXXXXX?text=${message}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="py-20 px-6 bg-gradient-to-b from-background to-card/20">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-heading text-center">Contact Professionnel</h2>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Formulaire de contact */}
          <div className="divine-card">
            <h3 className="text-2xl font-semibold text-primary mb-6">Demande de Booking</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                    placeholder="Votre nom"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="eventType" className="block text-sm font-medium text-foreground mb-2">
                  Type d'événement
                </label>
                <select
                  id="eventType"
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                >
                  <option value="">Sélectionnez un type</option>
                  <option value="concert">Concert</option>
                  <option value="festival">Festival</option>
                  <option value="wedding">Mariage</option>
                  <option value="corporate">Événement d'entreprise</option>
                  <option value="worship">Nuit de louange</option>
                  <option value="other">Autre</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors resize-none"
                  placeholder="Décrivez votre projet, la date souhaitée, le lieu, le nombre d'invités..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-divine w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  "Envoi en cours..."
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Envoyer la demande
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Informations de contact */}
          <div className="space-y-8">
            <div className="divine-card">
              <h3 className="text-2xl font-semibold text-primary mb-6">Informations de Contact</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Email Booking</h4>
                    <a 
                      href="mailto:booking@exemple.com"
                      className="text-primary hover:text-accent transition-colors"
                    >
                      booking@exemple.com
                    </a>
                    <p className="text-sm text-foreground/60 mt-1">Réponse sous 24h</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground flex-shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">WhatsApp</h4>
                    <button
                      onClick={openWhatsApp}
                      className="text-primary hover:text-accent transition-colors"
                    >
                      +223 XX XX XX XX
                    </button>
                    <p className="text-sm text-foreground/60 mt-1">Contact direct et rapide</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Localisation</h4>
                    <p className="text-foreground/70">Bamako, Mali</p>
                    <p className="text-sm text-foreground/60 mt-1">Disponible pour tournées internationales</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Horaires</h4>
                    <p className="text-foreground/70">Lun - Ven: 9h - 18h GMT</p>
                    <p className="text-sm text-foreground/60 mt-1">Réponse rapide par WhatsApp</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact WhatsApp direct */}
            <div className="divine-card bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
              <div className="text-center">
                <MessageCircle className="w-16 h-16 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold text-primary mb-3">Contact Immédiat</h3>
                <p className="text-foreground/70 mb-6">Pour une réponse rapide, contactez-nous directement sur WhatsApp</p>
                <button
                  onClick={openWhatsApp}
                  className="btn-divine"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Écrire sur WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;