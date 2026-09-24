import React, { useState, useEffect, useRef } from 'react';
import { useFandom } from '../context/FandomContext';
import { Bot, X, Send, Sparkles, ArrowRight, RotateCcw, MessageSquare } from 'lucide-react';

export const ChatbotWidget = () => {
  const { chatbotKB, navigateTo } = useFandom();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Initialize welcome message from KB
  useEffect(() => {
    if (chatbotKB && messages.length === 0) {
      setMessages([
        {
          id: 1,
          sender: 'bot',
          text: chatbotKB.welcomeMessage,
          link: null
        }
      ]);
    }
  }, [chatbotKB, messages.length]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  const processQuery = (rawQuery) => {
    if (!rawQuery.trim() || !chatbotKB) return;
    const userText = rawQuery.trim();

    // Add user message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: userText
    };
    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    // Analyze intent against knowledge base
    const queryLower = userText.toLowerCase();
    let bestMatch = null;

    for (const item of chatbotKB.faq) {
      const match = item.keywords.some(k => queryLower.includes(k));
      if (match) {
        bestMatch = item;
        break;
      }
    }

    setTimeout(() => {
      setIsTyping(false);
      if (bestMatch) {
        setMessages(prev => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'bot',
            text: bestMatch.response,
            link: bestMatch.link || null
          }
        ]);
      } else {
        setMessages(prev => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'bot',
            text: chatbotKB.fallbackResponse,
            link: { view: 'category', categoryId: 'anime', label: 'Explore Anime Hub' }
          }
        ]);
      }
    }, 450);
  };

  const handleLinkClick = (link) => {
    if (link.view === 'category') {
      navigateTo('category', { categoryId: link.categoryId });
    } else {
      navigateTo(link.view);
    }
    // Optionally close or keep open on mobile
    if (window.innerWidth < 640) {
      setIsOpen(false);
    }
  };

  const handleResetChat = () => {
    if (chatbotKB) {
      setMessages([
        {
          id: Date.now(),
          sender: 'bot',
          text: chatbotKB.welcomeMessage,
          link: null
        }
      ]);
    }
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-tr from-rose-500 via-purple-600 to-cyan-500 hover:from-rose-600 hover:to-cyan-400 text-white shadow-2xl shadow-purple-900/40 transform hover:scale-105 transition-all flex items-center justify-center group"
        aria-label="Open Fandom AI Assistant"
      >
        <span className="relative">
          <Bot className="w-6 h-6 animate-pulse" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-white dark:ring-zinc-900" />
        </span>
      </button>

      {/* Chat Window Drawer / Modal */}
      {isOpen && (
        <div className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-96 max-h-[560px] h-[75vh] bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200/90 dark:border-zinc-800 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-950 border-b border-slate-200 dark:border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-rose-500 to-purple-600 flex items-center justify-center text-white shadow-md">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span>{chatbotKB?.botName || 'FandomBot'}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                </h4>
                <p className="text-[10px] text-purple-600 dark:text-purple-300 font-medium">Rule-Based Fandom Knowledge Guide</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
                title="Restart conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50 dark:bg-zinc-950/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-rose-600 dark:bg-purple-600 text-white rounded-tr-none shadow-md'
                      : 'bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 border border-slate-200 dark:border-zinc-700 rounded-tl-none shadow-sm'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Deep Link Button */}
                  {msg.link && (
                    <button
                      onClick={() => handleLinkClick(msg.link)}
                      className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 dark:bg-purple-600/30 hover:bg-rose-600 hover:text-white dark:hover:bg-purple-600 border border-rose-200 dark:border-purple-500/40 text-rose-700 dark:text-purple-200 dark:hover:text-white text-[11px] font-bold transition-all"
                    >
                      <span>{msg.link.label}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-1 px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 w-fit shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Horizontal Scroll */}
          {chatbotKB?.quickSuggestions && (
            <div className="px-3 py-2 bg-slate-100 dark:bg-zinc-950 border-t border-slate-200 dark:border-zinc-800 flex gap-1.5 overflow-x-auto text-[11px] no-scrollbar">
              {chatbotKB.quickSuggestions.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => processQuery(s.query)}
                  className="px-2.5 py-1 rounded-full bg-white dark:bg-zinc-900 text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-purple-300 border border-slate-200 dark:border-zinc-800 hover:border-rose-400 dark:hover:border-purple-500/40 whitespace-nowrap transition-colors flex-shrink-0 shadow-sm"
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              processQuery(inputQuery);
            }}
            className="p-3 bg-white dark:bg-zinc-950 border-t border-slate-200 dark:border-zinc-800 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about anime, games, trailers, characters..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              className="flex-1 bg-slate-50 dark:bg-zinc-900 text-slate-900 dark:text-white text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-zinc-750 focus:outline-none focus:border-rose-500"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim()}
              className="p-2 rounded-xl bg-rose-600 hover:bg-rose-500 dark:bg-purple-600 dark:hover:bg-purple-500 text-white disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
