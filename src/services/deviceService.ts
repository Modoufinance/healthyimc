interface DeviceData {
  weight?: number;
  height?: number;
  steps?: number;
  heartRate?: number;
}

declare global {
  interface Navigator {
    bluetooth: {
      requestDevice(options: {
        filters: Array<{
          services?: string[];
          namePrefix?: string;
        }>;
        optionalServices?: string[];
      }): Promise<any>;
    };
    permissions: {
      query(options: { name: string }): Promise<{ state: string }>;
    };
  }
}

export const connectToDevice = async (): Promise<any> => {
  try {
    // Vérifier les permissions Bluetooth
    const btPermission = await navigator.permissions.query({ name: "bluetooth" });
    if (btPermission.state === "denied") {
      console.error('Permission Bluetooth refusée');
      throw new Error('Permission Bluetooth refusée');
    }

    const device = await navigator.bluetooth.requestDevice({
      filters: [
        { namePrefix: 'MI' },
        { namePrefix: 'FITBIT' }
      ],
      optionalServices: ['weight_scale', 'height_measurement', 'step_counter']
    });
    
    console.log('Device connected:', device.name);
    return device;
  } catch (error) {
    console.error('Bluetooth connection failed:', error);
    return null;
  }
};

export const readDeviceData = async (device: any): Promise<DeviceData> => {
  const data: DeviceData = {};
  
  try {
    const server = await device.gatt?.connect();
    if (!server) return data;

    // Lecture du poids si disponible
    try {
      const weightService = await server.getPrimaryService('weight_scale');
      const weightChar = await weightService.getCharacteristic('weight_measurement');
      const weightValue = await weightChar.readValue();
      data.weight = weightValue.getFloat32(0, true);
    } catch (e) {
      console.log('Weight reading not available');
    }

    // Lecture de la taille si disponible
    try {
      const heightService = await server.getPrimaryService('height_measurement');
      const heightChar = await heightService.getCharacteristic('height_measurement');
      const heightValue = await heightChar.readValue();
      data.height = heightValue.getFloat32(0, true);
    } catch (e) {
      console.log('Height reading not available');
    }

    return data;
  } catch (error) {
    console.error('Error reading device data:', error);
    return data;
  }
};