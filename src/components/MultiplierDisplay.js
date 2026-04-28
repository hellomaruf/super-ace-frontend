import React from 'react';
import { motion } from 'framer-motion';
import '../styles/MultiplierDisplay.css';

const MultiplierDisplay = ({ multiplier }) => {
  const getMultiplierColor = (m) => {
    switch (m) {
      case 1: return '#888888';
      case 2: return '#4ecdc4';
      case 3: return '#45b7d1';
      case 4: return '#ff6b6b';
      case 5: return '#ffd700';
      default: return '#ffd700';
    }
  };

  const getMultiplierGlow = (m) => {
    switch (m) {
      case 1: return '0 0 10px rgba(136, 136, 136, 0.5)';
      case 2: return '0 0 20px rgba(78, 205, 196, 0.6)';
      case 3: return '0 0 30px rgba(69, 183, 209, 0.7)';
      case 4: return '0 0 40px rgba(255, 107, 107, 0.8)';
      case 5: return '0 0 50px rgba(255, 215, 0, 0.9)';
      default: return '0 0 60px rgba(255, 215, 0, 1)';
    }
  };

  return (
    <div className="multiplier-display">
      <div className="multiplier-label">MULTIPLIER</div>
      <div className="multiplier-container">
        {[1, 2, 3, 4, 5].map((m) => (
          <motion.div
            key={m}
            className={`multiplier-step ${m === multiplier ? 'active' : ''} ${m < multiplier ? 'completed' : ''}`}
            animate={m === multiplier ? {
              scale: [1, 1.1, 1],
              boxShadow: [
                getMultiplierGlow(m),
                `${getMultiplierGlow(m)}, 0 0 60px ${getMultiplierColor(m)}`,
                getMultiplierGlow(m),
              ],
            } : {}}
            transition={{
              duration: 0.5,
              repeat: m === multiplier ? Infinity : 0,
              repeatDelay: 0.5,
            }}
            style={{
              backgroundColor: m <= multiplier ? getMultiplierColor(m) : 'transparent',
              borderColor: getMultiplierColor(m),
              boxShadow: m === multiplier ? getMultiplierGlow(m) : 'none',
            }}
          >
            <span className="step-number">{m}x</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MultiplierDisplay;
