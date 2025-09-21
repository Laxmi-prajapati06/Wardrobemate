const { query } = require('../config/database');
const Outfit = require('../models/Outfit');

const OUTFIT_RECOMMENDATIONS = {
  hourglass: {
    casual: [1, 5, 9], // Outfit IDs from database
    business: [2, 6, 10],
    // ... other occasions
  },
  // ... other body types
};

const COLOR_RECOMMENDATIONS = {
  cool: ['navy', 'emerald', 'plum', 'pink', 'gray'],
  warm: ['olive', 'mustard', 'terracotta', 'gold', 'brown'],
  neutral: ['black', 'white', 'denim', 'soft pink', 'taupe']
};

async function generateRecommendations(userId, occasion) {
  // Get user's preferences
  const userPrefs = await getUserPreferences(userId);
  
  // Get base recommendations based on body type and occasion
  const baseOutfits = OUTFIT_RECOMMENDATIONS[userPrefs.bodyType][occasion] || [];
  
  // Filter by color preferences
  const colorPrefs = COLOR_RECOMMENDATIONS[userPrefs.skinTone];
  const filteredOutfits = await Outfit.findByColorsAndIds(baseOutfits, colorPrefs);
  
  // Add styling tips
  return filteredOutfits.map(outfit => ({
    ...outfit,
    stylingTips: generateStylingTips(outfit, userPrefs)
  }));
}

function generateStylingTips(outfit, userPrefs) {
  const tips = [];
  
  // Body type specific tips
  if (userPrefs.bodyType === 'hourglass') {
    tips.push('This outfit accentuates your waist for a balanced silhouette.');
  }
  // ... other body type tips
  
  // Color tips
  tips.push(`The ${outfit.mainColor} complements your ${userPrefs.skinTone} skin tone.`);
  
  return tips;
}

async function getUserPreferences(userId) {
  const result = await query(
    `SELECT 
      b.body_type, 
      s.skin_tone
    FROM users u
    LEFT JOIN body_measurements b ON u.id = b.user_id
    LEFT JOIN skin_tones s ON u.id = s.user_id
    WHERE u.id = $1
    ORDER BY b.created_at DESC, s.created_at DESC
    LIMIT 1`,
    [userId]
  );
  
  return result.rows[0];
}

module.exports = {
  generateRecommendations
};