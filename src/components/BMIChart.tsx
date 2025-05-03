
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
  Area,
} from "recharts";

interface BMIChartProps {
  bmi: number;
}

const BMIChart = ({ bmi }: BMIChartProps) => {
  const { t } = useLanguage();

  // Create a more realistic dataset with historical data
  const data = [
    { date: "2023-11", bmi: (bmi * 0.85).toFixed(1) },
    { date: "2023-12", bmi: (bmi * 0.90).toFixed(1) },
    { date: "2024-01", bmi: (bmi * 0.95).toFixed(1) },
    { date: "2024-02", bmi: bmi.toFixed(1) },
  ];

  const zones = [
    { yMin: 0, yMax: 18.5, color: "#93C5FD" },
    { yMin: 18.5, yMax: 24.9, color: "#86EFAC" },
    { yMin: 24.9, yMax: 29.9, color: "#FCD34D" },
    { yMin: 29.9, yMax: 40, color: "#FCA5A5" },
  ];
  
  // Format the tooltip values
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const date = new Date(label);
      const formattedDate = date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
          <p className="font-semibold text-gray-800">{formattedDate}</p>
          <p className="font-bold text-lg text-blue-600">IMC: {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-6 mt-6 bg-gradient-to-br from-white to-blue-50 shadow-lg border-blue-100">
      <h3 className="text-xl font-bold mb-5 text-gray-800 flex items-center">
        <span className="bg-blue-100 text-blue-700 p-2 rounded-full mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
        </span>
        {t.bmiHistory}
      </h3>
      <div className="w-full h-[300px]">
        <ResponsiveContainer>
          <LineChart 
            data={data} 
            margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
            aria-label="Graphique d'évolution de l'IMC"
            role="img"
          >
            <defs>
              <linearGradient id="colorBmi" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#6366F1" stopOpacity={0.2}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} vertical={false} />
            <XAxis 
              dataKey="date" 
              aria-hidden="true" 
              aria-label="Dates de mesure"
              tickFormatter={(value) => {
                const date = new Date(value);
                return `${date.toLocaleDateString('fr-FR', { month: 'short' })}`;
              }}
              axisLine={false}
              tickLine={false}
              dy={10}
            />
            <YAxis 
              domain={[15, 40]} 
              aria-hidden="true"
              aria-label="Valeurs d'IMC"
              axisLine={false}
              tickLine={false}
              dx={-10}
              tickCount={5}
              width={30}
            />
            <Tooltip content={<CustomTooltip />} aria-hidden="true" />
            
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
            
            <Area 
              type="monotone" 
              dataKey="bmi" 
              stroke="#6366F1" 
              fillOpacity={1} 
              fill="url(#colorBmi)" 
            />

            <Line
              type="monotone"
              dataKey="bmi"
              stroke="#6366F1"
              strokeWidth={3}
              dot={{ r: 6, fill: "#6366F1", strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 8, strokeWidth: 2, stroke: "#fff" }}
              aria-label={`Courbe d'IMC avec valeur actuelle de ${bmi}`}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex flex-wrap justify-center gap-3 mt-6" aria-label="Légende du graphique IMC">
        {[
          { label: t.categories.underweight, color: "#93C5FD" },
          { label: t.categories.normal, color: "#86EFAC" },
          { label: t.categories.overweight, color: "#FCD34D" },
          { label: t.categories.obese, color: "#FCA5A5" },
        ].map((zone, index) => (
          <div key={index} className="flex items-center gap-2 bg-white/80 px-3 py-1.5 rounded-full shadow-sm border border-gray-100">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: zone.color }}
              aria-hidden="true"
            />
            <span className="text-sm font-medium">{zone.label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default BMIChart;
