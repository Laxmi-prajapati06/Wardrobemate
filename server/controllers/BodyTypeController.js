const BodyMeasurement = require('../models/BodyMeasurement');

class BodyTypeController {
  static async analyze(req, res, next) {
    try {
      const { shoulder, bust, waist, hips, height, weight } = req.body;
      const userId = req.user.id;
      
      // Calculate body type based on measurements
      const bodyType = calculateBodyType(shoulder, bust, waist, hips);
      
      // Save to database
      const measurement = await BodyMeasurement.create({
        userId,
        shoulder,
        bust,
        waist,
        hips,
        height,
        weight,
        bodyType
      });

      res.json(measurement);
    } catch (error) {
      next(error);
    }
  }
}

// Helper function to determine body type
function calculateBodyType(shoulder, bust, waist, hips) {
  // Implementation of body type calculation logic
  // This is a simplified version - you would need a more sophisticated algorithm
  
  const waistHipRatio = waist / hips;
  const shoulderHipRatio = shoulder / hips;
  
  if (Math.abs(bust - hips) < 2 && waist < (bust * 0.75)) {
    return 'hourglass';
  } else if (shoulder > hips) {
    return 'inverted_triangle';
  } else if (hips > shoulder) {
    return 'pear';
  } else if (Math.abs(bust - hips - shoulder) < 2) {
    return 'rectangle';
  } else {
    return 'apple';
  }
}

module.exports = BodyTypeController;