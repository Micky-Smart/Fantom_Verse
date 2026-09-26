import React, { createContext, useContext, useState, useEffect } from 'react';

// Fallback static JSON imports to guarantee 100% offline, zero-backend operation
import fallbackCategories from '../../public/data/categories.json';
import fallbackAnime from '../../public/data/anime.json';
import fallbackGaming from '../../public/data/gaming.json';
import fallbackMovies from '../../public/data/movies.json';
import fallbackTv from '../../public/data/tvshows.json';
import fallbackKpop from '../../public/data/kpop.json';
import fallbackComics from '../../public/data/comics.json';
import fallbackManga from '../../public/data/manga.json';
import fallbackCharacters from '../../public/data/characters.json';
import fallbackEvents from '../../public/data/events.json';
import fallbackMerchandise from '../../public/data/merchandise.json';
import fallbackArticles from '../../public/data/articles.json';
import fallbackTrailers from '../../public/data/trailers.json';
import fallbackKB from '../../public/data/chatbot_kb.json';

const FandomContext = createContext(null);

export const FandomProvider = ({ children }) => {
  // Navigation State
  const [currentView, setCurrentView] = useState('home');
  const [activeCategoryId, setActiveCategoryId] = useState('anime');
  const [activeArticleId, setActiveArticleId] = useState(null);
  const [targetCharacterId, setTargetCharacterId] = useState(null);
  const [activeCharacterModal, setActiveCharacterModal] = useState(null);

  // Modals & Drawers
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  // Default to Sleek Dark/Black Theme vs Radiant Cultural Light Mode
  const [themeMode, setThemeMode] = useState(() => {
    const saved = localStorage.getItem('fandomverse_theme_v2');
    return saved === 'light' ? 'light' : 'dark';
  });

  useEffect(() => {
    localStorage.setItem('fandomverse_theme_v2', themeMode);
    localStorage.setItem('fandomverse_theme', themeMode);
    if (themeMode === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Global Data Cache
  const [categories, setCategories] = useState([]);
  const [categoryData, setCategoryData] = useState({});
  const [characters, setCharacters] = useState([]);
  const [events, setEvents] = useState([]);
  const [merchandise, setMerchandise] = useState([]);
  const [articles, setArticles] = useState([]);
  const [trailers, setTrailers] = useState([]);
  const [chatbotKB, setChatbotKB] = useState(null);
  const [loading, setLoading] = useState(true);

  // Visitor Counter (LocalStorage with initial seed)
  const [visitorCount, setVisitorCount] = useState(() => {
    const saved = localStorage.getItem('fandomverse_visitor_count');
    if (saved) {
      const next = parseInt(saved, 10) + 1;
      localStorage.setItem('fandomverse_visitor_count', next.toString());
      return next;
    }
    const seed = 1248; // Starting seed matching reference screenshot (001247+)
    localStorage.setItem('fandomverse_visitor_count', seed.toString());
    return seed;
  });

  // Simulated User Auth
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('fandomverse_user');
    return saved ? JSON.parse(saved) : { loggedIn: false, name: '', email: '', avatar: '' };
  });

  // Shopping Cart (LocalStorage)
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('fandomverse_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Bookmarks (LocalStorage)
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('fandomverse_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  // Session Notes (strictly SessionStorage)
  const [sessionNotes, setSessionNotes] = useState(() => {
    const saved = sessionStorage.getItem('fandomverse_session_notes');
    return saved ? JSON.parse(saved) : {};
  });

  // Lightbox State
  const [lightbox, setLightbox] = useState({
    isOpen: false,
    images: [],
    currentIndex: 0,
    title: ''
  });

  // Video Trailer Modal State
  const [activeVideo, setActiveVideo] = useState(null); // { youtubeId, title }

  // Global Audio Player
  const [audioPlayer, setAudioPlayer] = useState({
    isPlaying: false,
    trackUrl: '',
    trackTitle: '',
    artist: '',
    cover: ''
  });

  // Load JSON Datasets
  useEffect(() => {
    const loadAllData = async () => {
      try {
        setLoading(true);
        const [
          catsRes,
          animeRes,
          gamingRes,
          moviesRes,
          tvRes,
          kpopRes,
          comicsRes,
          mangaRes,
          charsRes,
          eventsRes,
          merchRes,
          artRes,
          trailersRes,
          kbRes
        ] = await Promise.all([
          fetch('/data/categories.json').then(r => r.json()),
          fetch('/data/anime.json').then(r => r.json()),
          fetch('/data/gaming.json').then(r => r.json()),
          fetch('/data/movies.json').then(r => r.json()),
          fetch('/data/tvshows.json').then(r => r.json()),
          fetch('/data/kpop.json').then(r => r.json()),
          fetch('/data/comics.json').then(r => r.json()),
          fetch('/data/manga.json').then(r => r.json()),
          fetch('/data/characters.json').then(r => r.json()),
          fetch('/data/events.json').then(r => r.json()),
          fetch('/data/merchandise.json').then(r => r.json()),
          fetch('/data/articles.json').then(r => r.json()),
          fetch('/data/trailers.json').then(r => r.json()),
          fetch('/data/chatbot_kb.json').then(r => r.json())
        ]);

        setCategories(catsRes);
        setCategoryData({
          anime: animeRes,
          gaming: gamingRes,
          movies: moviesRes,
          tvshows: tvRes,
          kpop: kpopRes,
          comics: comicsRes,
          manga: mangaRes
        });
        setCharacters(charsRes);
        setEvents(eventsRes);
        setMerchandise(merchRes);
        setArticles(artRes);
        setTrailers(trailersRes);
        setChatbotKB(kbRes);
      } catch (err) {
        console.warn("fetch() failed (likely local file:// origin). Using pre-bundled static JSON datasets:", err);
        setCategories(fallbackCategories);
        setCategoryData({
          anime: fallbackAnime,
          gaming: fallbackGaming,
          movies: fallbackMovies,
          tvshows: fallbackTv,
          kpop: fallbackKpop,
          comics: fallbackComics,
          manga: fallbackManga
        });
        setCharacters(fallbackCharacters);
        setEvents(fallbackEvents);
        setMerchandise(fallbackMerchandise);
        setArticles(fallbackArticles);
        setTrailers(fallbackTrailers);
        setChatbotKB(fallbackKB);
      } finally {
        setLoading(false);
      }
    };

    loadAllData();
  }, []);

  // Save Cart to LocalStorage
  useEffect(() => {
    localStorage.setItem('fandomverse_cart', JSON.stringify(cart));
  }, [cart]);

  // Save Bookmarks to LocalStorage
  useEffect(() => {
    localStorage.setItem('fandomverse_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Save Session Notes to SessionStorage
  useEffect(() => {
    sessionStorage.setItem('fandomverse_session_notes', JSON.stringify(sessionNotes));
  }, [sessionNotes]);

  // Cart Operations
  const addToCart = (product, selectedOption) => {
    setCart(prev => {
      const optionKey = selectedOption || (product.options ? product.options[0] : 'Standard');
      const existingIndex = prev.findIndex(item => item.id === product.id && item.selectedOption === optionKey);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += 1;
        return next;
      }
      return [...prev, { ...product, selectedOption: optionKey, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId, selectedOption) => {
    setCart(prev => prev.filter(item => !(item.id === productId && item.selectedOption === selectedOption)));
  };

  const updateQuantity = (productId, selectedOption, delta) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === productId && item.selectedOption === selectedOption) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const clearCart = () => setCart([]);

  const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartTax = cartSubtotal * 0.08; // 8% sales tax
  const cartTotal = cartSubtotal + cartTax;
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Bookmark Operations
  const isBookmarked = (id) => bookmarks.some(b => b.id === id);

  const toggleBookmark = (item) => {
    setBookmarks(prev => {
      if (prev.some(b => b.id === item.id)) {
        return prev.filter(b => b.id !== item.id);
      }
      return [...prev, {
        id: item.id,
        title: item.title || item.name,
        type: item.contentType || (item.series ? 'character' : item.location ? 'event' : item.price ? 'merchandise' : 'article'),
        image: item.thumbnail || item.image || item.banner,
        category: item.category || item.categoryId || 'fandom',
        franchise: item.franchise || item.series || '',
        dateAdded: new Date().toISOString()
      }];
    });
  };

  // Session Notes Operations
  const getNote = (id) => sessionNotes[id] || '';
  const setNote = (id, noteText) => {
    setSessionNotes(prev => ({ ...prev, [id]: noteText }));
  };

  // Export Bookmarks
  const exportBookmarks = (format = 'json') => {
    const exportData = bookmarks.map(b => ({
      ...b,
      sessionNote: sessionNotes[b.id] || ''
    }));

    if (format === 'json') {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `fandomverse_bookmarks_${new Date().toISOString().split('T')[0]}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } else {
      let text = `=========================================\n`;
      text += `       FANDOMVERSE BOOKMARKS EXPORT       \n`;
      text += `     Exported on: ${new Date().toLocaleString()}\n`;
      text += `=========================================\n\n`;
      exportData.forEach((b, i) => {
        text += `${i + 1}. ${b.title.toUpperCase()}\n`;
        text += `   Category: ${b.category} | Type: ${b.type}\n`;
        if (b.franchise) text += `   Franchise: ${b.franchise}\n`;
        if (b.sessionNote) text += `   Personal Note: "${b.sessionNote}"\n`;
        text += `   Added: ${new Date(b.dateAdded).toLocaleDateString()}\n\n`;
      });

      const dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(text);
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `fandomverse_bookmarks_${new Date().toISOString().split('T')[0]}.txt`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    }
  };

  // Lightbox Operations
  const openLightbox = (images, startIndex = 0, title = '') => {
    setLightbox({
      isOpen: true,
      images,
      currentIndex: startIndex,
      title
    });
  };

  const closeLightbox = () => {
    setLightbox(prev => ({ ...prev, isOpen: false }));
  };

  const nextLightbox = () => {
    setLightbox(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % prev.images.length
    }));
  };

  const prevLightbox = () => {
    setLightbox(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length
    }));
  };

  // Audio Player Operations
  const playAudio = (track) => {
    setAudioPlayer({
      isPlaying: true,
      trackUrl: track.audioUrl || track.url,
      trackTitle: track.title,
      artist: track.audioArtist || track.artist || 'FandomVerse OST',
      cover: track.thumbnail || track.image || '/images/categories/gaming-cover.jpg'
    });
  };

  const pauseAudio = () => {
    setAudioPlayer(prev => ({ ...prev, isPlaying: false }));
  };

  const resumeAudio = () => {
    setAudioPlayer(prev => ({ ...prev, isPlaying: true }));
  };

  const stopAudio = () => {
    setAudioPlayer({
      isPlaying: false,
      trackUrl: '',
      trackTitle: '',
      artist: '',
      cover: ''
    });
  };

  // History & Back Navigation Stack
  const [historyStack, setHistoryStack] = useState([{ view: 'home', categoryId: 'anime', articleId: null }]);

  // Listen to browser Back / Forward buttons (HTML5 popstate)
  useEffect(() => {
    try {
      if (!window.history.state) {
        window.history.replaceState({ view: 'home', categoryId: 'anime', articleId: null }, '');
      }
    } catch {
      // ignore in restricted envs
    }

    const handlePopState = (event) => {
      const state = event.state;
      if (state && state.view) {
        setCurrentView(state.view);
        if (state.categoryId) setActiveCategoryId(state.categoryId);
        if (state.articleId) setActiveArticleId(state.articleId);
        setHistoryStack(prev => (prev.length > 1 ? prev.slice(0, -1) : prev));
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentView('home');
        setHistoryStack([{ view: 'home', categoryId: 'anime', articleId: null }]);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Navigation Helpers
  const navigateTo = (view, extra = {}) => {
    const charId = extra.targetCharacterId || extra.characterId || null;
    const newState = {
      view,
      categoryId: extra.categoryId || (view === 'category' ? activeCategoryId : null),
      articleId: extra.articleId || null,
      targetCharacterId: charId
    };

    setHistoryStack(prev => [...prev, newState]);
    try {
      window.history.pushState(newState, '');
    } catch {
      // ignore
    }

    setCurrentView(view);
    if (extra.categoryId) setActiveCategoryId(extra.categoryId);
    if (extra.articleId) setActiveArticleId(extra.articleId);
    setTargetCharacterId(charId);
    if (!charId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goBack = () => {
    if (historyStack.length > 1) {
      const previous = historyStack[historyStack.length - 2];
      setHistoryStack(prev => prev.slice(0, -1));
      setCurrentView(previous.view);
      if (previous.categoryId) setActiveCategoryId(previous.categoryId);
      if (previous.articleId) setActiveArticleId(previous.articleId);
      setTargetCharacterId(previous.targetCharacterId || null);
      try {
        window.history.back();
      } catch {
        // ignore
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigateTo('home');
    }
  };

  // Auth Operations
  const loginUser = (name, email) => {
    const newUser = {
      loggedIn: true,
      name: name || 'Fandom Pioneer',
      email: email || 'fan@fandomverse.io',
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${name || 'fan'}`
    };
    setUser(newUser);
    localStorage.setItem('fandomverse_user', JSON.stringify(newUser));
    setIsAuthOpen(false);
  };

  const logoutUser = () => {
    const guest = { loggedIn: false, name: '', email: '', avatar: '' };
    setUser(guest);
    localStorage.removeItem('fandomverse_user');
  };

  return (
    <FandomContext.Provider
      value={{
        currentView,
        setCurrentView,
        activeCategoryId,
        setActiveCategoryId,
        activeArticleId,
        setActiveArticleId,
        activeCharacterModal,
        setActiveCharacterModal,
        isSearchOpen,
        setIsSearchOpen,
        isCartOpen,
        setIsCartOpen,
        isAuthOpen,
        setIsAuthOpen,
        authMode,
        setAuthMode,
        isQuizOpen,
        setIsQuizOpen,
        themeMode,
        toggleTheme,
        categories,
        categoryData,
        characters,
        events,
        merchandise,
        articles,
        trailers,
        chatbotKB,
        loading,
        visitorCount,
        user,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartSubtotal,
        cartTax,
        cartTotal,
        cartCount,
        bookmarks,
        isBookmarked,
        toggleBookmark,
        sessionNotes,
        getNote,
        setNote,
        exportBookmarks,
        lightbox,
        openLightbox,
        closeLightbox,
        nextLightbox,
        prevLightbox,
        activeVideo,
        setActiveVideo,
        audioPlayer,
        playAudio,
        pauseAudio,
        resumeAudio,
        stopAudio,
        targetCharacterId,
        setTargetCharacterId,
        navigateTo,
        goBack,
        canGoBack: currentView !== 'home' || historyStack.length > 1,
        loginUser,
        logoutUser
      }}
    >
      {children}
    </FandomContext.Provider>
  );
};

export const useFandom = () => {
  const context = useContext(FandomContext);
  if (!context) {
    throw new Error('useFandom must be used within a FandomProvider');
  }
  return context;
};
