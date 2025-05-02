
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

interface BMIChartProps {
  bmi: number;
}

const BMIChart = ({ bmi }: BMIChartProps) => {
  const { t } = useLanguage();

  const data = [
    { date: "2024-01", bmi: 18 },
    { date: "2024-02", bmi: bmi },
  ];

  const zones = [
    { yMin: 0, yMax: 18.5, color: "#93C5FD" },
    { yMin: 18.5, yMax: 24.9, color: "#86EFAC" },
    { yMin: 24.9, yMax: 29.9, color: "#FCD34D" },
    { yMin: 29.9, yMax: 40, color: "#FCA5A5" },
  ];

  return (
    <Card className="p-4 mt-6">
      <h3 className="text-lg font-semibold mb-4">{t.bmiHistory}</h3>
      <div className="w-full h-[300px]">
        <ResponsiveContainer>
          <LineChart 
            data={data} 
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            aria-label="Graphique d'évolution de l'IMC"
            role="img"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              aria-hidden="true" 
              aria-label="Dates de mesure"
              tickFormatter={(value) => {
                const date = new Date(value);
                return `${date.toLocaleDateString('fr-FR', { month: 'short' })}`;
              }}
            />
            <YAxis 
              domain={[15, 40]} 
              aria-hidden="true"
              aria-label="Valeurs d'IMC" 
            />
            <Tooltip 
              formatter={(value) => [`IMC: ${value}`, 'Valeur']} 
              labelFormatter={(label) => {
                const date = new Date(label);
                return `Date: ${date.toLocaleDateString('fr-FR')}`;
              }}
              aria-hidden="true"
            />
            
            {zones.map((zone, index) => (
              <ReferenceLine
                key={index}
                y={zone.yMin}
                strokeDasharray="3 3"
                stroke={zone.color}
                strokeWidth={2}
                aria-hidden="true"
              />
            ))}
            
            <Line
              type="monotone"
              dataKey="bmi"
              stroke="#6366F1"
              strokeWidth={2}
              dot={{ r: 6 }}
              activeDot={{ r: 8 }}
              aria-label={`Courbe d'IMC avec valeur actuelle de ${bmi}`}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex justify-center gap-4 mt-4" aria-label="Légende du graphique IMC">
        {[
          { label: t.categories.underweight, color: "#93C5FD" },
          { label: t.categories.normal, color: "#86EFAC" },
          { label: t.categories.overweight, color: "#FCD34D" },
          { label: t.categories.obese, color: "#FCA5A5" },
        ].map((zone, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: zone.color }}
              aria-hidden="true"
            />
            <span className="text-sm">{zone.label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default BMIChart;
