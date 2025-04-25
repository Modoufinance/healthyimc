
import { useState } from "react";
import { Weight, Activity, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { connectToDevice, readDeviceData } from "@/services/deviceService";

const FitnessTracker = () => {
  const [weight, setWeight] = useState<string>("");
  const [steps, setSteps] = useState<string>("");
  const [heartRate, setHeartRate] = useState<string>("");

  const handleConnectDevice = async () => {
    const device = await connectToDevice();
    if (device) {
      const data = await readDeviceData(device);
      if (data.weight) setWeight(data.weight.toString());
      if (data.steps) setSteps(data.steps.toString());
      if (data.heartRate) setHeartRate(data.heartRate.toString());
    }
  };

  return (
    <>
      <SEO
        title="Suivi Fitness - SantéIMC"
        description="Suivez vos progrès fitness avec notre tracker santé connecté"
        keywords="fitness tracker, suivi santé, activité physique, poids, rythme cardiaque"
      />
      
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Suivi Fitness</h1>
          <p className="text-gray-600">Suivez vos progrès et restez motivé</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100">
            <Weight className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="font-semibold mb-2">Poids</h3>
            <div className="space-y-2">
              <Label htmlFor="weight">Kg</Label>
              <Input
                id="weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Entrez votre poids"
              />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100">
            <Activity className="w-8 h-8 text-green-600 mb-4" />
            <h3 className="font-semibold mb-2">Pas</h3>
            <div className="space-y-2">
              <Label htmlFor="steps">Nombre de pas</Label>
              <Input
                id="steps"
                type="number"
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
                placeholder="Nombre de pas"
              />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-red-50 to-red-100">
            <Heart className="w-8 h-8 text-red-600 mb-4" />
            <h3 className="font-semibold mb-2">Rythme Cardiaque</h3>
            <div className="space-y-2">
              <Label htmlFor="heartRate">BPM</Label>
              <Input
                id="heartRate"
                type="number"
                value={heartRate}
                onChange={(e) => setHeartRate(e.target.value)}
                placeholder="Battements par minute"
              />
            </div>
          </Card>
        </div>

        <Button 
          onClick={handleConnectDevice}
          className="w-full md:w-auto bg-blue-600 hover:bg-blue-700"
        >
          Connecter un appareil
        </Button>
      </div>
    </>
  );
};

export default FitnessTracker;
