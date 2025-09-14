import express from 'express';
import routeController from '../controllers/routeController.js';
import busController from '../controllers/busController.js';

const router = express.Router();

// Get all routes
router.get('/', routeController.getAllRoutes);

// Get specific route by ID
router.get('/:routeId', routeController.getRouteById);

// Get buses for a specific route
router.get('/:routeId/buses', busController.getBusesByRoute);

export default router;
