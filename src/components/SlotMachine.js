import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CardSymbol from './CardSymbol';
import '../styles/SlotMachine.css';

const SlotMachine = ({ reels, originalReels, isSpinning, winningLines, showWinAnimation }) => {
  // If no reels yet, show placeholder
  if (reels.length === 0) {
    reels = [
      ['ace', 'king', 'queen'],
      ['jack', 'ten', 'nine'],
      ['ace', 'king', 'queen'],
      ['jack', 'ten', 'nine'],
      ['ace', 'king', 'queen'],
    ];
  }

  // Check if a position is part of a winning line
  const isWinningPosition = (col, row) => {
    if (!winningLines || winningLines.length === 0) return false;
    
    return winningLines.some(line => {
      return line.positions && line.positions[col] === row;
    });
  };

  // Get the winning line color for a position
  const getWinningLineColor = (col, row) => {
    if (!winningLines) return null;
    
    const lineIndex = winningLines.findIndex(line => {
      return line.positions && line.positions[col] === row;
    });
    
    if (lineIndex === -1) return null;
    
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#800080'];
    return colors[lineIndex % colors.length];
  };

  return (
    <div className="slot-machine">
      {/* Machine Frame */}
      <div className="machine-frame">
        {/* Top decoration */}
        <div className="machine-top">
          <div className="machine-title">SUPER ACE</div>
          <div className="machine-decoration">
            <span className="star">★</span>
            <span className="diamond">◆</span>
            <span className="star">★</span>
          </div>
        </div>

        {/* Reels container */}
        <div className="reels-container">
          {/* Background pattern */}
          <div className="reels-bg"></div>
          
          {/* Reels */}
          <div className="reels">
            {reels.map((reel, colIndex) => (
              <div key={colIndex} className="reel">
                {/* Reel border */}
                <div className="reel-border"></div>
                
                {/* Cards in reel */}
                <AnimatePresence mode="wait">
                  <motion.div
                    className="reel-cards"
                    initial={isSpinning ? { y: -300, opacity: 0 } : false}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 300, opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 50,
                      damping: 15,
                      delay: colIndex * 0.1,
                    }}
                  >
                    {reel.map((symbol, rowIndex) => (
                      <div
                        key={`${colIndex}-${rowIndex}`}
                        className={`card-slot ${
                          isWinningPosition(colIndex, rowIndex) && showWinAnimation 
                            ? 'winning-position' 
                            : ''
                        }`}
                        style={{
                          '--win-color': getWinningLineColor(colIndex, rowIndex),
                        }}
                      >
                        <CardSymbol 
                          symbol={symbol}
                          isSpinning={isSpinning}
                          isWinning={isWinningPosition(colIndex, rowIndex) && showWinAnimation}
                          delay={colIndex * 0.1 + rowIndex * 0.05}
                        />
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>

                {/* Reel shine effect */}
                <div className="reel-shine"></div>
              </div>
            ))}
          </div>

          {/* Win lines overlay */}
          {showWinAnimation && winningLines.length > 0 && (
            <svg className="win-lines-overlay" viewBox="0 0 100 60" preserveAspectRatio="none">
              {winningLines.map((line, index) => (
                <motion.path
                  key={index}
                  d={generateLinePath(line.positions)}
                  stroke={['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'][index % 5]}
                  strokeWidth="0.5"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                />
              ))}
            </svg>
          )}
        </div>

        {/* Bottom decoration */}
        <div className="machine-bottom">
          <div className="machine-lights">
            <span className="light"></span>
            <span className="light"></span>
            <span className="light"></span>
            <span className="light"></span>
            <span className="light"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Generate SVG path for a win line
const generateLinePath = (positions) => {
  if (!positions || positions.length !== 5) return '';
  
  const cellWidth = 20;
  const cellHeight = 20;
  const startX = 10;
  const startY = 10;
  
  let path = `M ${startX} ${startY + positions[0] * cellHeight + cellHeight / 2}`;
  
  for (let i = 1; i < positions.length; i++) {
    const x = startX + i * cellWidth;
    const y = startY + positions[i] * cellHeight + cellHeight / 2;
    path += ` L ${x} ${y}`;
  }
  
  return path;
};

export default SlotMachine;
