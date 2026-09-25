import React from 'react';
import { FandomProvider, useFandom } from './context/FandomContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Page Views
import { HomePage } from './pages/HomePage';
import { CategoryHubPage } from './pages/CategoryHubPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { TrailersPage } from './pages/TrailersPage';
import { CharactersPage } from './pages/CharactersPage';
import { EventsPage } from './pages/EventsPage';
import { MerchandisePage } from './pages/MerchandisePage';
import { BookmarksPage } from './pages/BookmarksPage';
import { ContactPage } from './pages/ContactPage';
import { AboutPage } from './pages/AboutPage';

// Interactive Overlays & Modals
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { LightboxModal } from './components/LightboxModal';
import { MediaViewerModal } from './components/MediaViewerModal';
import { AudioPlayerBar } from './components/AudioPlayerBar';
import { CartDrawer } from './components/CartDrawer';
import { AuthModal } from './components/AuthModal';
import { ChatbotWidget } from './components/ChatbotWidget';
import { ParticleBackground } from './components/ParticleBackground';
import { FandomQuizModal } from './components/FandomQuizModal';

const AppContent = () => {
  const { currentView, loading, isQuizOpen, setIsQuizOpen } = useFandom();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#09090b] flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/30 animate-pulse">
          <img src="/images/expo/img.jpg" alt="Fandom Hub" className="w-full h-full object-cover" />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-black text-slate-900 dark:text-white font-display tracking-tight">
            <span className="text-rose-500">Fandom</span><span>Hub</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1 font-mono">
            Loading JSON Universe Datasets...
          </p>
        </div>
      </div>
    );
  }

  const renderActiveView = () => {
    switch (currentView) {
      case 'home':
        return <HomePage />;
      case 'category':
        return <CategoryHubPage />;
      case 'article':
        return <ArticleDetailPage />;
      case 'trailers':
        return <TrailersPage />;
      case 'characters':
        return <CharactersPage />;
      case 'events':
        return <EventsPage />;
      case 'merchandise':
        return <MerchandisePage />;
      case 'bookmarks':
        return <BookmarksPage />;
      case 'contact':
        return <ContactPage />;
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#09090b] text-slate-900 dark:text-zinc-100 flex flex-col relative selection:bg-rose-500 selection:text-white transition-colors duration-200">
      {/* Ambient background glow accents */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-rose-500/5 dark:bg-rose-500/10 rounded-full blur-[128px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[128px] pointer-events-none -z-10" />
      <div className="fixed top-1/2 right-10 w-80 h-80 bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-[128px] pointer-events-none -z-10" />

      {/* Main Navigation Bar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {renderActiveView()}
      </main>

      {/* Footer */}
      <Footer />

      {/* Universal Floating & Overlay Components */}
      <ParticleBackground />
      <GlobalSearchModal />
      <LightboxModal />
      <MediaViewerModal />
      <AudioPlayerBar />
      <CartDrawer />
      <AuthModal />
      <ChatbotWidget />
      <FandomQuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </div>
  );
};

export default function App() {
  return (
    <FandomProvider>
      <AppContent />
    </FandomProvider>
  );
}
