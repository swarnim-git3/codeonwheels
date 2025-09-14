const socketHandlers = (io) => {
    io.on('connection', (socket) => {
      console.log(`✅ Client connected: ${socket.id}`);
  
      // Client subscribes to track specific bus
      socket.on('trackBus', (busId) => {
        socket.join(`bus_${busId}`);
        console.log(`📍 Client ${socket.id} tracking bus ${busId}`);
      });
  
      // Client subscribes to track specific route
      socket.on('trackRoute', (routeId) => {
        socket.join(`route_${routeId}`);
        console.log(`🚌 Client ${socket.id} tracking route ${routeId}`);
      });
  
      // Get ETA for specific stop
      socket.on('getETA', async (data) => {
        const { busId, stopId } = data;
        try {
          const response = await fetch(`http://localhost:${process.env.PORT}/api/eta/${busId}/${stopId}`);
          const etaData = await response.json();
          socket.emit('etaUpdate', etaData);
        } catch (error) {
          socket.emit('etaError', { error: error.message });
        }
      });
  
      socket.on('disconnect', () => {
        console.log(`❌ Client disconnected: ${socket.id}`);
      });
    });
  };
  
  export default socketHandlers;
  