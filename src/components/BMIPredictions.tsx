
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
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
    { timeframe: "Aujourd'hui", bmi: currentBMI },
    ...predictions.map(p => ({
      timeframe: p.timeframe,
      bmi: p.predictedBMI,
      confidence: p.confidence
    }))
  ];

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">{t.bmiPredictions}</h3>
      <div className="w-full h-[200px]">
        <ResponsiveContainer>
          <LineChart 
            data={data}
            aria-label="Graphique de prédiction d'évolution de l'IMC dans le temps"
            role="img"
          >
            <XAxis 
              dataKey="timeframe" 
              aria-hidden="true"
              aria-label="Périodes de temps futures"
            />
            <YAxis 
              domain={['auto', 'auto']} 
              aria-hidden="true"
              aria-label="Valeurs d'IMC prédites" 
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white p-2 border rounded shadow">
                      <p className="font-semibold">{data.timeframe}</p>
                      <p>IMC: {data.bmi}</p>
                      {data.confidence && (
                        <p>Confiance: {Math.round(data.confidence * 100)}%</p>
                      )}
                    </div>
                  );
                }
                return null;
              }}
              aria-hidden="true"
            />
            <Line
              type="monotone"
              dataKey="bmi"
              stroke="#4facfe"
              strokeWidth={2}
              dot={{ r: 4 }}
              aria-label={`Courbe de prédiction d'IMC partant de ${currentBMI} aujourd'hui`}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="text-sm text-muted-foreground mt-3">
        Ce graphique montre l'évolution potentielle de votre IMC basée sur vos objectifs.
        Les prédictions sont des estimations et peuvent varier selon plusieurs facteurs.
      </p>
    </Card>
  );
};

export default BMIPredictions;
