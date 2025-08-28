const { query } = require('../config/db');

const saveMeasurements = async (req, res, next) => {
  try {
    const { bust, waist, hips, height } = req.body;
    const userId = req.user.id;
    
    // Determine body type (simplified logic)
    let bodyType = 'Unknown';
    if (bust && waist && hips) {
      const waistToHip = waist / hips;
      const bustToHip = bust / hips;
      
      if (waistToHip < 0.75 && bustToHip >= 0.9) bodyType = 'Hourglass';
      else if (waistToHip >= 0.75 && bustToHip <= 0.9) bodyType = 'Rectangle';
      else if (waistToHip >= 0.75 && bustToHip > 0.9) bodyType = 'Inverted Triangle';
      else if (waistToHip < 0.75 && bustToHip <= 0.9) bodyType = 'Pear';
    }
    
    // Save measurements
    const result = await query(
      `INSERT INTO user_measurements 
       (user_id, bust, waist, hips, height, body_type) 
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (user_id) 
       DO UPDATE SET bust = $2, waist = $3, hips = $4, height = $5, body_type = $6, updated_at = NOW()
       RETURNING *`,
      [userId, bust, waist, hips, height, bodyType]
    );
    
    res.json({
      measurements: result.rows[0],
      bodyType
    });
  } catch (error) {
    next(error);
  }
};

const saveSkinAnalysis = async (req, res, next) => {
  try {
    const { photoUrl, skinTone, undertone } = req.body;
    const userId = req.user.id;
    
    const result = await query(
      `INSERT INTO user_skin_analysis (user_id, photo_url, skin_tone, undertone)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [userId, photoUrl, skinTone, undertone]
    );
    
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const saveOccasion = async (req, res, next) => {
  try {
    const { occasionId } = req.body;
    const userId = req.user.id;
    
    const result = await query(
      `INSERT INTO user_occasions (user_id, occasion_id)
       VALUES ($1, $2)
       RETURNING *`,
      [userId, occasionId]
    );
    
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  saveMeasurements,
  saveSkinAnalysis,
  saveOccasion
};