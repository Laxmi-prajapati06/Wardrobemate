const Outfit = require('../models/Outfit');
const { generateRecommendations } = require('../services/recommendationService');

class OutfitController {
  static async getRecommendations(req, res, next) {
    try {
      const { occasion } = req.query;
      const userId = req.user.id;
      
      const recommendations = await generateRecommendations(userId, occasion);
      
      res.json(recommendations);
    } catch (error) {
      console.error('Error getting recommendations:', error);
      next(error);
    }
  }

  static async saveRecommendation(req, res, next) {
    try {
      const { outfitId } = req.body;
      const userId = req.user.id;
      
      const saved = await Outfit.saveForUser(userId, outfitId);
      
      res.json(saved);
    } catch (error) {
      console.error('Error saving recommendation:', error);
      next(error);
    }
  }
}

module.exports = OutfitController;