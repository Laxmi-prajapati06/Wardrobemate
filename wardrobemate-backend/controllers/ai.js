const { query } = require('../config/db');
const OpenAI = require('openai');
const { getUndertone } = require('../utils/helpers');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const generateOutfitRecommendation = async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    // Get user data
    const [measurements, skinData, occasion] = await Promise.all([
      req.db.query('SELECT * FROM user_measurements WHERE user_id = $1', [userId]),
      req.db.query(
        'SELECT * FROM user_skin_analysis WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1',
        [userId]
      ),
      req.db.query(
        `SELECT o.name FROM user_occasions uo 
         JOIN occasions o ON uo.occasion_id = o.id 
         WHERE uo.user_id = $1 ORDER BY uo.selected_at DESC LIMIT 1`,
        [userId]
      )
    ]);

    // Build prompt
    const bodyType = measurements.rows[0]?.body_type || 'average';
    const undertone = getUndertone(skinData.rows[0]?.skin_tone || '');
    const occasionName = occasion.rows[0]?.name || 'casual event';
    
    const prompt = `Create a detailed outfit recommendation for:
- Body type: ${bodyType}
- Skin undertone: ${undertone}
- Occasion: ${occasionName}

Include these sections:
1) Top (specific item with materials/colors)
2) Bottom (pants/skirt with details)
3) Footwear (type and style)
4) Accessories (bags, jewelry)
5) Styling tips
Mention specific brands/styles where relevant.`;

    // Generate with OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { 
          role: "system", 
          content: "You are a professional fashion stylist. Provide detailed, specific outfit recommendations with clear sections." 
        },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 800
    });

    const recommendation = response.choices[0]?.message?.content;

    if (!recommendation) {
      throw new Error('Failed to generate recommendation');
    }

    // Save to database
    const savedRec = await req.db.query(
      `INSERT INTO ai_recommendations 
       (user_id, prompt, response) 
       VALUES ($1, $2, $3) 
       RETURNING *`,
      [userId, prompt, recommendation]
    );

    res.json({
      success: true,
      data: {
        id: savedRec.rows[0].id,
        recommendation,
        meta: { bodyType, undertone, occasion: occasionName }
      }
    });

  } catch (error) {
    next(error);
  }
};

const getPastRecommendations = async (req, res, next) => {
  try {
    const result = await req.db.query(
      `SELECT * FROM ai_recommendations 
       WHERE user_id = $1 
       ORDER BY generated_at DESC 
       LIMIT 20`,
      [req.user.id]
    );
    
    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    next(error);
  }
};

const saveOutfit = async (req, res, next) => {
  try {
    const { recommendationId } = req.params;
    
    // Verify recommendation exists
    const rec = await req.db.query(
      'SELECT * FROM ai_recommendations WHERE id = $1 AND user_id = $2',
      [recommendationId, req.user.id]
    );
    
    if (!rec.rows[0]) {
      return res.status(404).json({ success: false, message: 'Recommendation not found' });
    }

    // Save to outfits
    const savedOutfit = await req.db.query(
      `INSERT INTO user_saved_outfits (user_id, recommendation_id)
       VALUES ($1, $2)
       RETURNING *`,
      [req.user.id, recommendationId]
    );

    res.json({
      success: true,
      data: savedOutfit.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

const deleteRecommendation = async (req, res, next) => {
  try {
    const { recommendationId } = req.params;
    
    await req.db.query(
      'DELETE FROM ai_recommendations WHERE id = $1 AND user_id = $2',
      [recommendationId, req.user.id]
    );
    
    res.json({
      success: true,
      message: 'Recommendation deleted'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  generateOutfitRecommendation,
  getPastRecommendations,
  saveOutfit,
  deleteRecommendation
};