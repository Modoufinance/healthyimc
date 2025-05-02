
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
  AreaChart,
  Legend,
} from "recharts";
import { useState } from "react";

interface BMIChartProps {
  bmi: number;
}

const BMIChart = ({ bmi }: BMIChartProps) => {
  const { t } = useLanguage();
  const [chartView, setChartView] = useState<'line' | 'area'>('area');

  // Generate mock data for the chart
  const currentDate = new Date();
  const generatePastDates = (numberOfMonths: number) => {
    return Array.from({ length: numberOfMonths }, (_, i) => {
      const date = new Date();
      date.setMonth(currentDate.getMonth() - (numberOfMonths - i - 1));
      return {
        date: date.toISOString().substring(0, 7),
        bmi: Number((Math.random() * 3 + bmi - 1.5).toFixed(1)),
      };
    });
  };

  const data = [
    ...generatePastDates(5),
    { date: currentDate.toISOString().substring(0, 7), bmi },
  ];

  const zones = [
    { name: "Insuffisance pondérale", yMin: 0, yMax: 18.5, color: "#93C5FD" },
    { name: "Poids normal", yMin: 18.5, yMax: 24.9, color: "#86EFAC" },
    { name: "Surpoids", yMin: 24.9, yMax: 29.9, color: "#FCD34D" },
    { name: "Obésité", yMin: 29.9, yMax: 40, color: "#FCA5A5" },
  ];

  return (
    <Card className="p-4 shadow-lg rounded-lg backdrop-blur-sm bg-white/10 border border-white/20">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">{t.bmiHistory}</h3>
        <div className="flex space-x-2">
          <button
            className={`px-2 py-1 rounded-md text-xs ${
              chartView === 'line' ? 'bg-white text-blue-600' : 'bg-white/20 text-white'
            }`}
            onClick={() => setChartView('line')}
          >
            Ligne
          </button>
          <button
            className={`px-2 py-1 rounded-md text-xs ${
              chartView === 'area' ? 'bg-white text-blue-600' : 'bg-white/20 text-white'
            }`}
            onClick={() => setChartView('area')}
          >
            Zone
          </button>
        </div>
      </div>
      
      <div className="w-full h-[280px]">
        <ResponsiveContainer>
          {chartView === 'line' ? (
            <LineChart 
              data={data} 
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              aria-label="Graphique d'évolution de l'IMC"
              role="img"
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
              <XAxis 
                dataKey="date" 
                aria-hidden="true" 
                aria-label="Dates de mesure"
                stroke="rgba(255,255,255,0.7)"
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return `${date.toLocaleDateString('fr-FR', { month: 'short' })}`;
                }}
              />
              <YAxis 
                domain={[Math.max(15, Math.floor(bmi) - 5), Math.min(40, Math.ceil(bmi) + 5)]} 
                aria-hidden="true"
                aria-label="Valeurs d'IMC"
                stroke="rgba(255,255,255,0.7)"
              />
              <Tooltip 
                formatter={(value) => [`IMC: ${value}`, 'Valeur']} 
                labelFormatter={(label) => {
                  const date = new Date(label);
                  return `Date: ${date.toLocaleDateString('fr-FR')}`;
                }}
                contentStyle={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '8px', border: 'none' }}
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
                stroke="#4CC9F0"
                strokeWidth={3}
                dot={{ r: 6, fill: "#4CC9F0", strokeWidth: 2, stroke: "#FFFFFF" }}
                activeDot={{ r: 8, fill: "#4CC9F0", strokeWidth: 2, stroke: "#FFFFFF" }}
                aria-label={`Courbe d'IMC avec valeur actuelle de ${bmi}`}
              />
            </LineChart>
          ) : (
            <AreaChart
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              aria-label="Graphique d'évolution de l'IMC"
              role="img"
            >
              <defs>
                <linearGradient id="colorBMI" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4CC9F0" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#4CC9F0" stopOpacity={0.2}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
              <XAxis 
                dataKey="date" 
                aria-hidden="true" 
                stroke="rgba(255,255,255,0.7)"
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return `${date.toLocaleDateString('fr-FR', { month: 'short' })}`;
                }}
              />
              <YAxis 
                domain={[Math.max(15, Math.floor(bmi) - 5), Math.min(40, Math.ceil(bmi) + 5)]} 
                aria-hidden="true"
                stroke="rgba(255,255,255,0.7)"
              />
              <Tooltip
                formatter={(value) => [`IMC: ${value}`, 'Valeur']} 
                labelFormatter={(label) => {
                  const date = new Date(label);
                  return `Date: ${date.toLocaleDateString('fr-FR')}`;
                }}
                contentStyle={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '8px', border: 'none' }}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="bmi" 
                stroke="#4CC9F0" 
                fillOpacity={1} 
                fill="url(#colorBMI)" 
                strokeWidth={3}
                dot={{ r: 6, fill: "#4CC9F0", strokeWidth: 2, stroke: "#FFFFFF" }}
                activeDot={{ r: 8, fill: "#4CC9F0", strokeWidth: 2, stroke: "#FFFFFF" }}
              />
              {zones.map((zone, index) => (
                <ReferenceLine
                  key={index}
                  y={zone.yMin}
                  strokeDasharray="3 3"
                  stroke={zone.color}
                  strokeWidth={2}
                  label={{ 
                    value: zone.name, 
                    position: 'insideLeft',
                    fill: 'white',
                    fontSize: 10 
                  }}
                />
              ))}
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
      
      <div className="flex justify-center gap-4 mt-4" aria-label="Légende du graphique IMC">
        {zones.map((zone, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: zone.color }}
              aria-hidden="true"
            />
            <span className="text-sm text-white/90">{zone.name}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default BMIChart;
