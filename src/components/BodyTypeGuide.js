import React from 'react';
import './styles/components.css';

const BodyTypeGuide = ({ bodyType }) => {
  const bodyTypeInfo = {
    'Hourglass': {
      description: 'Your bust and hips are well-balanced with a defined waist',
      dos: [
        'Emphasize your waist with belts and fitted styles',
        'Choose wrap dresses and peplum tops',
        'Try high-waisted bottoms to accentuate your shape'
      ],
      donts: [
        'Avoid shapeless or boxy clothing',
        'Steer clear of straight-cut dresses',
        'Skip tops that add bulk to your midsection'
      ]
    },
    'Pear': {
      description: 'Your hips are wider than your bust with a defined waist',
      dos: [
        'Draw attention upward with statement necklines',
        'Wear A-line skirts and dresses',
        'Choose darker colors on bottom, lighter on top'
      ],
      donts: [
        'Avoid skinny pants without balance up top',
        'Skip overly embellished bottoms',
        'Don\'t wear tight bottoms with clingy fabrics'
      ]
    },
    'Rectangle': {
      description: 'Your bust, waist, and hips are similar in measurement',
      dos: [
        'Create curves with ruffles and peplums',
        'Try layered looks to add dimension',
        'Use belts to define your waist'
      ],
      donts: [
        'Avoid shapeless, straight-cut clothing',
        'Skip boxy styles that hide your shape',
        'Don\'t wear outfits without any definition'
      ]
    },
    'Inverted Triangle': {
      description: 'Your bust is wider than your hips with less-defined waist',
      dos: [
        'Balance your silhouette with wider leg pants',
        'Choose V-neck tops to elongate',
        'Wear darker colors on top, lighter on bottom'
      ],
      donts: [
        'Avoid shoulder pads or wide necklines',
        'Skip tight tops with skinny bottoms',
        'Don\'t wear overly embellished tops'
      ]
    }
  };

  const currentInfo = bodyTypeInfo[bodyType] || bodyTypeInfo.Hourglass;

  return (
    <div className="body-type-guide">
      <h2>{bodyType} Body Type Guide</h2>
      <p className="description">{currentInfo.description}</p>
      
      <div className="advice-container">
        <div className="dos">
          <h3>Do's</h3>
          <ul>
            {currentInfo.dos.map((item, index) => (
              <li key={`do-${index}`}>{item}</li>
            ))}
          </ul>
        </div>
        
        <div className="donts">
          <h3>Don'ts</h3>
          <ul>
            {currentInfo.donts.map((item, index) => (
              <li key={`dont-${index}`}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="visual-guide">
        <h3>Flattering Silhouettes</h3>
        <div className="silhouettes">
          {bodyType === 'Hourglass' && (
            <>
              <div className="silhouette">Wrap Dresses</div>
              <div className="silhouette">Belted Coats</div>
              <div className="silhouette">Fit-and-Flare</div>
            </>
          )}
          {bodyType === 'Pear' && (
            <>
              <div className="silhouette">A-Line Skirts</div>
              <div className="silhouette">Structured Jackets</div>
              <div className="silhouette">Empire Waist</div>
            </>
          )}
          {bodyType === 'Rectangle' && (
            <>
              <div className="silhouette">Peplum Tops</div>
              <div className="silhouette">Layered Looks</div>
              <div className="silhouette">Ruffled Dresses</div>
            </>
          )}
          {bodyType === 'Inverted Triangle' && (
            <>
              <div className="silhouette">V-Neck Tops</div>
              <div className="silhouette">Flared Pants</div>
              <div className="silhouette">A-Line Dresses</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BodyTypeGuide;