
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from "recharts";
import { useLanguage } from "@/contexts/LanguageContext";

interface BMIPrediction {
  predictedBMI: number;
  timeframe: string;
  confidence: number;
}

interface BMIPredictionsProps {
  predictions: BMIPrediction[];
  currentBMI: number;
}

const BMIPredictions = ({ predictions, currentBMI }: BMIPredictionsProps) => {
  const { t } = useLanguage();

  const data = [
    { timeframe: "Aujourd'hui", bmi: currentBMI, type: "actuel", expectedBMI: null },
    ...predictions.map(p => ({
      timeframe: p.timeframe,
      bmi: null,
      type: "prédit",
      expectedBMI: p.predictedBMI,
      confidence: p.confidence
    }))
  ];

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      // Which data value is not null determines the type of point we're showing
      const isCurrent = payload[0].payload.bmi !== null;
      
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
          <p className="font-semibold text-gray-900">{label}</p>
          {isCurrent ? (
            <p className="font-bold text-lg text-blue-600">IMC actuel: {payload[0].value}</p>
          ) : (
            <>
              <p className="font-bold text-lg text-green-600">IMC prédit: {payload[1].value}</p>
              <p className="text-sm text-gray-600">Confiance: {Math.round(payload[0].payload.confidence * 100)}%</p>
            </>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-white to-green-50 shadow-lg border-green-100">
      <h3 className="text-xl font-bold mb-5 text-gray-800 flex items-center">
        <span className="bg-green-100 text-green-700 p-2 rounded-full mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m2 12 8-8v5h12v6H10v5Z"/></svg>
        </span>
        {t.bmiPredictions}
      </h3>
      <div className="w-full h-[250px]">
        <ResponsiveContainer>
          <LineChart 
            data={data}
            aria-label="Graphique de prédiction d'évolution de l'IMC dans le temps"
            role="img"
            margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
          >
            <defs>
              <linearGradient id="colorPrediction" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4facfe" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#4facfe" stopOpacity={0.2}/>
              </linearGradient>
              <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00f2fe" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#00f2fe" stopOpacity={0.2}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} vertical={false} />
            <XAxis 
              dataKey="timeframe" 
              aria-hidden="true"
              aria-label="Périodes de temps futures"
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              domain={['auto', 'auto']} 
              aria-hidden="true"
              aria-label="Valeurs d'IMC prédites"
              axisLine={false}
              tickLine={false}
              width={30}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value) => {
                return value === "actuel" ? "IMC Actuel" : "IMC Prédit";
              }}
            />
            <Line
              type="monotone"
              dataKey="bmi"
              name="actuel"
              stroke="#00f2fe"
              strokeWidth={3}
              dot={{ r: 6, fill: "#00f2fe", strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 8 }}
              connectNulls={true}
              aria-label={`IMC actuel: ${currentBMI}`}
            />
            <Line
              type="monotone"
              dataKey="expectedBMI"
              name="prédit"
              stroke="#4facfe" 
              strokeWidth={3}
              strokeDasharray="5 5"
              dot={{ r: 6, fill: "#4facfe", strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 8 }}
              connectNulls={true}
              aria-label="Prédictions d'IMC futures"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-100">
        <div className="flex items-start gap-3">
          <div className="mt-1 text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          </div>
          <p className="text-sm text-gray-700">
            Ce graphique montre l'évolution potentielle de votre IMC basée sur vos objectifs.
            Les prédictions sont des estimations et peuvent varier selon votre activité physique, 
            votre alimentation et d'autres facteurs personnels.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default BMIPredictions;
