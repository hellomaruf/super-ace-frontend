import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/FreeSpinsDisplay.css';

const FreeSpinsDisplay = ({ freeSpins, freeSpinsAwarded }) => {
  return (
    <div className="free-spins-section">
      {/* Current Free Spins */}
      <motion.div 
        className={`free-spins-display ${freeSpins > 0 ? 'has-spins' : ''}`}
        animate={freeSpins > 0 ? {
          boxShadow: [
            '0 0 20px rgba(255, 215, 0, 0.5)',
            '0 0 40px rgba(255, 215, 0, 0.8)',
            '0 0 20px rgba(255, 215, 0, 0.5)',
          ],
        } : {}}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
      >
        <div className="free-spins-icon">★</div>
        <div className="free-spins-content">
          <span className="free-spins-label">FREE SPINS</span>
          <span className="free-spins-count">{freeSpins}</span>
        </div>
      </motion.div>

      {/* Free Spins Awarded Animation */}
      <AnimatePresence>
        {freeSpinsAwarded > 0 && (
          <motion.div
            className="free-spins-awarded"
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <div className="awarded-glow"></div>
            <div className="awarded-content">
              <span className="awarded-text">+{freeSpinsAwarded}</span>
              <span className="awarded-label">FREE SPINS AWARDED!</span>
            </div>
            <motion.div
              className="sparkle-ring"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              {[...Array(8)].map((_, i) => (
                <span key={i} className="ring-sparkle" style={{ transform: `rotate(${i * 45}deg)` }}>
                  ✦
                </span>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FreeSpinsDisplay;
