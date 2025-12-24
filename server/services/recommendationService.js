const { query } = require('../config/database');
const Outfit = require('../models/Outfit');

async function generateRecommendations(userId, occasion) {
  try {
    // 1. Get user's preferences
    const userPrefs = await getUserPreferences(userId);
    
    let outfits = [];

    // 2. Fetch Outfits from Database
    if (userPrefs && userPrefs.bodyType) {
      // If user has a body type, get personalized recommendations
      outfits = await Outfit.findByOccasionAndBodyType(occasion, userPrefs.bodyType);
    } else {
      // Fallback: If no body type is set, just get all outfits for this occasion
      // This PREVENTS the "undefined" crash you were seeing
      outfits = await Outfit.findByOccasion(occasion);
    }

    // 3. Filter/Score by Skin Tone (if available)
    if (userPrefs && userPrefs.skinTone) {
      outfits = scoreAndSortBySkinTone(outfits, userPrefs.skinTone);
    }
    
    // 4. Format the output (Ensure stylingTips exists)
    return outfits.map(outfit => ({
      ...outfit,
      stylingTips: outfit.styling_tips || [] // Handle case where DB column might be null
    }));

  } catch (error) {
    console.error('Error generating recommendations:', error);
    throw error;
  }
}

// Helper: Sort outfits so the best colors appear first
function scoreAndSortBySkinTone(outfits, skinTone) {
  const compatibilityMap = {
    cool: ['#4361ee', '#3a0ca3', '#7209b7', '#4cc9f0', '#0d9488', '#000000', '#ec4899', '#f72585'],
    warm: ['#f59e0b', '#d97706', '#f97316', '#fbbf24', '#dc2626', '#ef4444', '#7c3aed'],
    neutral: ['#6b7280', '#4b5563', '#374151', '#059669', '#047857', '#000000']
  };

  const bestColors = compatibilityMap[skinTone] || [];

  return outfits.map(outfit => {
    // Check if outfit colors overlap with best colors
    const hasMatch = outfit.colors && outfit.colors.some(c => bestColors.includes(c));
    return { ...outfit, colorScore: hasMatch ? 10 : 0 };
  }).sort((a, b) => b.colorScore - a.colorScore);
}

async function getUserPreferences(userId) {
  const result = await query(
    `SELECT 
      b.body_type as "bodyType", 
      s.skin_tone as "skinTone"
    FROM users u
    LEFT JOIN body_measurements b ON u.id = b.user_id
    LEFT JOIN skin_tones s ON u.id = s.user_id
    WHERE u.id = $1
    ORDER BY b.created_at DESC, s.created_at DESC
    LIMIT 1`,
    [userId]
  );
  
  // Return empty object if no user found to prevent destructuring errors
  return result.rows[0] || {};
}

module.exports = {
  generateRecommendations
};