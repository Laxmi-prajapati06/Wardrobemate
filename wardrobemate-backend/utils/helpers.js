const determineBodyType = (measurements) => {
  const { bust, waist, hips } = measurements;
  
  if (!bust || !waist || !hips) return 'Unknown';

  const waistToHip = waist / hips;
  const bustToHip = bust / hips;

  if (waistToHip < 0.75 && bustToHip >= 0.9) return 'Hourglass';
  if (waistToHip >= 0.75 && bustToHip <= 0.9) return 'Rectangle';
  if (waistToHip >= 0.75 && bustToHip > 0.9) return 'Inverted Triangle';
  if (waistToHip < 0.75 && bustToHip <= 0.9) return 'Pear';
  
  return 'Unknown';
};

const getUndertone = (skinTone) => {
  if (skinTone.includes('Cool')) return 'Cool';
  if (skinTone.includes('Warm')) return 'Warm';
  return 'Neutral';
};

module.exports = { determineBodyType, getUndertone };