import { Route} from '../models/Route.js';
import { Bus } from '../models/Bus.js';

// Initialize sample data
async function initializeSampleData() {
  try {
    const routeCount = await Route.countDocuments();
    if (routeCount === 0) {
      console.log('🔄 Initializing sample data...');
      
      // Sample routes
      const sampleRoutes = [
        {
          routeId: 'R001',
          routeName: 'City Center to University',
          stops: [
            { stopId: 'S001', stopName: 'City Center', coordinates: [75.8577, 22.7196], order: 1 },
            { stopId: 'S002', stopName: 'Main Market', coordinates: [75.8590, 22.7180], order: 2 },
            { stopId: 'S003', stopName: 'Hospital Junction', coordinates: [75.8610, 22.7160], order: 3 },
            { stopId: 'S004', stopName: 'University Gate', coordinates: [75.8630, 22.7140], order: 4 }
          ],
          frequency: 12,
          operatingHours: { start: '06:00', end: '22:00' }
        },
        {
          routeId: 'R002',
          routeName: 'Airport Express',
          stops: [
            { stopId: 'S005', stopName: 'Railway Station', coordinates: [75.8500, 22.7200], order: 1 },
            { stopId: 'S006', stopName: 'Business District', coordinates: [75.8520, 22.7250], order: 2 },
            { stopId: 'S007', stopName: 'Airport Terminal', coordinates: [75.8600, 22.7350], order: 3 }
          ],
          frequency: 20,
          operatingHours: { start: '05:00', end: '23:00' }
        }
      ];

      await Route.insertMany(sampleRoutes);

      // Sample buses
      const sampleBuses = [
        {
          busId: 'BUS001',
          routeId: 'R001',
          currentLocation: { latitude: 22.7196, longitude: 75.8577 },
          capacity: 45,
          currentPassengers: 12
        },
        {
          busId: 'BUS002', 
          routeId: 'R001',
          currentLocation: { latitude: 22.7160, longitude: 75.8610 },
          capacity: 45,
          currentPassengers: 23
        },
        {
          busId: 'BUS003',
          routeId: 'R002',
          currentLocation: { latitude: 22.7200, longitude: 75.8500 },
          capacity: 50,
          currentPassengers: 8
        }
      ];

      await Bus.insertMany(sampleBuses);
      console.log('✅ Sample data initialized successfully');
    }
  } catch (error) {
    console.error('❌ Error initializing sample data:', error);
  }
}

export default initializeSampleData;
