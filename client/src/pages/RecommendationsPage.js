import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  getUserPreferences,
  getOutfitRecommendations,
  saveRecommendation 
} from '../services/recommendationService';
import OccasionSelector from '../components/OccasionSelector';
import OutfitList from '../components/OutfitList';

const RecommendationsPage = () => {
  const { currentUser } = useAuth();
  const [preferences, setPreferences] = useState(null);
  const [occasion, setOccasion] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchPreferences = async () => {
      if (currentUser) {
        try {
          const prefs = await getUserPreferences(currentUser.id);
          setPreferences(prefs);
        } catch (err) {
          console.error('Error fetching preferences:', err);
          setError('Failed to load user preferences');
          setPreferences({
            bodyType: null,
            skinTone: null,
            hasBodyData: false,
            hasSkinData: false
          });
        }
      }
    };

    fetchPreferences();
  }, [currentUser]);

  const handleOccasionSelect = async (selectedOccasion) => {
    setOccasion(selectedOccasion);
    setIsLoading(true);
    setError(null);
    
    try {
      const recs = await getOutfitRecommendations(currentUser.id, selectedOccasion);
      setRecommendations(recs);
      
      // Show how many recommendations we found
      setStats({
        total: recs.length,
        personalized: recs.filter(r => r.colorScore > 0).length
      });
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setError('Failed to load recommendations. Showing curated suggestions instead.');
      // Even on error, we'll show mock recommendations
      const mockRecs = await getOutfitRecommendations(currentUser.id, selectedOccasion);
      setRecommendations(mockRecs);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveRecommendation = async (outfitId) => {
    try {
      await saveRecommendation(currentUser.id, outfitId);
      setRecommendations(recommendations.map(rec => 
        rec.id === outfitId ? { ...rec, isSaved: true } : rec
      ));
    } catch (error) {
      console.error('Error saving recommendation:', error);
    }
  };

  if (!preferences) {
    return (
      <div className="container">
        <div className="text-center">
          <div className="loading-spinner mx-auto"></div>
          <p>Loading your preferences...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="recommendations-header">
        <h1>Outfit Recommendations</h1>
        
        {preferences.bodyType || preferences.skinTone ? (
          <div className="preferences-info">
            <p className="text-lg">
              {preferences.bodyType && (
                <span className="preference-tag">
                  <span className="material-icons">body</span>
                  {preferences.bodyType}
                </span>
              )}
              {preferences.skinTone && (
                <span className="preference-tag">
                  <span className="material-icons">palette</span>
                  {preferences.skinTone}
                </span>
              )}
            </p>
          </div>
        ) : (
          <p className="text-lg">
            Complete your body type and skin tone analysis for personalized recommendations
          </p>
        )}
      </div>
      
      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)} className="btn btn-outline ml-4">
            Dismiss
          </button>
        </div>
      )}

      {stats && recommendations.length > 0 && (
        <div className="recommendation-stats">
          <p>
            Found <strong>{stats.total}</strong> recommendations
            {stats.personalized > 0 && (
              <span> ({stats.personalized} personalized for you)</span>
            )}
          </p>
        </div>
      )}
      
      <OccasionSelector 
        selected={occasion}
        onSelect={handleOccasionSelect}
      />
      
      {isLoading ? (
        <div className="text-center">
          <div className="loading-spinner mx-auto"></div>
          <p>Finding the perfect outfits for you...</p>
        </div>
      ) : (
        <>
          {recommendations.length > 0 ? (
            <OutfitList 
              outfits={recommendations}
              onSave={handleSaveRecommendation}
            />
          ) : occasion ? (
            <div className="text-center">
              <p>No recommendations found for {occasion}. Try selecting a different occasion.</p>
            </div>
          ) : (
            <div className="text-center">
              <p>Select an occasion to see personalized outfit recommendations.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RecommendationsPage;