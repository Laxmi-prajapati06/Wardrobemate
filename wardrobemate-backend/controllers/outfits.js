const { query } = require('../config/db');

const getBodyTypeRecommendations = async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    // Get user's body type
    const userData = await query(
      'SELECT body_type FROM user_measurements WHERE user_id = $1',
      [userId]
    );
    
    if (userData.rows.length === 0 || !userData.rows[0].body_type) {
      return res.status(400).json({ message: 'User body type not set' });
    }
    
    const bodyType = userData.rows[0].body_type;
    
    // Get outfits for body type
    const outfits = await query(
      'SELECT * FROM outfits WHERE $1 = ANY(body_type)',
      [bodyType]
    );
    
    res.json(outfits.rows);
  } catch (error) {
    next(error);
  }
};

const getColorRecommendations = async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    // Get user's skin tone/undertone
    const skinData = await query(
      'SELECT undertone FROM user_skin_analysis WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1',
      [userId]
    );
    
    if (skinData.rows.length === 0 || !skinData.rows[0].undertone) {
      return res.status(400).json({ message: 'User skin analysis not complete' });
    }
    
    const undertone = skinData.rows[0].undertone;
    
    // Get outfits with recommended colors
    const outfits = await query(
      'SELECT * FROM outfits WHERE $1 = ANY(recommended_colors)',
      [undertone]
    );
    
    res.json(outfits.rows);
  } catch (error) {
    next(error);
  }
};

const getOccasionRecommendations = async (req, res, next) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const userId = req.user.id;
    const { occasionId } = req.params;
    
    // Get outfits for occasion
    const outfits = await query(
      'SELECT * FROM outfits WHERE occasion_id = $1',
      [occasionId]
    );
    
    res.json(outfits.rows);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBodyTypeRecommendations,
  getColorRecommendations,
  getOccasionRecommendations
};