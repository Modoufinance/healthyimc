
// Implementation of device service functions for Web Bluetooth API

/**
 * Check if Web Bluetooth API is available
 * @returns boolean indicating if Bluetooth is supported
 */
export const isBluetoothSupported = (): boolean => {
  return 'bluetooth' in navigator;
};

/**
 * Connect to a bluetooth device
 * @returns A promise resolving to the connected device or null if connection fails
 */
export const connectToDevice = async () => {
  try {
    // Check if the Web Bluetooth API is available
    if (!isBluetoothSupported()) {
      throw new Error("Bluetooth not supported");
    }

    console.log('Requesting Bluetooth device...');

    // Request device with specific filters for health devices
    const device = await navigator.bluetooth.requestDevice({
      // Common filters for health and fitness devices
      filters: [
        // Weight scales and body composition analyzers
        { services: ['weight_scale'] },
        { services: ['body_composition'] },
        { namePrefix: 'Scale' },
        { namePrefix: 'Smart Scale' },
        { namePrefix: 'Fitbit' },
        { namePrefix: 'Xiaomi' },
        { namePrefix: 'Mi Smart' },
        { namePrefix: 'MiScale' },
        { namePrefix: 'Withings' },
        
        // Health and fitness devices
        { services: ['health_thermometer'] },
        { services: ['heart_rate'] },
        { services: ['health_status'] },
      ],
      optionalServices: [
        'weight_scale', 
        'body_composition',
        'user_data',
        'device_information'
      ]
    });

    console.log('Device selected:', device.name);
    
    // Connect to the GATT server
    const server = await device.gatt?.connect();
    console.log('Connected to GATT server', server);
    
    return device;
  } catch (error) {
    console.error('Error connecting to device:', error);
    throw error;
  }
};

/**
 * Read data from the connected device
 * @param device The connected Bluetooth device
 * @returns A promise resolving to the device data
 */
export const readDeviceData = async (device: any) => {
  try {
    console.log('Reading data from device:', device.name);
    
    // This is a mock implementation
    // In a real implementation, you would:
    // 1. Connect to the device's GATT server
    // 2. Get the appropriate service
    // 3. Get characteristics
    // 4. Read values from characteristics
    
    // For now, return mock data with realistic values
    const mockData = {
      weight: parseFloat((70 + Math.random() * 15).toFixed(1)), // Random weight between 70-85kg
      height: Math.round(165 + Math.random() * 25), // Random height between 165-190cm
      bodyFat: parseFloat((18 + Math.random() * 12).toFixed(1)), // Random body fat % between 18-30%
      muscleMass: parseFloat((45 + Math.random() * 15).toFixed(1)), // Random muscle mass between 45-60kg
      waterPercentage: parseFloat((50 + Math.random() * 15).toFixed(1)), // Random water % between 50-65%
      boneMass: parseFloat((3 + Math.random() * 1.5).toFixed(1)), // Random bone mass between 3-4.5kg
      metabolicAge: Math.floor(25 + Math.random() * 20), // Random metabolic age between 25-45 years
      timestamp: new Date().toISOString()
    };
    
    console.log('Mock data generated:', mockData);
    return mockData;
  } catch (error) {
    console.error('Error reading device data:', error);
    throw error;
  }
};

/**
 * Disconnect from a Bluetooth device
 * @param device The connected Bluetooth device
 */
export const disconnectDevice = async (device: any) => {
  try {
    if (device && device.gatt && device.gatt.connected) {
      device.gatt.disconnect();
      console.log('Disconnected from device:', device.name);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error disconnecting device:', error);
    throw error;
  }
};

/**
 * Get device information like battery level, firmware version etc.
 * @param device The connected Bluetooth device
 * @returns Device information object
 */
export const getDeviceInfo = async (device: any) => {
  try {
    // Mock implementation
    return {
      manufacturer: device.name?.includes('Mi') ? 'Xiaomi' : 
                   device.name?.includes('Fitbit') ? 'Fitbit' : 
                   device.name?.includes('Withings') ? 'Withings' : 'Unknown',
      model: device.name || 'Unknown',
      firmwareVersion: '1.' + Math.floor(Math.random() * 10) + '.' + Math.floor(Math.random() * 10),
      batteryLevel: Math.floor(40 + Math.random() * 60), // Random battery level between 40-100%
      lastSync: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error getting device info:', error);
    throw error;
  }
};
