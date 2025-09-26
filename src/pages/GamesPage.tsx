import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Filter, SlidersHorizontal, Grid3X3, List, ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GameCard } from '../components/Games/GameCard';
import { SkeletonCard, Loading } from '../components/UI/Loading';
import { Button } from '../components/UI/Button';

export const GamesPage: React.FC = () => {
  const { filteredGames, filters, setFilters } = useApp();
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'rating' | 'name'>('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const gamesPerPage = 12;

  // Sort games
  const sortedGames = useMemo(() => {
    const sorted = [...filteredGames];
    switch (sortBy) {
      case 'newest':
        return sorted.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
      case 'popular':
        return sorted.sort((a, b) => b.downloads - a.downloads);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'name':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return sorted;
    }
  }, [filteredGames, sortBy]);

  // Pagination
  const totalPages = Math.ceil(sortedGames.length / gamesPerPage);
  const startIndex = (currentPage - 1) * gamesPerPage;
  const endIndex = startIndex + gamesPerPage;
  const currentGames = sortedGames.slice(startIndex, endIndex);

  const categories = ['all', 'Acción', 'Aventura', 'RPG', 'Estrategia', 'Deportes', 'Simulación'];
  const genres = ['FPS', 'MMORPG', 'Supervivencia', 'Plataformas', 'Terror', 'Puzzle', 'Sandbox', 'Battle Royale'];

  const handleFilterChange = (key: keyof typeof filters, value: any) => {
    setFilters({ ...filters, [key]: value });
    setCurrentPage(1);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  const clearFilters = () => {
    setFilters({
      category: 'all',
      genre: [],
      popularity: 'all',
      size: 'all',
      rating: 0,
    });
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-dark pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-poppins font-bold text-white mb-4">
            Explorar Juegos
          </h1>
          <p className="text-gray-400">
            Descubre y descarga los mejores juegos de PC
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}
          >
            <div className="bg-dark-secondary rounded-2xl p-6 border border-neon-blue/10 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Filter className="w-5 h-5 text-neon-blue" />
                  Filtros
                </h2>
                <Button
                  onClick={clearFilters}
                  variant="ghost"
                  size="sm"
                  className="text-xs"
                >
                  Limpiar
                </Button>
              </div>

              <div className="space-y-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Categoría
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full bg-dark-tertiary border border-dark-tertiary rounded-lg px-3 py-2 text-white focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 focus:outline-none transition-all duration-300"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'Todas las categorías' : category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Genre Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Géneros
                  </label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {genres.map((genre) => (
                      <label key={genre} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={filters.genre.includes(genre)}
                          onChange={(e) => {
                            const newGenres = e.target.checked
                              ? [...filters.genre, genre]
                              : filters.genre.filter(g => g !== genre);
                            handleFilterChange('genre', newGenres);
                          }}
                          className="w-4 h-4 rounded border-dark-tertiary bg-dark-tertiary text-neon-blue focus:ring-neon-blue focus:ring-2"
                        />
                        <span className="text-sm text-gray-300">{genre}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Popularity Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Popularidad
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: 'all', label: 'Todos' },
                      { value: 'popular', label: 'Populares' },
                      { value: 'new', label: 'Nuevos' },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="popularity"
                          value={option.value}
                          checked={filters.popularity === option.value}
                          onChange={(e) => handleFilterChange('popularity', e.target.value as any)}
                          className="w-4 h-4 text-neon-blue border-dark-tertiary focus:ring-neon-blue focus:ring-2"
                        />
                        <span className="text-sm text-gray-300">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Calificación mínima: {filters.rating.toFixed(1)}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.5"
                    value={filters.rating}
                    onChange={(e) => handleFilterChange('rating', parseFloat(e.target.value))}
                    className="w-full h-2 bg-dark-tertiary rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
            >
              <div className="flex items-center gap-4">
                <Button
                  onClick={() => setShowFilters(!showFilters)}
                  variant="outline"
                  size="sm"
                  icon={SlidersHorizontal}
                  className="lg:hidden"
                >
                  Filtros
                </Button>
                
                <div className="text-gray-400">
                  {sortedGames.length} juegos encontrados
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-dark-secondary border border-dark-tertiary rounded-lg px-3 py-2 text-white focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 focus:outline-none transition-all duration-300"
                >
                  <option value="newest">Más recientes</option>
                  <option value="popular">Más populares</option>
                  <option value="rating">Mejor calificados</option>
                  <option value="name">A-Z</option>
                </select>

                {/* View Mode */}
                <div className="flex border border-dark-tertiary rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-neon-blue text-dark-primary' : 'text-gray-400 hover:text-white'} transition-colors duration-300`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-neon-blue text-dark-primary' : 'text-gray-400 hover:text-white'} transition-colors duration-300`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Games Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, index) => (
                  <SkeletonCard key={index} />
                ))}
              </div>
            ) : currentGames.length > 0 ? (
              <motion.div
                layout
                className={`grid gap-6 ${
                  viewMode === 'grid'
                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                    : 'grid-cols-1'
                }`}
              >
                {currentGames.map((game, index) => (
                  <GameCard key={game.id} game={game} index={index} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="text-6xl mb-4">🎮</div>
                <h3 className="text-2xl font-semibold text-white mb-2">
                  No se encontraron juegos
                </h3>
                <p className="text-gray-400 mb-6">
                  Intenta ajustar tus filtros o buscar algo diferente
                </p>
                <Button onClick={clearFilters} variant="primary">
                  Limpiar filtros
                </Button>
              </motion.div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center items-center gap-2 mt-12"
              >
                <Button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  variant="outline"
                  size="sm"
                  icon={ChevronLeft}
                >
                  Anterior
                </Button>

                <div className="flex gap-1">
                  {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                    let pageNumber;
                    if (totalPages <= 7) {
                      pageNumber = i + 1;
                    } else if (currentPage <= 4) {
                      pageNumber = i + 1;
                    } else if (currentPage >= totalPages - 3) {
                      pageNumber = totalPages - 6 + i;
                    } else {
                      pageNumber = currentPage - 3 + i;
                    }

                    return (
                      <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 ${
                          currentPage === pageNumber
                            ? 'bg-neon-blue text-dark-primary'
                            : 'text-gray-400 hover:text-white hover:bg-dark-tertiary'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}
                </div>

                <Button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  variant="outline"
                  size="sm"
                  icon={ChevronRight}
                >
                  Siguiente
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
