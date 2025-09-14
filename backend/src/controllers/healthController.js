const healthController = {
    // Health check endpoint
    getHealth: (req, res) => {
      res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        service: 'TransTrack API'
      });
    }
  };
  
  export default healthController;
  