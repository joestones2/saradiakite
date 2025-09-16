import { Calendar, MapPin, Download, Clock, Users } from "lucide-react";

const EventsAndPresskit = () => {
  const events = [
    {
      date: "15 Décembre 2024",
      time: "19h00",
      title: "Concert de Noël Gospel",
      venue: "Palais de la Culture, Bamako",
      type: "Concert",
      capacity: "2000 places",
      status: "Billetterie ouverte"
    },
    {
      date: "8 Janvier 2025",
      time: "20h30",
      title: "Nuit de Louange",
      venue: "Cathédrale Saint-Paul, Abidjan",
      type: "Worship Night",
      capacity: "1500 places",
      status: "Prochainement"
    },
    {
      date: "22 Février 2025",
      time: "18h00",
      title: "Festival Gospel International",
      venue: "Centre des Congrès, Dakar",
      type: "Festival",
      capacity: "5000 places",
      status: "Programmé"
    },
    {
      date: "15 Mars 2025",
      time: "19h30",
      title: "Concert Charity",
      venue: "Stade Omnisports, Ouagadougou",
      type: "Concert Caritatif",
      capacity: "3000 places",
      status: "En préparation"
    },
    {
      date: "28 Avril 2025",
      time: "20h00",
      title: "Tournée Européenne - Paris",
      venue: "L'Olympia, Paris",
      type: "Concert International",
      capacity: "2000 places",
      status: "Bientôt annoncé"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Billetterie ouverte":
        return "text-green-400 bg-green-400/10";
      case "Prochainement":
        return "text-yellow-400 bg-yellow-400/10";
      case "Programmé":
        return "text-blue-400 bg-blue-400/10";
      case "En préparation":
        return "text-orange-400 bg-orange-400/10";
      default:
        return "text-primary bg-primary/10";
    }
  };

  return (
    <section id="events" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-heading text-center">Événements & Presskit</h2>
        
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Events */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-semibold text-primary mb-8">Prochains Événements</h3>
            
            <div className="space-y-6">
              {events.map((event, index) => (
                <div key={index} className="divine-card">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Date */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-accent flex flex-col items-center justify-center text-primary-foreground">
                        <div className="text-xs font-medium">
                          {event.date.split(' ')[1].substring(0, 3)}
                        </div>
                        <div className="text-lg font-bold">
                          {event.date.split(' ')[0]}
                        </div>
                      </div>
                    </div>

                    {/* Event details */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                        <h4 className="text-lg font-semibold text-foreground">{event.title}</h4>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                          {event.status}
                        </span>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-2 text-sm text-foreground/70">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-primary" />
                          {event.venue}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary" />
                          {event.time}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-primary" />
                          {event.type}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-primary" />
                          {event.capacity}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Presskit */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-semibold text-primary mb-8">Presskit Professionnel</h3>
            
            <div className="divine-card text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground">
                <Download className="w-8 h-8" />
              </div>
              
              <h4 className="text-xl font-semibold text-foreground mb-4">Kit Média Complet</h4>
              
              <div className="text-sm text-foreground/70 mb-6 space-y-2">
                <p>• Biographie officielle (FR/EN)</p>
                <p>• Photos haute résolution</p>
                <p>• Discographie complète</p>
                <p>• Contact booking professionnel</p>
                <p>• Rider technique</p>
                <p>• Historique des concerts</p>
              </div>

              <button
                onClick={() => {
                  // Simuler le téléchargement du presskit
                  const link = document.createElement('a');
                  link.href = '/files/presskit-sara-diakite.pdf';
                  link.download = 'Sara-Diakite-Presskit-2024.pdf';
                  link.click();
                }}
                className="btn-divine w-full"
              >
                <Download className="w-5 h-5 mr-2" />
                Télécharger le Presskit
              </button>

              <p className="text-xs text-foreground/50 mt-4">
                Dernière mise à jour: Décembre 2024
              </p>
            </div>

            {/* Quick Stats */}
            <div className="divine-card mt-8">
              <h4 className="text-lg font-semibold text-primary mb-4 text-center">En Chiffres</h4>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-accent">50+</div>
                  <div className="text-xs text-foreground/70">Concerts</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent">2M+</div>
                  <div className="text-xs text-foreground/70">Vues YouTube</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent">5</div>
                  <div className="text-xs text-foreground/70">Pays visités</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent">3</div>
                  <div className="text-xs text-foreground/70">Albums</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsAndPresskit;