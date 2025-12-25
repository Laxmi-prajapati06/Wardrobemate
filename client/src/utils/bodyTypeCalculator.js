export const calculateBodyType = (measurements) => {
  const { bust, waist, hips } = measurements;
  const bustHipsDifference = Math.abs(bust - hips);
  const waistRatio = waist / bust;

  // Hourglass: Bust and hips nearly equal with significantly smaller waist
  if (bustHipsDifference <= 1 && waistRatio <= 0.75) {
    return 'hourglass';
  }
  
  // Pear: Hips significantly larger than bust
  if (hips > bust && hips - bust >= 2) {
    return 'pear';
  }
  
  // Apple: Waist is not significantly smaller than bust
  if (waistRatio > 0.75) {
    return 'apple';
  }
  
  // Inverted Triangle: Bust significantly larger than hips
  if (bust > hips && bust - hips >= 3) {
    return 'inverted_triangle';
  }
  
  // Rectangle: Similar measurements all over
  return 'rectangle';
};

export const bodyTypeDescriptions = {
  hourglass: {
    name: 'Hourglass',
    description: 'Your bust and hips are well balanced with a defined waist. This is considered the most balanced body type.',
    recommendations: [
      'Wrap dresses that accentuate your waist',
      'Fitted jackets and tops',
      'High-waisted bottoms',
      'Belted styles'
    ]
  },
  pear: {
    name: 'Pear',
    description: 'Your hips are wider than your bust with a well-defined waist.',
    recommendations: [
      'A-line skirts and dresses',
      'Dark-colored bottoms',
      'Tops with embellishments or patterns',
      'Structured jackets that hit at the hip'
    ]
  },
  apple: {
    name: 'Apple',
    description: 'Your waist is less defined with weight carried in the midsection.',
    recommendations: [
      'V-neck and scoop neck tops',
      'Empire waist dresses',
      'Structured jackets that create definition',
      'Dark colors on top with brighter bottoms'
    ]
  },
  inverted_triangle: {
    name: 'Inverted Triangle',
    description: 'Your bust is wider than your hips with shoulders that may be broad.',
    recommendations: [
      'V-neck tops to elongate the torso',
      'A-line skirts to balance proportions',
      'Dark colors on top with lighter bottoms',
      'Wide-leg pants'
    ]
  },
  rectangle: {
    name: 'Rectangle',
    description: 'Your bust, waist, and hips have similar measurements with little definition.',
    recommendations: [
      'Layered clothing to create dimension',
      'Belts to define the waist',
      'Ruffles and peplum tops',
      'Textured fabrics to add curves'
    ]
  }
};