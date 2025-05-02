
import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
}

interface FitnessPlanCardProps {
  title: string;
  exercises: Exercise[];
  intensity: string;
  duration: string;
  isPremium: boolean;
}

const FitnessPlanCard = ({
  title,
  exercises,
  intensity,
  duration,
  isPremium
}: FitnessPlanCardProps) => {
  return (
    <Card className={`overflow-hidden border-0 ${isPremium ? 'bg-white/20' : 'bg-white/10'} backdrop-blur-lg`}>
      <div className={`p-5 border-b border-white/10 flex justify-between items-center ${isPremium ? 'bg-white/10' : ''}`}>
        <h3 className="text-lg font-semibold text-white">
          {title}
        </h3>
        {isPremium && (
          <Badge variant="default" className="bg-gradient-to-r from-blue-400 to-violet-400">
            Premium
          </Badge>
        )}
      </div>
      
      <div className="p-5 space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-xs text-white/70 uppercase">Intensité</div>
            <div className="text-white font-medium">{intensity}</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-xs text-white/70 uppercase">Durée</div>
            <div className="text-white font-medium">{duration}</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-xs text-white/70 uppercase">Exercices</div>
            <div className="text-white font-medium">{exercises.length}</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-xs text-white/70 uppercase">Séries totales</div>
            <div className="text-white font-medium">{exercises.reduce((total, ex) => total + ex.sets, 0)}</div>
          </div>
        </div>
        
        <div className="overflow-auto">
          <table className="w-full text-white">
            <thead className="bg-white/10 text-xs uppercase">
              <tr>
                <th className="px-3 py-2 text-left">Exercice</th>
                <th className="px-3 py-2 text-center">Séries</th>
                <th className="px-3 py-2 text-center">Répétitions</th>
                <th className="px-3 py-2 text-center">Récupération</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {exercises.map((exercise, index) => (
                <tr key={index} className="hover:bg-white/5">
                  <td className="px-3 py-3 text-left">{exercise.name}</td>
                  <td className="px-3 py-3 text-center">{exercise.sets}</td>
                  <td className="px-3 py-3 text-center">{exercise.reps}</td>
                  <td className="px-3 py-3 text-center">{exercise.rest}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {isPremium && (
          <div className="mt-4 bg-white/10 rounded-lg p-3 text-white/90 text-sm">
            <p className="font-medium mb-1">Notes:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Échauffez-vous pendant 5-10 minutes avant de commencer</li>
              <li>Concentrez-vous sur la technique et la forme correcte</li>
              <li>Augmentez progressivement le poids ou les répétitions</li>
              <li>Terminez par des étirements sur les muscles travaillés</li>
            </ul>
          </div>
        )}
      </div>
    </Card>
  );
};

export default FitnessPlanCard;
