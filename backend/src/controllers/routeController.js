import Route from '../models/Route.js';

const routeController = {
  // Get all routes
  getAllRoutes: async (req, res) => {
    try {
      const routes = await Route.find({ isActive: true }).sort({ routeName: 1 });
      res.json({ success: true, routes });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Get specific route by ID
  getRouteById: async (req, res) => {
    try {
      const route = await Route.findOne({ routeId: req.params.routeId });
      if (!route) {
        return res.status(404).json({ success: false, error: 'Route not found' });
      }
      res.json({ success: true, route });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
};

export default routeController;
