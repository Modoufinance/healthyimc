
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Bluetooth, Loader2, AlertCircle, Info } from "lucide-react";
import { connectToDevice, readDeviceData, isBluetoothSupported } from "@/services/deviceService";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DeviceConnectProps {
  onDataReceived: (weight?: number, height?: number) => void;
}

const DeviceConnect = ({ onDataReceived }: DeviceConnectProps) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectedDevice, setConnectedDevice] = useState<any | null>(null);
  const bluetoothSupported = isBluetoothSupported();

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      const device = await connectToDevice();
      if (device) {
        setConnectedDevice(device);
        const data = await readDeviceData(device);
        
        if (data.weight || data.height) {
          onDataReceived(data.weight, data.height);
          toast({
            title: "Appareil connecté",
            description: `Les données ont été synchronisées avec succès: ${data.weight}kg, ${data.height}cm`,
          });
        }
      }
    } catch (error) {
      console.error("Bluetooth connection error:", error);
      toast({
        title: "Erreur de connexion",
        description: "Impossible de se connecter à l'appareil. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  if (!bluetoothSupported) {
    return (
      <div className="flex items-center gap-2 mb-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                disabled
                className="w-full flex items-center justify-center border-dashed"
              >
                <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                Bluetooth non supporté par votre navigateur
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Le Web Bluetooth n'est pas supporté par votre navigateur. Essayez Chrome ou Edge.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 mb-4">
      <Button
        variant="outline"
        onClick={handleConnect}
        disabled={isConnecting}
        className="w-full group hover:bg-blue-50 transition-colors"
      >
        {isConnecting ? (
          <Loader2 className="h-4 w-4 mr-2 animate-spin text-blue-500" />
        ) : (
          <Bluetooth className="h-4 w-4 mr-2 text-blue-500 group-hover:text-blue-600" />
        )}
        {connectedDevice ? 
          `Connecté à ${connectedDevice.name}` : 
          "Connecter un appareil de pesée"
        }
      </Button>
      
      {!connectedDevice && !isConnecting && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="ghost" className="flex-shrink-0">
                <Info className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="max-w-[300px]">
              <p>Connectez votre balance ou appareil de mesure compatible Bluetooth pour importer automatiquement vos données.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

export default DeviceConnect;
