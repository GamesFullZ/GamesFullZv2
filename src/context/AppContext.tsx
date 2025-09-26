import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Game, User, Filter } from '../types';
import { mockGames } from '../data/mockData';

interface AppContextType {
  // Games
  games: Game[];
  filteredGames: Game[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filters: Filter;
  setFilters: (filters: Filter) => void;
  
  // User
  user: User | null;
  setUser: (user: User | null) => void;
  
  // UI State
  selectedGame: Game | null;
  setSelectedGame: (game: Game | null) => void;
  showGameModal: boolean;
  setShowGameModal: (show: boolean) => void;
  showLoginModal: boolean;
  setShowLoginModal: (show: boolean) => void;
  showRegisterModal: boolean;
  setShowRegisterModal: (show: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp debe ser usado dentro de AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [games] = useState<Game[]>(mockGames);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Filter>({
    category: 'all',
    genre: [],
    popularity: 'all',
    size: 'all',
    rating: 0,
  });
  
  const [user, setUser] = useState<User | null>(null);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [showGameModal, setShowGameModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  // Filter games based on search term and filters
  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filters.category === 'all' || game.category === filters.category;
    const matchesGenre = filters.genre.length === 0 || filters.genre.some(g => game.genre.includes(g));
    const matchesPopularity = filters.popularity === 'all' || 
                             (filters.popularity === 'popular' && game.popular) ||
                             (filters.popularity === 'new' && game.new);
    const matchesRating = game.rating >= filters.rating;

    return matchesSearch && matchesCategory && matchesGenre && matchesPopularity && matchesRating;
  });

  const value: AppContextType = {
    games,
    filteredGames,
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    user,
    setUser,
    selectedGame,
    setSelectedGame,
    showGameModal,
    setShowGameModal,
    showLoginModal,
    setShowLoginModal,
    showRegisterModal,
    setShowRegisterModal,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
