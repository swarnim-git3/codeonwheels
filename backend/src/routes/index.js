import express from 'express';
import healthController from '../controllers/healthController.js';
import busController from '../controllers/busController.js';
import busRoutes from './busRoutes.js';
import routeRoutes from './routeRoutes.js';

const router = express.Router();

// Health check endpoint
router.get('/health', healthController.getHealth);

// Bus-related routes
router.use('/buses', busRoutes);

// Route-related routes
router.use('/routes', routeRoutes);

// ETA endpoint (alternative path for convenience)
router.get('/eta/:busId/:stopId', busController.getETA);

export default router;
