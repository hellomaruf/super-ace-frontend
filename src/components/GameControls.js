import React from 'react';
import { motion } from 'framer-motion';
import '../styles/GameControls.css';

const GameControls = ({ betAmount, onBetChange, onSpin, isSpinning, freeSpins, balance }) => {
  const betOptions = [1, 5, 10, 25, 50, 100, 250, 500, 1000];
  
  const canSpin = !isSpinning && (balance >= betAmount || freeSpins > 0);

  return (
    <div className="game-controls">
      {/* Bet Controls */}
      <div className="bet-section">
        <div className="bet-label">BET AMOUNT</div>
        <div className="bet-amount-display">
          <span className="bet-currency">$</span>
          <span className="bet-value">{betAmount}</span>
        </div>
        <div className="bet-options">
          {betOptions.map((amount) => (
            <motion.button
              key={amount}
              className={`bet-option ${betAmount === amount ? 'active' : ''}`}
              onClick={() => onBetChange(amount)}
              disabled={isSpinning}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ${amount}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Spin Button */}
      <motion.button
        className={`spin-button ${!canSpin ? 'disabled' : ''} ${freeSpins > 0 ? 'free-spin' : ''}`}
        onClick={onSpin}
        disabled={!canSpin}
        whileHover={canSpin ? { scale: 1.05 } : {}}
        whileTap={canSpin ? { scale: 0.95 } : {}}
        animate={canSpin && !isSpinning ? {
          boxShadow: [
            '0 0 20px rgba(233, 69, 96, 0.5)',
            '0 0 40px rgba(233, 69, 96, 0.8)',
            '0 0 20px rgba(233, 69, 96, 0.5)',
          ],
        } : {}}
        transition={{
          duration: 1,
          repeat: Infinity,
        }}
      >
        <div className="spin-button-inner">
          {isSpinning ? (
            <span className="spin-text">SPINNING...</span>
          ) : freeSpins > 0 ? (
            <>
              <span className="spin-text">FREE SPIN</span>
              <span className="spin-subtext">{freeSpins} remaining</span>
            </>
          ) : (
            <span className="spin-text">SPIN</span>
          )}
        </div>
        {isSpinning && (
          <motion.div
            className="spin-loader"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            ↻
          </motion.div>
        )}
      </motion.button>

      {/* Quick Actions */}
      <div className="quick-actions">
        <motion.button
          className="quick-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isSpinning}
          onClick={() => onBetChange(Math.min(betAmount * 2, 1000))}
        >
          2x Bet
        </motion.button>
        <motion.button
          className="quick-btn max"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isSpinning}
          onClick={() => onBetChange(Math.min(1000, Math.floor(balance)))}
        >
          MAX BET
        </motion.button>
      </div>
    </div>
  );
};

export default GameControls;
