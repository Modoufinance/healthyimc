
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";

interface WorkoutCalendarProps {
  isPremium: boolean;
}

const WorkoutCalendar = ({ isPremium }: WorkoutCalendarProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Generate some example workouts for the next month
  const generateWorkoutDates = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const workouts = [];
    
    // For premium, generate more workouts
    const daysCount = isPremium ? 16 : 8;
    
    for (let i = 0; i < daysCount; i++) {
      // Skip some days to make it look more natural
      const day = Math.floor(Math.random() * 30) + 1;
      const workoutDate = new Date(year, month, day);
      
      // Don't add dates in the past
      if (workoutDate >= currentDate) {
        workouts.push(workoutDate);
      }
    }
    
    return workouts;
  };
  
  const workoutDates = generateWorkoutDates();
  
  // Check if a date has a workout
  const hasWorkout = (date: Date) => {
    return workoutDates.some(workoutDate => 
      workoutDate.getDate() === date.getDate() &&
      workoutDate.getMonth() === date.getMonth() &&
      workoutDate.getFullYear() === date.getFullYear()
    );
  };

  // Get workout for selected date
  const getWorkoutForDate = (date: Date) => {
    if (!hasWorkout(date)) return null;
    
    // Logic to determine which workout to show based on day of week
    const dayOfWeek = date.getDay();
    
    if (isPremium) {
      // Premium users get more varied workouts
      switch (dayOfWeek) {
        case 1: return "Haut du Corps";
        case 2: return "Cardio et Core";
        case 3: return "Journée de récupération active";
        case 4: return "Bas du Corps";
        case 5: return "Full Body HIIT";
        case 6: return "Entraînement fonctionnel";
        default: return "Journée de repos";
      }
    } else {
      // Free users get basic workouts
      switch (dayOfWeek) {
        case 1:
        case 4: return "Entraînement complet";
        case 2:
        case 5: return "Cardio simple";
        default: return "Journée de repos";
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white/10 backdrop-blur-lg border-0 p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Calendrier d'entraînement</h3>
            {isPremium && (
              <Badge variant="outline" className="border-white/30 text-white">
                Premium
              </Badge>
            )}
          </div>
          
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="bg-transparent rounded-md text-white"
            modifiers={{
              workout: workoutDates
            }}
            modifiersClassNames={{
              workout: "bg-blue-500/30 font-bold text-white rounded-md"
            }}
          />
          
          {!isPremium && (
            <div className="mt-4 text-center">
              <p className="text-white/70 text-sm mb-2">
                Passez à Premium pour accéder à un calendrier d'entraînement complet
              </p>
            </div>
          )}
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-lg border-0 p-4">
          <h3 className="text-lg font-semibold text-white mb-4">
            {date ? date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' }) : "Sélectionnez une date"}
          </h3>
          
          {date && hasWorkout(date) ? (
            <div className="space-y-4">
              <div className="bg-white/10 p-4 rounded-lg">
                <div className="text-xs uppercase text-white/70 mb-1">Type d'entraînement</div>
                <div className="text-white font-medium text-lg">{getWorkoutForDate(date)}</div>
              </div>
              
              {isPremium ? (
                <>
                  <div className="bg-white/10 p-4 rounded-lg">
                    <div className="text-xs uppercase text-white/70 mb-1">Durée estimée</div>
                    <div className="text-white font-medium">45-60 minutes</div>
                  </div>
                  
                  <div className="bg-white/10 p-4 rounded-lg">
                    <div className="text-xs uppercase text-white/70 mb-1">Focus</div>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <Badge variant="secondary" className="bg-blue-500/20">Force</Badge>
                      <Badge variant="secondary" className="bg-green-500/20">Endurance</Badge>
                      <Badge variant="secondary" className="bg-purple-500/20">Mobilité</Badge>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-white text-primary hover:bg-white/90">
                    Voir les détails
                  </Button>
                </>
              ) : (
                <div className="bg-white/20 p-4 rounded-lg text-center">
                  <p className="text-white mb-3">Accédez aux détails complets de cet entraînement</p>
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/20">
                    Passer à Premium
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white/10 p-6 rounded-lg text-center">
              <p className="text-white/80">
                {date ? "Aucun entraînement prévu pour cette date." : "Sélectionnez une date pour voir les détails de l'entraînement."}
              </p>
            </div>
          )}
        </Card>
      </div>
      
      {isPremium && (
        <Card className="bg-white/10 backdrop-blur-lg border-0 p-4">
          <h3 className="text-lg font-semibold text-white mb-4">Programme mensuel</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
            {Array.from({ length: 28 }, (_, i) => (
              <div key={i} className={`text-center p-2 rounded-lg ${i % 7 === 6 || i % 7 === 0 ? 'bg-white/5' : 'bg-white/10'}`}>
                <div className="text-xs text-white/70">Jour {i + 1}</div>
                <div className="text-white text-sm font-medium truncate">
                  {i % 7 === 6 || i % 7 === 0 ? 'Repos' : 
                    i % 7 === 1 || i % 7 === 4 ? 'Force' :
                    i % 7 === 2 ? 'Cardio' :
                    i % 7 === 3 ? 'Mobilité' :
                    'HIIT'}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default WorkoutCalendar;
