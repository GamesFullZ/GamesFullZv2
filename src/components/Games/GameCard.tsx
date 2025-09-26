import React from 'react';
import { motion } from 'framer-motion';
import { Download, Eye, Star, Calendar, HardDrive } from 'lucide-react';
import { Game } from '../../types';
import { useApp } from '../../context/AppContext';
import { Button } from '../UI/Button';
import { Rating } from '../UI/Rating';

interface GameCardProps {
  game: Game;
  index?: number;
}

export const GameCard: React.FC<GameCardProps> = ({ game, index = 0 }) => {
  const { setSelectedGame, setShowGameModal } = useApp();

  const handleViewDetails = () => {
    setSelectedGame(game);
    setShowGameModal(true);
  };

  const formatDownloads = (downloads: number): string => {
    if (downloads >= 1000000) return `${(downloads / 1000000).toFixed(1)}M`;
    if (downloads >= 1000) return `${(downloads / 1000).toFixed(1)}K`;
    return downloads.toString();
  };

  return (
    <motion.div
      className="group bg-gradient-card rounded-xl overflow-hidden border border-neon-blue/10 hover:border-neon-blue/30 transition-all duration-500 hover:shadow-2xl hover:shadow-neon-blue/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <motion.img
          src={game.thumbnail}
          alt={game.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        
        {/* Overlay with badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4">
            <Button
              onClick={handleViewDetails}
              variant="primary"
              size="sm"
              icon={Eye}
              className="w-full"
            >
              Ver Detalles
            </Button>
          </div>
        </div>

        {/* Status badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {game.featured && (
            <span className="px-2 py-1 bg-gradient-neon text-xs font-semibold text-dark-primary rounded-full">
              Destacado
            </span>
          )}
          {game.new && (
            <span className="px-2 py-1 bg-neon-pink text-xs font-semibold text-white rounded-full">
              Nuevo
            </span>
          )}
          {game.popular && (
            <span className="px-2 py-1 bg-neon-purple text-xs font-semibold text-white rounded-full">
              Popular
            </span>
          )}
        </div>

        {/* Price */}
        <div className="absolute top-3 right-3">
          <span className="px-3 py-1 bg-dark-primary/90 text-sm font-bold text-accent-yellow rounded-full border border-accent-yellow/30">
            {game.price === 0 ? 'Gratis' : `$${game.price}`}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title and Category */}
        <div>
          <h3 className="text-lg font-semibold text-white group-hover:text-neon-blue transition-colors duration-300 line-clamp-2">
            {game.title}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs px-2 py-1 bg-dark-primary rounded-full text-gray-300 border border-dark-tertiary">
              {game.category}
            </span>
            {game.genre.slice(0, 2).map((genre) => (
              <span key={genre} className="text-xs px-2 py-1 bg-dark-tertiary rounded-full text-gray-400">
                {genre}
              </span>
            ))}
          </div>
        </div>

        {/* Rating */}
        <Rating rating={game.rating} size="sm" />

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <Download className="w-3 h-3" />
            <span>{formatDownloads(game.downloads)}</span>
          </div>
          <div className="flex items-center gap-1">
            <HardDrive className="w-3 h-3" />
            <span>{game.size}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{new Date(game.releaseDate).getFullYear()}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
          {game.description}
        </p>
      </div>
    </motion.div>
  );
};
