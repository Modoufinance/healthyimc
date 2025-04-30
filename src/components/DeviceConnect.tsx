
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
            description: `${device.name || 'Appareil'} synchronisé avec succès`,
            duration: 3000,
          });
        }
      }
    } catch (error) {
      console.error("Erreur de connexion:", error);
      toast({
        title: "Erreur de connexion",
        description: "Impossible de se connecter à l'appareil",
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
                className="w-full"
              >
                <AlertCircle className="h-4 w-4 mr-2" />
                Bluetooth non supporté par votre navigateur
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Votre navigateur ne supporte pas l'API Web Bluetooth. Essayez Chrome, Edge ou Opera pour cette fonctionnalité.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 mb-4">
      <Button
        variant={connectedDevice ? "outline" : "default"}
        onClick={handleConnect}
        disabled={isConnecting}
        className="w-full relative overflow-hidden group"
      >
        {isConnecting ? (
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        ) : (
          <Bluetooth className={`h-4 w-4 mr-2 ${connectedDevice ? 'text-blue-500' : ''}`} />
        )}
        <span>
          {connectedDevice ? 
            `Connecté à ${connectedDevice.name || 'l\'appareil'}` : 
            "Connecter un appareil"
          }
        </span>
        
        {/* Animated effect for connected device */}
        {connectedDevice && (
          <div className="absolute inset-0 bg-blue-500/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-xs text-blue-600">Cliquez pour reconnecter</span>
          </div>
        )}
      </Button>
      
      {/* Info tooltip */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="flex-shrink-0">
              <Info className="h-4 w-4 text-muted-foreground" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Connectez votre balance ou appareil Bluetooth compatible pour importer vos données automatiquement</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default DeviceConnect;
