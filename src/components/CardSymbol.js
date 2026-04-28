import React from 'react';
import { motion } from 'framer-motion';
import '../styles/CardSymbol.css';

// SVG Icons for card suits
const SuitIcons = {
  ace: (
    <svg viewBox="0 0 24 24" className="suit-icon spade">
      <path d="M12 2L4.5 9.5C4.5 9.5 3 11 3 12.5C3 14 4 15 5.5 15C7 15 8 14 8 14L12 20L16 14C16 14 17 15 18.5 15C20 15 21 14 21 12.5C21 11 19.5 9.5 19.5 9.5L12 2Z"/>
    </svg>
  ),
  king: (
    <svg viewBox="0 0 24 24" className="suit-icon heart">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  ),
  queen: (
    <svg viewBox="0 0 24 24" className="suit-icon diamond">
      <path d="M12 2L4 12L12 22L20 12L12 2Z"/>
    </svg>
  ),
  jack: (
    <svg viewBox="0 0 24 24" className="suit-icon club">
      <path d="M12 2C10.5 2 9.5 3 9.5 4.5C9.5 5.5 10 6.2 10.5 6.5C9.5 6.3 8.5 6 7.5 6C5.5 6 4 7.5 4 9.5C4 11.5 5.5 13 7.5 13C8.5 13 9.5 12.5 10 12C9.5 13 9 14 9 15C9 17 10.5 18.5 12.5 18.5V21.5H14.5V18.5C16.5 18.5 18 17 18 15C18 14 17.5 13 17 12C17.5 12.5 18.5 13 19.5 13C21.5 13 23 11.5 23 9.5C23 7.5 21.5 6 19.5 6C18.5 6 17.5 6.3 16.5 6.5C17 6.2 17.5 5.5 17.5 4.5C17.5 3 16.5 2 15 2C13.5 2 12.5 3 12 4C11.5 3 10.5 2 9 2H12Z"/>
    </svg>
  ),
  ten: (
    <svg viewBox="0 0 24 24" className="suit-icon spade-small">
      <path d="M12 3L6 9C6 9 5 10 5 11C5 12 6 13 7 13C8 13 9 12.5 9 12.5L12 16L15 12.5C15 12.5 16 13 17 13C18 13 19 12 19 11C19 10 18 9 18 9L12 3Z"/>
    </svg>
  ),
  nine: (
    <svg viewBox="0 0 24 24" className="suit-icon heart-small">
      <path d="M12 19l-1-1C7 15 5 13 5 11C5 9 6.5 7.5 8.5 7.5C9.5 7.5 10.5 8 11 8.5C11.5 8 12.5 7.5 13.5 7.5C15.5 7.5 17 9 17 11C17 13 15 15 12 18L12 19Z"/>
    </svg>
  ),
  joker: (
    <svg viewBox="0 0 24 24" className="suit-icon joker-icon">
      <text x="12" y="18" textAnchor="middle" fontSize="16" fontWeight="bold">🃏</text>
    </svg>
  ),
  scatter: (
    <svg viewBox="0 0 24 24" className="suit-icon scatter-icon">
      <text x="12" y="18" textAnchor="middle" fontSize="14" fontWeight="bold">★</text>
    </svg>
  ),
};

const CardSymbol = ({ symbol, isSpinning, isWinning, delay }) => {
  const getCardStyle = () => {
    const baseClass = 'card-symbol';
    
    switch (symbol) {
      case 'golden_ace':
      case 'golden_king':
        return `${baseClass} golden-card`;
      case 'joker':
        return `${baseClass} joker-card`;
      case 'scatter':
        return `${baseClass} scatter-card`;
      case 'ace':
        return `${baseClass} ace-card`;
      case 'king':
        return `${baseClass} king-card`;
      case 'queen':
        return `${baseClass} queen-card`;
      case 'jack':
        return `${baseClass} jack-card`;
      case 'ten':
        return `${baseClass} ten-card`;
      case 'nine':
        return `${baseClass} nine-card`;
      default:
        return baseClass;
    }
  };

  const getCardLabel = () => {
    switch (symbol) {
      case 'ace':
      case 'golden_ace':
        return 'A';
      case 'king':
      case 'golden_king':
        return 'K';
      case 'queen':
        return 'Q';
      case 'jack':
        return 'J';
      case 'ten':
        return '10';
      case 'nine':
        return '9';
      case 'joker':
        return 'JOKER';
      case 'scatter':
        return 'FREE';
      default:
        return symbol.toUpperCase();
    }
  };

  const isGolden = symbol === 'golden_ace' || symbol === 'golden_king';
  const isJoker = symbol === 'joker';
  const isScatter = symbol === 'scatter';

  return (
    <motion.div
      className={`${getCardStyle()} ${isWinning ? 'winning' : ''}`}
      initial={isSpinning ? { scale: 0.8, opacity: 0, rotateY: 180 } : false}
      animate={{ 
        scale: isWinning ? [1, 1.1, 1] : 1, 
        opacity: 1, 
        rotateY: 0,
      }}
      transition={{
        duration: 0.5,
        delay: delay || 0,
        scale: {
          repeat: isWinning ? Infinity : 0,
          duration: 0.5,
        }
      }}
    >
      {/* Card inner */}
      <div className="card-inner">
        {/* Card background */}
        <div className="card-bg"></div>
        
        {/* Golden glow effect */}
        {isGolden && (
          <div className="golden-glow">
            <div className="glow-pulse"></div>
          </div>
        )}
        
        {/* Joker glow effect */}
        {isJoker && (
          <div className="joker-glow">
            <div className="glow-rainbow"></div>
          </div>
        )}

        {/* Card content */}
        <div className="card-content">
          {/* Top corner */}
          <div className="card-corner top-left">
            <span className="corner-rank">{getCardLabel()}</span>
            {!isJoker && !isScatter && SuitIcons[symbol]}
          </div>

          {/* Center */}
          <div className="card-center">
            {isJoker ? (
              <div className="joker-center">
                <span className="joker-text">JOKER</span>
                <div className="joker-stars">✦ ✦ ✦</div>
              </div>
            ) : isScatter ? (
              <div className="scatter-center">
                <span className="scatter-text">SCATTER</span>
                <div className="scatter-star">★</div>
                <span className="scatter-label">FREE SPINS</span>
              </div>
            ) : isGolden ? (
              <div className="golden-center">
                <div className="golden-frame">
                  <span className="golden-rank">{getCardLabel()}</span>
                  <div className="golden-suit">{SuitIcons[symbol.replace('golden_', '')]}</div>
                </div>
              </div>
            ) : (
              <div className="regular-center">
                <span className="regular-rank">{getCardLabel()}</span>
                <div className="regular-suit">{SuitIcons[symbol]}</div>
              </div>
            )}
          </div>

          {/* Bottom corner */}
          <div className="card-corner bottom-right">
            {!isJoker && !isScatter && SuitIcons[symbol.replace('golden_', '')]}
            <span className="corner-rank">{getCardLabel()}</span>
          </div>
        </div>

        {/* Shine effect */}
        <div className="card-shine"></div>
        
        {/* Border glow for winning */}
        {isWinning && <div className="winning-glow"></div>}
      </div>
    </motion.div>
  );
};

export default CardSymbol;
