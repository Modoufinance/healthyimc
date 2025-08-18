
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Marie L.",
      text: "Grâce à ce calculateur d'IMC, j'ai pu suivre mon indice de masse corporelle et atteindre mes objectifs de poids santé.",
      rating: 5,
      beforeWeight: "85kg",
      afterWeight: "68kg",
      duration: "6 mois"
    },
    {
      name: "Pierre D.",
      text: "Simple et précis. Les conseils personnalisés basés sur l'IMC sont vraiment utiles pour maintenir un poids forme idéal!",
      rating: 5,
      beforeWeight: "92kg",
      afterWeight: "78kg",
      duration: "4 mois"
    },
    {
      name: "Sophie M.",
      text: "Un outil indispensable pour calculer et suivre mon IMC. Recommandé par mon médecin pour atteindre mon poids idéal.",
      rating: 5,
      beforeWeight: "77kg",
      afterWeight: "65kg",
      duration: "5 mois"
    }
  ];

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-white mb-12 text-center drop-shadow-lg">
        Témoignages IMC et histoires de réussite
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div 
            key={index} 
            className="bg-white/10 backdrop-blur-lg rounded-xl p-8 text-white transform hover:scale-105 transition-all duration-300 hover:bg-white/20 shadow-lg"
          >
            <div className="flex gap-1 mb-4">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current text-yellow-400" />
              ))}
            </div>
            <p className="mb-6 text-lg">"{testimonial.text}"</p>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-white/10 rounded-lg">
                <span>IMC avant</span>
                <span className="font-bold text-xl">{testimonial.beforeWeight}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-white/10 rounded-lg">
                <span>IMC après</span>
                <span className="font-bold text-xl">{testimonial.afterWeight}</span>
              </div>
              <p className="text-sm text-white/80">
                Durée : {testimonial.duration}
              </p>
            </div>
            <p className="font-semibold mt-4">{testimonial.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
