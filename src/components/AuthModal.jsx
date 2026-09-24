import React, { useState } from 'react';
import { useFandom } from '../context/FandomContext';
import { X, Sparkles, User, Mail, Lock, ShieldCheck } from 'lucide-react';

export const AuthModal = () => {
  const { isAuthOpen, setIsAuthOpen, authMode, setAuthMode, loginUser } = useFandom();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isAuthOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(name || (authMode === 'login' ? 'Shinobi Explorer' : 'Otaku Commander'), email || 'fan@fandomverse.io');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200/90 dark:border-zinc-800 shadow-2xl p-6 overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-purple-600/10 dark:bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-pink-600/10 dark:bg-pink-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => setIsAuthOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 p-0.5 shadow-lg shadow-purple-900/40 mb-3 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white font-display">
            {authMode === 'login' ? 'Welcome Back, Fan' : 'Join the FandomVerse'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {authMode === 'login'
              ? 'Access your personalized bookmarks & fan notes'
              : 'Create your explorer profile and unlock community perks'}
          </p>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-500/30 text-[10px] text-purple-700 dark:text-purple-300 mt-2.5">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>Community Portal: Sign in to sync your favorites and notes</span>
          </div>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex rounded-xl bg-slate-100 dark:bg-zinc-950 p-1 mb-5 border border-slate-200 dark:border-white/5">
          <button
            type="button"
            onClick={() => setAuthMode('login')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
              authMode === 'login'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('signup')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
              authMode === 'signup'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {authMode === 'signup' && (
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">Fan Username</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400 dark:text-slate-500" />
                <input
                  type="text"
                  placeholder="e.g. NeonHunter99"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400 dark:text-slate-500" />
              <input
                type="email"
                placeholder="name@fandom.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-400 dark:text-slate-500" />
              <input
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs shadow-lg shadow-purple-900/40 transition-all"
          >
            {authMode === 'login' ? 'Simulate Sign In' : 'Simulate Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
};
