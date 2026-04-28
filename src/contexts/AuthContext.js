import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

// Set base URL for axios
axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// Default guest user
const GUEST_USER = {
  id: 1,
  name: 'Guest Player',
  email: 'guest@superace.com',
  balance: 10000.00,
  free_spins: 0,
  total_wagered: 0,
  total_won: 0,
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(GUEST_USER);
  const [loading, setLoading] = useState(false);
  const [token] = useState('guest-token');

  useEffect(() => {
    // Set default authorization for guest
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setLoading(false);
  }, [token]);

  const updateBalance = (newBalance) => {
    setUser({ ...user, balance: newBalance });
  };

  const updateFreeSpins = (freeSpins) => {
    setUser({ ...user, free_spins: freeSpins });
  };

  const resetGame = () => {
    setUser({ ...GUEST_USER });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading,
      updateBalance,
      updateFreeSpins,
      resetGame,
      isAuthenticated: true,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
