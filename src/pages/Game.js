import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import SlotMachine from '../components/SlotMachine';
import WinDisplay from '../components/WinDisplay';
import MultiplierDisplay from '../components/MultiplierDisplay';
import FreeSpinsDisplay from '../components/FreeSpinsDisplay';
import GameControls from '../components/GameControls';
import api from '../services/api';
import '../styles/Game.css';

const Game = () => {
  const { user, updateBalance, updateFreeSpins, resetGame } = useAuth();
  const [reels, setReels] = useState([]);
  const [transformedReels, setTransformedReels] = useState([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [betAmount, setBetAmount] = useState(10);
  const [lastWin, setLastWin] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [freeSpins, setFreeSpins] = useState(0);
  const [winningLines, setWinningLines] = useState([]);
  const [showWinAnimation, setShowWinAnimation] = useState(false);
  const [freeSpinsAwarded, setFreeSpinsAwarded] = useState(0);
  const [error, setError] = useState('');
  const [gameStats, setGameStats] = useState({
    totalSpins: 0,
    totalWins: 0,
    biggestWin: 0,
  });

  useEffect(() => {
    fetchGameInfo();
  }, []);

  const fetchGameInfo = async () => {
    try {
      const response = await api.get('/game/info');
      console.log('Game info loaded:', response.data);
    } catch (err) {
      console.log('Game info error:', err?.message || err);
    }
  };

  const handleSpin = async () => {
    if (isSpinning) return;
    
    setError('');
    setIsSpinning(true);
    setShowWinAnimation(false);
    setWinningLines([]);
    setLastWin(0);

    try {
      const useFreeSpin = freeSpins > 0;
      
      console.log('Sending spin request with bet:', betAmount);
      
      const response = await api.post('/game/spin', {
        bet_amount: betAmount,
        use_free_spin: useFreeSpin,
      });

      console.log('Spin response:', response.data);
      
      // Check if response has the expected structure
      if (!response.data || !response.data.data) {
        throw new Error('Invalid response from server');
      }
      
      const data = response.data.data;
      
      // Validate required fields
      if (!data.reels || !data.transformed_reels) {
        throw new Error('Invalid game data received');
      }
      
      // Start reel animation
      setReels(data.reels);
      
      // After animation, show transformed reels and results
      setTimeout(() => {
        try {
          setTransformedReels(data.transformed_reels);
          setMultiplier(data.multiplier || 1);
          setLastWin(data.win_amount || 0);
          setWinningLines(data.winning_lines || []);
          setFreeSpinsAwarded(data.free_spins_awarded || 0);
          setFreeSpins(data.current_free_spins || 0);
          
          // Update balance
          if (typeof data.balance === 'number') {
            updateBalance(data.balance);
          }
          
          updateFreeSpins(data.current_free_spins || 0);

          if (data.win_amount > 0) {
            setShowWinAnimation(true);
            setGameStats(prev => ({
              ...prev,
              totalWins: prev.totalWins + 1,
              biggestWin: Math.max(prev.biggestWin, data.win_amount),
            }));
          }

          setGameStats(prev => ({
            ...prev,
            totalSpins: prev.totalSpins + 1,
          }));
        } catch (innerErr) {
          console.error('Error in setTimeout:', innerErr);
          setError('Error processing game result');
        }

        setIsSpinning(false);
      }, 2000);

    } catch (err) {
      console.error('Spin error occurred');
      
      // Safe error handling
      let errorMessage = 'Spin failed';
      
      if (err) {
        if (err.response && err.response.data) {
          errorMessage = err.response.data.message || 'Server error';
        } else if (err.message) {
          errorMessage = err.message;
        }
      }
      
      console.log('Error message:', errorMessage);
      setError(errorMessage);
      setIsSpinning(false);
    }
  };

  const handleBetChange = (amount) => {
    if (!isSpinning) {
      setBetAmount(amount);
    }
  };

  const handleReset = () => {
    resetGame();
    setGameStats({
      totalSpins: 0,
      totalWins: 0,
      biggestWin: 0,
    });
    setLastWin(0);
    setFreeSpins(0);
    setMultiplier(1);
    setError('');
  };

  return (
    <div className="game-container">
      {/* Header */}
      <header className="game-header">
        <div className="logo-section">
          <h1 className="game-logo">SUPER ACE</h1>
          <span className="game-tagline">Card Slot Game</span>
        </div>
        
        <div className="user-section">
          <div className="balance-display">
            <span className="balance-label">BALANCE</span>
            <span className="balance-amount">
              ${user?.balance?.toFixed(2) || '0.00'}
            </span>
          </div>
          <button className="reset-btn" onClick={handleReset}>
            Reset
          </button>
        </div>
      </header>

      {/* Main Game Area */}
      <main className="game-main">
        {/* Multiplier Display */}
        <MultiplierDisplay multiplier={multiplier} />

        {/* Free Spins Display */}
        <FreeSpinsDisplay 
          freeSpins={freeSpins} 
          freeSpinsAwarded={freeSpinsAwarded}
        />

        {/* Slot Machine */}
        <div className="slot-machine-wrapper">
          <SlotMachine 
            reels={transformedReels.length > 0 ? transformedReels : reels}
            originalReels={reels}
            isSpinning={isSpinning}
            winningLines={winningLines}
            showWinAnimation={showWinAnimation}
          />
        </div>

        {/* Win Display */}
        <WinDisplay 
          winAmount={lastWin} 
          show={showWinAnimation}
          multiplier={multiplier}
        />

        {/* Error Display */}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {/* Game Controls */}
        <GameControls
          betAmount={betAmount}
          onBetChange={handleBetChange}
          onSpin={handleSpin}
          isSpinning={isSpinning}
          freeSpins={freeSpins}
          balance={user?.balance || 0}
        />
      </main>

      {/* Footer Stats */}
      <footer className="game-footer">
        <div className="stats-container">
          <div className="stat-item">
            <span className="stat-label">Total Spins</span>
            <span className="stat-value">{gameStats.totalSpins}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Total Wins</span>
            <span className="stat-value">{gameStats.totalWins}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Biggest Win</span>
            <span className="stat-value">
              ${gameStats.biggestWin.toFixed(2)}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Game;
