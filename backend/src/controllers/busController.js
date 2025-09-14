import  Bus from '../models/Bus.js';
import  Route from '../models/Route.js';

// Helper function to calculate distance between two points
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const busController = {
  // Get all active buses
  getAllBuses: async (req, res) => {
    try {
      const buses = await Bus.find({ isActive: true }).sort({ busId: 1 });
      res.json({ success: true, buses });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Get specific bus by ID
  getBusById: async (req, res) => {
    try {
      const bus = await Bus.findOne({ busId: req.params.busId });
      if (!bus) {
        return res.status(404).json({ success: false, error: 'Bus not found' });
      }
      res.json({ success: true, bus });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Get buses for a specific route
  getBusesByRoute: async (req, res) => {
    try {
      const buses = await Bus.find({
        routeId: req.params.routeId,
        isActive: true,
      });
      res.json({ success: true, buses });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Calculate ETA for bus to reach specific stop
  getETA: async (req, res) => {
    try {
      const { busId, stopId } = req.params;

      const bus = await Bus.findOne({ busId });
      if (!bus) {
        return res.status(404).json({ success: false, error: 'Bus not found' });
      }

      const route = await Route.findOne({ routeId: bus.routeId });
      if (!route) {
        return res.status(404).json({ success: false, error: 'Route not found' });
      }

      const targetStop = route.stops.find((stop) => stop.stopId === stopId);
      if (!targetStop) {
        return res.status(404).json({ success: false, error: 'Stop not found' });
      }

      // Simple ETA calculation (can be enhanced with traffic data)
      const distance = calculateDistance(
        bus.currentLocation.latitude,
        bus.currentLocation.longitude,
        targetStop.coordinates[1],
        targetStop.coordinates[0]
      );

      const avgSpeed = bus.speed > 0 ? bus.speed : 25; // km/h default
      const etaMinutes = Math.round((distance / avgSpeed) * 60);
      const confidence = etaMinutes <= 30 ? 0.9 : 0.7;

      res.json({
        success: true,
        eta: {
          busId,
          stopId,
          estimatedMinutes: etaMinutes,
          confidence,
          lastUpdated: new Date().toISOString(),
        },
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Update bus location (used by GPS simulation)
  updateBusLocation: async (req, res, io) => {
    try {
      const { latitude, longitude, speed, heading } = req.body;

      const bus = await Bus.findOneAndUpdate(
        { busId: req.params.busId },
        {
          currentLocation: { latitude, longitude, timestamp: new Date() },
          speed: speed || 0,
          heading: heading || 0,
        },
        { new: true }
      );

      if (!bus) {
        return res.status(404).json({ success: false, error: 'Bus not found' });
      }

      // Emit real-time update via WebSocket
      if (io) {
        io.emit('busLocationUpdate', {
          busId: bus.busId,
          location: bus.currentLocation,
          speed: bus.speed,
          heading: bus.heading,
        });
      }

      res.json({ success: true, bus });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },
};

export default busController;
