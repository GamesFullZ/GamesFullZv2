import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Star, Calendar, HardDrive, Users, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { generateMockReviews } from '../../data/mockData';
import { Button } from '../UI/Button';
import { Rating } from '../UI/Rating';

export const GameModal: React.FC = () => {
  const { selectedGame, showGameModal, setShowGameModal, user, setShowLoginModal } = useApp();
  const [activeTab, setActiveTab] = useState<'description' | 'requirements' | 'downloads' | 'reviews'>('description');
  const [currentScreenshot, setCurrentScreenshot] = useState(0);

  if (!selectedGame) return null;

  const reviews = generateMockReviews(selectedGame.id, 5);
  
  const tabs = [
    { id: 'description', label: 'Descripción' },
    { id: 'requirements', label: 'Requisitos' },
    { id: 'downloads', label: 'Descargas' },
    { id: 'reviews', label: 'Comentarios' },
  ] as const;

  const formatDownloads = (downloads: number): string => {
    if (downloads >= 1000000) return `${(downloads / 1000000).toFixed(1)}M`;
    if (downloads >= 1000) return `${(downloads / 1000).toFixed(1)}K`;
    return downloads.toString();
  };

  const nextScreenshot = () => {
    setCurrentScreenshot((prev) => (prev + 1) % selectedGame.screenshots.length);
  };

  const prevScreenshot = () => {
    setCurrentScreenshot((prev) => (prev - 1 + selectedGame.screenshots.length) % selectedGame.screenshots.length);
  };

  const handleDownload = () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    // Simulate download
    alert('¡Descarga iniciada!');
  };

  return (
    <AnimatePresence>
      {showGameModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setShowGameModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-6xl max-h-[90vh] bg-dark-secondary rounded-2xl overflow-hidden border border-neon-blue/20 shadow-2xl"
          >
            {/* Header */}
            <div className="relative">
              <div className="flex items-center justify-between p-6 border-b border-dark-tertiary">
                <div className="flex items-center space-x-4">
                  <img
                    src={selectedGame.thumbnail}
                    alt={selectedGame.title}
                    className="w-16 h-16 rounded-lg object-cover border border-neon-blue/20"
                  />
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedGame.title}</h2>
                    <div className="flex items-center gap-3 mt-1">
                      <Rating rating={selectedGame.rating} size="sm" />
                      <span className="text-sm text-gray-400">•</span>
                      <span className="text-sm text-gray-400">{selectedGame.category}</span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => setShowGameModal(false)}
                  className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-dark-tertiary transition-colors duration-300"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row">
              {/* Left Column - Screenshots */}
              <div className="lg:w-1/2 p-6">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-dark-tertiary">
                  <img
                    src={selectedGame.screenshots[currentScreenshot]}
                    alt={`Screenshot ${currentScreenshot + 1}`}
                    className="w-full h-full object-cover"
                  />
                  
                  {selectedGame.screenshots.length > 1 && (
                    <>
                      <button
                        onClick={prevScreenshot}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-dark-primary/80 text-white rounded-full hover:bg-dark-primary transition-colors duration-300"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextScreenshot}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-dark-primary/80 text-white rounded-full hover:bg-dark-primary transition-colors duration-300"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                  
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {selectedGame.screenshots.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentScreenshot(index)}
                        className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                          index === currentScreenshot ? 'bg-neon-blue' : 'bg-white/30'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Game Stats */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center p-4 bg-dark-tertiary rounded-lg border border-neon-blue/10">
                    <Download className="w-6 h-6 text-neon-blue mx-auto mb-2" />
                    <div className="text-lg font-bold text-white">{formatDownloads(selectedGame.downloads)}</div>
                    <div className="text-xs text-gray-400">Descargas</div>
                  </div>
                  <div className="text-center p-4 bg-dark-tertiary rounded-lg border border-neon-blue/10">
                    <HardDrive className="w-6 h-6 text-neon-blue mx-auto mb-2" />
                    <div className="text-lg font-bold text-white">{selectedGame.size}</div>
                    <div className="text-xs text-gray-400">Tamaño</div>
                  </div>
                  <div className="text-center p-4 bg-dark-tertiary rounded-lg border border-neon-blue/10">
                    <Calendar className="w-6 h-6 text-neon-blue mx-auto mb-2" />
                    <div className="text-lg font-bold text-white">{new Date(selectedGame.releaseDate).getFullYear()}</div>
                    <div className="text-xs text-gray-400">Lanzamiento</div>
                  </div>
                </div>

                {/* Download Button */}
                <div className="mt-6">
                  <Button
                    onClick={handleDownload}
                    variant="primary"
                    size="lg"
                    icon={Download}
                    className="w-full text-xl py-4"
                  >
                    {selectedGame.price === 0 ? 'Descargar Gratis' : `Comprar por $${selectedGame.price}`}
                  </Button>
                </div>
              </div>

              {/* Right Column - Content */}
              <div className="lg:w-1/2 flex flex-col">
                {/* Tabs */}
                <div className="flex border-b border-dark-tertiary">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 px-4 py-3 text-sm font-medium transition-colors duration-300 ${
                        activeTab === tab.id
                          ? 'text-neon-blue border-b-2 border-neon-blue'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="flex-1 p-6 overflow-y-auto max-h-96">
                  {activeTab === 'description' && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">Descripción</h4>
                        <p className="text-gray-300 leading-relaxed">{selectedGame.description}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">Géneros</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedGame.genre.map((genre) => (
                            <span
                              key={genre}
                              className="px-3 py-1 bg-dark-primary text-neon-blue rounded-full text-sm border border-neon-blue/20"
                            >
                              {genre}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'requirements' && (
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Requisitos Mínimos</h4>
                        <div className="space-y-3 bg-dark-tertiary p-4 rounded-lg">
                          {Object.entries(selectedGame.requirements.minimum).map(([key, value]) => (
                            <div key={key} className="flex justify-between">
                              <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                              <span className="text-white">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Requisitos Recomendados</h4>
                        <div className="space-y-3 bg-dark-tertiary p-4 rounded-lg">
                          {Object.entries(selectedGame.requirements.recommended).map(([key, value]) => (
                            <div key={key} className="flex justify-between">
                              <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                              <span className="text-white">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'downloads' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-dark-tertiary rounded-lg">
                        <div>
                          <h4 className="text-white font-semibold">Descarga Principal</h4>
                          <p className="text-gray-400 text-sm">Versión completa del juego</p>
                        </div>
                        <Button onClick={handleDownload} variant="primary" size="sm" icon={Download}>
                          Descargar
                        </Button>
                      </div>
                      
                      <div className="text-center py-8 text-gray-400">
                        <Download className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Más opciones de descarga próximamente</p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'reviews' && (
                    <div className="space-y-4">
                      {user ? (
                        <>
                          {reviews.map((review) => (
                            <div key={review.id} className="border-b border-dark-tertiary pb-4">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-3">
                                  <div className="w-8 h-8 bg-gradient-neon rounded-full flex items-center justify-center">
                                    <span className="text-dark-primary font-semibold text-sm">
                                      {review.username.charAt(0).toUpperCase()}
                                    </span>
                                  </div>
                                  <span className="text-white font-medium">{review.username}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Rating rating={review.rating} size="sm" showNumber={false} />
                                  <span className="text-gray-400 text-sm">{review.date}</span>
                                </div>
                              </div>
                              <p className="text-gray-300 text-sm">{review.comment}</p>
                            </div>
                          ))}
                        </>
                      ) : (
                        <div className="text-center py-8">
                          <Users className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                          <p className="text-gray-400 mb-4">Inicia sesión para ver y escribir comentarios</p>
                          <Button
                            onClick={() => {
                              setShowGameModal(false);
                              setShowLoginModal(true);
                            }}
                            variant="outline"
                            size="sm"
                          >
                            Iniciar Sesión
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
