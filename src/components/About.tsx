import { Calendar, Star, Music, Globe } from "lucide-react";

const About = () => {
  const timelineEvents = [
    {
      year: "2018",
      title: "Les Débuts",
      description: "Première apparition sur scène lors d'un concert de louange à Bamako",
      icon: <Star className="w-5 h-5" />
    },
    {
      year: "2020",
      title: "Premier Clip",
      description: "Sortie du clip 'Duba bɛ na la' qui conquiert l'Afrique de l'Ouest",
      icon: <Music className="w-5 h-5" />
    },
    {
      year: "2022",
      title: "Concerts Marquants",
      description: "Tournée internationale avec des concerts mémorables à travers l'Afrique",
      icon: <Globe className="w-5 h-5" />
    },
    {
      year: "2024",
      title: "Projets À Venir",
      description: "Nouvel album studio et tournée européenne en préparation",
      icon: <Calendar className="w-5 h-5" />
    }
  ];

  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-heading text-center">À Propos</h2>
        
        {/* Biographie longue */}
        <div className="divine-card max-w-4xl mx-auto mb-16">
          <div className="prose prose-lg max-w-none text-foreground/80">
            <p className="leading-relaxed mb-6">
              Sara Diakité est une figure emblématique de la musique gospel en Afrique de l'Ouest. 
              Née dans une famille où la foi et la musique se mêlent harmonieusement, elle découvre 
              sa vocation dès son plus jeune âge lors des cultes dominicaux.
            </p>
            
            <p className="leading-relaxed mb-6">
              Sa voix puissante et mélodieuse, imprégnée d'une spiritualité profonde, 
              touche les cœurs au-delà des frontières culturelles et linguistiques. 
              Sara chante principalement en français et en bambara, créant un pont unique 
              entre les traditions locales et la modernité gospel.
            </p>
            
            <p className="leading-relaxed mb-6">
              Reconnue pour ses performances live captivantes, Sara Diakité a participé 
              à de nombreux festivals et concerts à travers l'Afrique. Ses clips vidéo, 
              notamment "Duba bɛ na la" et "Yesu Kununa", cumulent des millions de vues 
              et témoignent de l'impact de son ministère musical.
            </p>
            
            <p className="leading-relaxed">
              Aujourd'hui, Sara continue d'inspirer et d'édifier à travers sa musique, 
              portant un message d'espoir et d'amour divin qui résonne dans le cœur 
              de tous ceux qui l'écoutent.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold text-primary mb-12 text-center">Parcours Musical</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {timelineEvents.map((event, index) => (
              <div key={index} className="divine-card text-center group">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground">
                  {event.icon}
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{event.year}</div>
                <h4 className="text-lg font-semibold text-foreground mb-3">{event.title}</h4>
                <p className="text-sm text-foreground/70 leading-relaxed">{event.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;