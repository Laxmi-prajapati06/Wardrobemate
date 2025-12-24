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

  static async getSavedRecommendations(req, res, next) {
    try {
      const userId = req.user.id;
      const savedOutfits = await Outfit.findSavedByUserId(userId);
      res.json(savedOutfits);
    } catch (error) {
      console.error('Error fetching saved recommendations:', error);
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

  // NEW METHOD: Handle removal
  static async removeSavedRecommendation(req, res, next) {
    try {
      const { outfitId } = req.params;
      const userId = req.user.id;
      
      await Outfit.removeForUser(userId, outfitId);
      
      res.json({ success: true, message: 'Outfit removed from saved items' });
    } catch (error) {
      console.error('Error removing saved recommendation:', error);
      next(error);
    }
  }
}

module.exports = OutfitController;