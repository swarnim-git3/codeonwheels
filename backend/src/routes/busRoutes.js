import express from 'express';
import busController from '../controllers/busController.js';

const router = express.Router();

// Get all active buses
router.get('/', busController.getAllBuses);

// Get specific bus by ID
router.get('/:busId', busController.getBusById);

// Get ETA for bus to reach specific stop
router.get('/eta/:busId/:stopId', busController.getETA);

// Update bus location (used by GPS simulation)
// Note: This will need io instance passed from app.js
router.post('/:busId/location', (req, res) => {
  busController.updateBusLocation(req, res, req.app.get('io'));
});

export default router;
