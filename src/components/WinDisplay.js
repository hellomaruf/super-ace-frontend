import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/WinDisplay.css';

const WinDisplay = ({ winAmount, show, multiplier }) => {
  const formatWin = (amount) => {
    return amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <AnimatePresence>
      {show && winAmount > 0 && (
        <motion.div
          className="win-display"
          initial={{ scale: 0, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0, opacity: 0, y: -50 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
        >
          {/* Background glow */}
          <div className="win-glow"></div>
          
          {/* Main content */}
          <div className="win-content">
            <motion.div 
              className="win-label"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              BIG WIN!
            </motion.div>
            
            <motion.div 
              className="win-amount"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <span className="currency">$</span>
              <span className="amount">{formatWin(winAmount)}</span>
            </motion.div>

            {multiplier > 1 && (
              <motion.div 
                className="win-multiplier"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5, type: "spring" }}
              >
                <span className="multiplier-text">{multiplier}x</span>
                <span className="multiplier-label">MULTIPLIER</span>
              </motion.div>
            )}

            {/* Sparkle effects */}
            <div className="sparkles">
              {[...Array(6)].map((_, i) => (
                <motion.span
                  key={i}
                  className="sparkle"
                  initial={{ scale: 0, rotate: 0 }}
                  animate={{ 
                    scale: [0, 1, 0],
                    rotate: 360,
                    x: Math.cos(i * 60 * Math.PI / 180) * 100,
                    y: Math.sin(i * 60 * Math.PI / 180) * 100,
                  }}
                  transition={{
                    duration: 1,
                    delay: 0.5 + i * 0.1,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                >
                  ✦
                </motion.span>
              ))}
            </div>
          </div>

          {/* Confetti effect */}
          <div className="confetti-container">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  backgroundColor: ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'][Math.floor(Math.random() * 5)],
                }}
                initial={{ y: -20, opacity: 1, rotate: 0 }}
                animate={{ 
                  y: 200,
                  opacity: 0,
                  rotate: Math.random() * 360,
                }}
                transition={{
                  duration: 2,
                  delay: Math.random() * 0.5,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WinDisplay;
