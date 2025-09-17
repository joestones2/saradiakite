import { useState, useEffect } from "react";
import { Calendar, Clock, User, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface EventType {
  uri: string;
  name: string;
  duration: number;
  description_plain?: string;
  scheduling_url: string;
}

const BookingWidget = () => {
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const loadEventTypes = async () => {
    try {
      setLoading(true);
      console.log('Loading Calendly event types...');

      // First get user info
      const { data: userData, error: userError } = await supabase.functions.invoke('calendly-booking', {
        body: { action: 'get_user_info' }
      });

      if (userError) {
        throw userError;
      }

      console.log('User data:', userData);

      // Then get event types
      const { data: eventTypesData, error: eventTypesError } = await supabase.functions.invoke('calendly-booking', {
        body: { 
          action: 'get_event_types',
          user_uri: userData.resource.uri 
        }
      });

      if (eventTypesError) {
        throw eventTypesError;
      }

      console.log('Event types data:', eventTypesData);
      setEventTypes(eventTypesData.collection || []);

    } catch (error) {
      console.error('Error loading event types:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les créneaux disponibles.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const openCalendlyLink = (schedulingUrl: string) => {
    window.open(schedulingUrl, '_blank', 'width=800,height=600');
    toast({
      title: "Calendly ouvert!",
      description: "La fenêtre de réservation Calendly s'est ouverte.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          className="bg-gradient-to-r from-primary to-accent text-white hover:from-primary/90 hover:to-accent/90 shadow-lg"
          size="lg"
          onClick={loadEventTypes}
        >
          <Calendar className="w-5 h-5 mr-2" />
          Prendre RDV avec Sara
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Réserver un rendez-vous
          </DialogTitle>
          <DialogDescription>
            Choisissez le type de rendez-vous que vous souhaitez avec Sara Diakité
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <span className="ml-2 text-foreground/60">Chargement des créneaux...</span>
            </div>
          ) : eventTypes.length > 0 ? (
            eventTypes.map((eventType) => (
              <Card key={eventType.uri} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    {eventType.name}
                  </CardTitle>
                  {eventType.description_plain && (
                    <CardDescription className="text-sm">
                      {eventType.description_plain}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-foreground/60">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {eventType.duration} min
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        Sara Diakité
                      </div>
                    </div>
                    <Button 
                      onClick={() => openCalendlyLink(eventType.scheduling_url)}
                      size="sm"
                      className="bg-primary hover:bg-primary/90"
                    >
                      Réserver
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-foreground/40 mx-auto mb-3" />
              <p className="text-foreground/60 mb-4">
                Aucun créneau de réservation disponible pour le moment.
              </p>
              <p className="text-sm text-foreground/40">
                Vous pouvez nous contacter directement via WhatsApp ou email.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingWidget;