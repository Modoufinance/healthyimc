
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface BMITrendComparisonProps {
  bmi: number;
}

const BMITrendComparison = ({ bmi }: BMITrendComparisonProps) => {
  // Data comparing the user's BMI to different demographics
  const comparisonData = [
    { 
      name: "Votre IMC", 
      bmi: bmi,
      fill: "#4CC9F0" 
    },
    { 
      name: "Moyenne nationale", 
      bmi: 24.7, 
      fill: "#F72585" 
    },
    { 
      name: "Idéal santé", 
      bmi: 22,
      fill: "#4895EF"  
    },
    { 
      name: "Votre tranche d'âge", 
      bmi: 25.3,
      fill: "#560BAD" 
    }
  ];

  // BMI category ranges for the background
  const categoryRanges = [
    { category: "Insuffisance", range: [0, 18.5], color: "#93C5FD" },
    { category: "Normal", range: [18.5, 24.9], color: "#86EFAC" },
    { category: "Surpoids", range: [24.9, 29.9], color: "#FCD34D" },
    { category: "Obésité", range: [29.9, 50], color: "#FCA5A5" }
  ];

  // Find the BMI category of the user
  const getUserCategory = () => {
    if (bmi < 18.5) return "Insuffisance pondérale";
    if (bmi < 24.9) return "Poids normal";
    if (bmi < 29.9) return "Surpoids";
    return "Obésité";
  };
  
  const userCategory = getUserCategory();

  return (
    <Card className="p-4 shadow-lg rounded-lg backdrop-blur-sm bg-white/10 border border-white/20">
      <h3 className="text-lg font-semibold mb-4 text-white">Comparaison IMC</h3>
      
      <div className="w-full h-[210px]">
        <ResponsiveContainer>
          <BarChart
            data={comparisonData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis 
              type="number" 
              domain={[0, 40]} 
              tick={{ fill: "rgba(255,255,255,0.7)" }}
            />
            <YAxis 
              dataKey="name" 
              type="category" 
              tick={{ fill: "rgba(255,255,255,0.7)" }}
              width={100}
            />
            <Tooltip
              contentStyle={{ 
                backgroundColor: 'rgba(255,255,255,0.9)', 
                borderRadius: '8px', 
                border: 'none',
                color: '#333'
              }}
              formatter={(value) => [`IMC: ${value}`, '']}
            />
            <Bar 
              dataKey="bmi" 
              radius={[0, 4, 4, 0]}
              barSize={20}
            >
              {comparisonData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
            
            {/* Add background colors for BMI categories */}
            {categoryRanges.map((range, index) => (
              <rect
                key={`range-${index}`}
                x={range.range[0] * 7.5} // Adjust based on your chart scale
                width={(range.range[1] - range.range[0]) * 7.5}
                height="100%"
                fill={range.color}
                fillOpacity="0.1"
                y={0}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4">
        <div className="p-3 bg-white/20 rounded-lg">
          <h4 className="text-sm font-medium text-white mb-1">Votre catégorie: {userCategory}</h4>
          <p className="text-xs text-white/90">
            {bmi < 18.5 && "Votre IMC est inférieur à la moyenne nationale. Un suivi médical est recommandé."}
            {bmi >= 18.5 && bmi < 24.9 && "Votre IMC est dans la plage normale recommandée pour une santé optimale."}
            {bmi >= 24.9 && bmi < 29.9 && "Votre IMC est légèrement supérieur à la moyenne. Des ajustements mineurs de style de vie pourraient être bénéfiques."}
            {bmi >= 29.9 && "Votre IMC est significativement au-dessus de la moyenne nationale. Une consultation médicale est recommandée."}
          </p>
        </div>
      </div>
      
      <div className="flex justify-around mt-4">
        {categoryRanges.map((category, index) => (
          <div key={index} className="flex items-center gap-1">
            <div className="w-2 h-2" style={{ backgroundColor: category.color }}></div>
            <span className="text-xs text-white/80">{category.category}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default BMITrendComparison;
