import React from 'react';
import { motion } from 'framer-motion';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Search, Menu, User, LogIn } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../UI/Button';

export const Header: React.FC = () => {
  const { 
    user, 
    setShowLoginModal,
    searchTerm,
    setSearchTerm 
  } = useApp();
  const location = useLocation();

  const navItems = [
    { to: '/', label: 'Inicio' },
    { to: '/games', label: 'Juegos' },
    { to: '/contact', label: 'Contacto' },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-dark-primary/95 backdrop-blur-md border-b border-neon-blue/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/">
            <motion.div
              className="flex items-center space-x-2 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-8 h-8 bg-gradient-neon rounded-lg flex items-center justify-center">
                <span className="text-dark-primary font-bold text-lg">G</span>
              </div>
              <span className="text-xl font-poppins font-bold text-white">
                Game<span className="text-neon-blue">Hub</span>
              </span>
            </motion.div>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                    isActive
                      ? 'text-neon-blue'
                      : 'text-gray-300 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon-blue"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Search - Desktop */}
          {location.pathname === '/games' && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 'auto', opacity: 1 }}
              className="hidden md:flex items-center relative max-w-xs"
            >
              <Search className="absolute left-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar juegos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-dark-secondary border border-dark-tertiary rounded-lg text-white placeholder-gray-400 focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 focus:outline-none transition-all duration-300"
              />
            </motion.div>
          )}

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <motion.div
                className="flex items-center space-x-2 px-4 py-2 bg-dark-secondary rounded-lg border border-neon-blue/20"
                whileHover={{ scale: 1.05 }}
              >
                <User className="w-4 h-4 text-neon-blue" />
                <span className="text-sm text-white">{user.username}</span>
              </motion.div>
            ) : (
              <Button
                onClick={() => setShowLoginModal(true)}
                variant="outline"
                size="sm"
                icon={LogIn}
              >
                Iniciar Sesión
              </Button>
            )}

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 text-gray-400 hover:text-white">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {location.pathname === '/games' && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="md:hidden pb-4"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar juegos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-dark-secondary border border-dark-tertiary rounded-lg text-white placeholder-gray-400 focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 focus:outline-none transition-all duration-300"
              />
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};
