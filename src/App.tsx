import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { HomePage } from './pages/HomePage';
import { GamesPage } from './pages/GamesPage';
import { ContactPage } from './pages/ContactPage';
import { GameModal } from './components/Games/GameModal';
import { AuthModals } from './components/Auth/AuthModals';

const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-primary">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
      <GameModal />
      <AuthModals />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
