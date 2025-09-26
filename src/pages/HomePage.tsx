import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Play, Star, Download, TrendingUp, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GameCard } from '../components/Games/GameCard';
import { Button } from '../components/UI/Button';
import { Game } from '../types';

export const HomePage: React.FC = () => {
  const { games, setSelectedGame, setShowGameModal } = useApp();
  const navigate = useNavigate();

  const featuredGame = games.find(game => game.featured) || games[0];
  const newGames = games.filter(game => game.new).slice(0, 6);
  const topGames = [...games]
    .sort((a, b) => b.downloads - a.downloads)
    .slice(0, 5);

  const handleViewGame = (game: Game) => {
    setSelectedGame(game);
    setShowGameModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={featuredGame.thumbnail}
            alt={featuredGame.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-primary/90 via-dark-primary/70 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-4">
                <span className="px-4 py-2 bg-gradient-neon text-dark-primary font-semibold rounded-full text-sm">
                  Juego de la Semana
                </span>
                <div className="flex items-center space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.round(featuredGame.rating)
                          ? 'text-accent-yellow fill-accent-yellow'
                          : 'text-gray-600'
                      }`}
                    />
                  ))}
                  <span className="text-white font-medium">{featuredGame.rating.toFixed(1)}</span>
                </div>
              </div>

              <h1 className="text-6xl md:text-7xl font-poppins font-bold text-white leading-tight">
                {featuredGame.title}
              </h1>

              <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                {featuredGame.description.slice(0, 200)}...
              </p>

              <div className="flex items-center space-x-6 text-gray-300">
                <div className="flex items-center space-x-2">
                  <Download className="w-5 h-5" />
                  <span>{(featuredGame.downloads / 1000000).toFixed(1)}M descargas</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>•</span>
                  <span>{featuredGame.category}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>•</span>
                  <span>{featuredGame.size}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  onClick={() => handleViewGame(featuredGame)}
                  variant="primary"
                  size="lg"
                  icon={Play}
                  className="text-lg px-8 py-4"
                >
                  {featuredGame.price === 0 ? 'Jugar Gratis' : `Comprar por $${featuredGame.price}`}
                </Button>
                <Button
                  onClick={() => handleViewGame(featuredGame)}
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-4"
                >
                  Ver Detalles
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Floating Game Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="hidden lg:block absolute right-8 top-1/2 transform -translate-y-1/2"
          >
            <div className="relative">
              <div className="w-80 h-48 rounded-2xl overflow-hidden border-4 border-neon-blue/30 shadow-2xl shadow-neon-blue/20 animate-glow">
                <img
                  src={featuredGame.screenshots[0]}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-neon rounded-full flex items-center justify-center animate-float">
                <Play className="w-8 h-8 text-dark-primary" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60"
        >
          <ChevronRight className="w-6 h-6 rotate-90" />
        </motion.div>
      </section>

      {/* New Games Section */}
      <section className="py-20 bg-dark-primary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <h2 className="text-4xl font-poppins font-bold text-white mb-4">
                Nuevos Lanzamientos
              </h2>
              <p className="text-gray-400">Los juegos más recientes y emocionantes</p>
            </div>
            <Button
              onClick={() => navigate('/games')}
              variant="ghost"
              icon={ChevronRight}
            >
              Ver todos
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newGames.map((game, index) => (
              <GameCard key={game.id} game={game} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Games Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-poppins font-bold text-white mb-4">
              Top 5 Más Descargados
            </h2>
            <p className="text-gray-400">Los juegos favoritos de nuestra comunidad</p>
          </motion.div>

          <div className="space-y-4">
            {topGames.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group flex items-center p-6 bg-dark-secondary rounded-2xl border border-neon-blue/10 hover:border-neon-blue/30 transition-all duration-500 hover:transform hover:scale-[1.02]"
              >
                <div className="flex items-center space-x-6 flex-1">
                  <div className="relative">
                    <span className="text-3xl font-bold text-neon-blue">#{index + 1}</span>
                    {index === 0 && (
                      <TrendingUp className="absolute -top-2 -right-2 w-4 h-4 text-accent-yellow" />
                    )}
                  </div>
                  
                  <img
                    src={game.thumbnail}
                    alt={game.title}
                    className="w-16 h-16 rounded-xl object-cover border-2 border-neon-blue/20"
                  />
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white group-hover:text-neon-blue transition-colors duration-300">
                      {game.title}
                    </h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-gray-400">{game.category}</span>
                      <span className="text-gray-600">•</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-accent-yellow fill-accent-yellow" />
                        <span className="text-gray-400">{game.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold text-white">
                      {(game.downloads / 1000000).toFixed(1)}M
                    </div>
                    <div className="text-gray-400 text-sm">descargas</div>
                  </div>
                </div>
                
                <Button
                  onClick={() => handleViewGame(game)}
                  variant="ghost"
                  size="sm"
                  className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  Ver
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
