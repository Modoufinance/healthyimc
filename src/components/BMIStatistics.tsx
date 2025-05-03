
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLanguage } from "@/contexts/LanguageContext";

interface BMIStatisticsProps {
  bmi: number;
  weight: number;
  height: number;
  age: number;
}

const BMIStatistics = ({ bmi, weight, height, age }: BMIStatisticsProps) => {
  const { t } = useLanguage();

  // Calculate healthy weight range for the person's height
  const minHealthyWeight = Math.round(18.5 * (height / 100) * (height / 100));
  const maxHealthyWeight = Math.round(24.9 * (height / 100) * (height / 100));
  
  // Calculate distance from healthy range
  let weightDifference = 0;
  let inRange = false;
  
  if (bmi < 18.5) {
    weightDifference = minHealthyWeight - weight;
  } else if (bmi > 24.9) {
    weightDifference = weight - maxHealthyWeight;
  } else {
    inRange = true;
  }
  
  // Get BMI category
  let category = '';
  let categoryColor = '';
  
  if (bmi < 18.5) {
    category = t.categories.underweight;
    categoryColor = 'bg-blue-100 text-blue-800';
  } else if (bmi < 25) {
    category = t.categories.normal;
    categoryColor = 'bg-green-100 text-green-800';
  } else if (bmi < 30) {
    category = t.categories.overweight;
    categoryColor = 'bg-yellow-100 text-yellow-800';
  } else {
    category = t.categories.obese;
    categoryColor = 'bg-red-100 text-red-800';
  }

  return (
    <Card className="p-6 mt-6 bg-white shadow-lg border-gray-100">
      <h3 className="text-xl font-bold mb-5 text-gray-800 flex items-center">
        <span className="bg-purple-100 text-purple-700 p-2 rounded-full mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 9v4"/><path d="M12 17h.01"/><path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0Z"/></svg>
        </span>
        Statistiques détaillées
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
          <div className="text-sm text-gray-600 mb-1">Votre IMC</div>
          <div className="text-3xl font-bold text-indigo-700">{bmi.toFixed(1)}</div>
          <div className={`mt-2 text-sm font-medium px-2.5 py-0.5 rounded-full inline-flex ${categoryColor}`}>
            {category}
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-teal-50 p-4 rounded-xl border border-green-100">
          <div className="text-sm text-gray-600 mb-1">IMC idéal</div>
          <div className="text-3xl font-bold text-teal-700">18.5 - 24.9</div>
          <div className="mt-2 text-sm text-gray-600">
            Recommandé par l'OMS
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100">
          <div className="text-sm text-gray-600 mb-1">Poids santé idéal</div>
          <div className="text-3xl font-bold text-purple-700">{minHealthyWeight} - {maxHealthyWeight} kg</div>
          <div className="mt-2 text-sm text-gray-600">
            Pour votre taille ({height} cm)
          </div>
        </div>
      </div>
      
      <div className="overflow-hidden rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Mesure</TableHead>
              <TableHead>Valeur</TableHead>
              <TableHead>Détails</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Âge</TableCell>
              <TableCell>{age} ans</TableCell>
              <TableCell className="text-gray-600">
                {age < 18 ? "Consultez un pédiatre pour l'interprétation" : 
                 age > 65 ? "Les normes d'IMC peuvent varier pour les seniors" : 
                 "Âge adulte standard"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Taille</TableCell>
              <TableCell>{height} cm</TableCell>
              <TableCell className="text-gray-600">
                {height < 150 ? "Taille inférieure à la moyenne" :
                 height > 190 ? "Taille supérieure à la moyenne" :
                 "Taille moyenne"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Poids</TableCell>
              <TableCell>{weight} kg</TableCell>
              <TableCell>
                {inRange ? (
                  <span className="inline-flex items-center bg-green-100 text-green-800 text-xs px-2.5 py-0.5 rounded-full">
                    <span className="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
                    Dans la zone santé
                  </span>
                ) : bmi < 18.5 ? (
                  <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-full">
                    <span className="w-2 h-2 mr-1 bg-blue-500 rounded-full"></span>
                    +{weightDifference} kg pour atteindre la zone santé
                  </span>
                ) : (
                  <span className="inline-flex items-center bg-yellow-100 text-yellow-800 text-xs px-2.5 py-0.5 rounded-full">
                    <span className="w-2 h-2 mr-1 bg-yellow-500 rounded-full"></span>
                    -{weightDifference} kg pour atteindre la zone santé
                  </span>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
        <div className="flex items-start gap-3">
          <div className="mt-1 text-amber-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 9v4"/><path d="M12 17h.01"/><path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0Z"/></svg>
          </div>
          <p className="text-sm text-gray-700">
            Ces statistiques sont fournies à titre informatif. L'IMC est un indicateur général qui ne prend pas en compte 
            la composition corporelle (masse musculaire vs masse grasse). Consultez un professionnel de santé pour une 
            évaluation complète.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default BMIStatistics;
