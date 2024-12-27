import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Bluetooth, Loader2 } from "lucide-react";
import { connectToDevice, readDeviceData } from "@/services/deviceService";

interface DeviceConnectProps {
  onDataReceived: (weight?: number, height?: number) => void;
}

const DeviceConnect = ({ onDataReceived }: DeviceConnectProps) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectedDevice, setConnectedDevice] = useState<BluetoothDevice | null>(null);

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
            description: "Les données ont été synchronisées avec succès",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Erreur de connexion",
        description: "Impossible de se connecter à l'appareil",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="flex items-center gap-2 mb-4">
      <Button
        variant="outline"
        onClick={handleConnect}
        disabled={isConnecting}
        className="w-full"
      >
        {isConnecting ? (
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        ) : (
          <Bluetooth className="h-4 w-4 mr-2" />
        )}
        {connectedDevice ? 
          `Connecté à ${connectedDevice.name}` : 
          "Connecter un appareil"
        }
      </Button>
    </div>
  );
};

export default DeviceConnect;