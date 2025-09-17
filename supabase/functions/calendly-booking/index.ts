import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const CALENDLY_API_BASE = 'https://api.calendly.com';

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Calendly booking function called');
    const clientSecret = Deno.env.get('CALENDLY_CLIENT_SECRET');
    
    if (!clientSecret) {
      console.error('CALENDLY_CLIENT_SECRET not found');
      return new Response(
        JSON.stringify({ error: 'Configuration manquante' }), 
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const { action, ...data } = await req.json();
    console.log('Action requested:', action);

    switch (action) {
      case 'get_user_info':
        // Get current user info
        const userResponse = await fetch(`${CALENDLY_API_BASE}/users/me`, {
          headers: {
            'Authorization': `Bearer ${clientSecret}`,
            'Content-Type': 'application/json',
          },
        });

        if (!userResponse.ok) {
          console.error('Failed to get user info:', await userResponse.text());
          return new Response(
            JSON.stringify({ error: 'Erreur lors de la récupération des informations utilisateur' }), 
            { 
              status: userResponse.status, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          );
        }

        const userData = await userResponse.json();
        console.log('User data retrieved successfully');
        
        return new Response(JSON.stringify(userData), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      case 'get_event_types':
        // Get available event types
        const eventTypesResponse = await fetch(`${CALENDLY_API_BASE}/event_types?user=${data.user_uri}`, {
          headers: {
            'Authorization': `Bearer ${clientSecret}`,
            'Content-Type': 'application/json',
          },
        });

        if (!eventTypesResponse.ok) {
          console.error('Failed to get event types:', await eventTypesResponse.text());
          return new Response(
            JSON.stringify({ error: 'Erreur lors de la récupération des types d\'événements' }), 
            { 
              status: eventTypesResponse.status, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          );
        }

        const eventTypesData = await eventTypesResponse.json();
        console.log('Event types retrieved successfully');
        
        return new Response(JSON.stringify(eventTypesData), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      case 'get_scheduled_events':
        // Get scheduled events for the user
        const eventsResponse = await fetch(`${CALENDLY_API_BASE}/scheduled_events?user=${data.user_uri}`, {
          headers: {
            'Authorization': `Bearer ${clientSecret}`,
            'Content-Type': 'application/json',
          },
        });

        if (!eventsResponse.ok) {
          console.error('Failed to get scheduled events:', await eventsResponse.text());
          return new Response(
            JSON.stringify({ error: 'Erreur lors de la récupération des événements programmés' }), 
            { 
              status: eventsResponse.status, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          );
        }

        const eventsData = await eventsResponse.json();
        console.log('Scheduled events retrieved successfully');
        
        return new Response(JSON.stringify(eventsData), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      default:
        console.error('Unknown action:', action);
        return new Response(
          JSON.stringify({ error: 'Action non reconnue' }), 
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
    }

  } catch (error) {
    console.error('Error in calendly-booking function:', error);
    return new Response(
      JSON.stringify({ error: 'Erreur interne du serveur' }), 
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});