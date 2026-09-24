import React, { useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import {
  Mail,
  MapPin,
  Phone,
  Compass,
  Send,
  CheckCircle,
  Navigation,
  Globe,
  Clock,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const ContactPage = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    fandom: 'anime',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  // GPS Coordinates for FandomVerse Global Headquarters
  const gpsCoords = {
    lat: "34.0407",
    lng: "-118.2698",
    formatted: "34.0407° N, 118.2698° W",
    venue: "FandomVerse World Nexus (LA Live Plaza)",
    address: "1201 S Figueroa St, Los Angeles, CA 90015, USA"
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormState({
      name: '',
      email: '',
      fandom: 'anime',
      subject: '',
      message: ''
    });
    setSubmitted(false);
  };

  return (
    <div className="pb-20 space-y-8">
      <Breadcrumbs items={[{ label: 'Contact Us & GPS Headquarters' }]} />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-cyan-100 dark:bg-cyan-600/20 text-cyan-700 dark:text-cyan-400">
              <Mail className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-700 dark:text-cyan-400">
              Direct Communication Channel
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-display">
            Contact FandomVerse Team
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
            Have questions regarding community events, merchandise inquiries, or partnership opportunities? Reach out or visit our worldwide hub.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Responsive Contact Form (7 Columns) */}
          <div className="lg:col-span-7 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 p-6 sm:p-8 shadow-md dark:shadow-xl">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display flex items-center gap-2 mb-1">
              <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span>Send Us an Inquiry</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Our community moderation & editorial team responds within 24 hours.
            </p>

            {submitted ? (
              <div className="p-8 text-center space-y-4 bg-purple-50 dark:bg-purple-950/20 rounded-2xl border border-purple-200 dark:border-purple-500/30 animate-in fade-in">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-500 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">Transmission Received!</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formState.name}</strong>. Your feedback regarding the{' '}
                  <span className="text-purple-600 dark:text-purple-300 font-semibold uppercase">{formState.fandom}</span> fandom has been logged in our client session dispatch.
                </p>
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg transition-all"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maya Lin"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white text-xs placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white text-xs placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Fandom Category Interest
                    </label>
                    <select
                      value={formState.fandom}
                      onChange={(e) => setFormState({ ...formState, fandom: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-purple-500 cursor-pointer"
                    >
                      <option value="anime">Anime Hub (Japan 🇯🇵)</option>
                      <option value="gaming">Gaming Universe (🎮)</option>
                      <option value="movies">Cinematic Blockbusters (🎬)</option>
                      <option value="tvshows">TV Shows & Serials (📺)</option>
                      <option value="kpop">K-Pop Fandom (Korea 🇰🇷)</option>
                      <option value="comics">Comics & Graphic Novels (💥)</option>
                      <option value="manga">Manga Archives (✒️)</option>
                      <option value="general">General / Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Cosplay Contest Query"
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white text-xs placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us what's on your mind or how we can assist..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white text-xs placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-purple-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-purple-900/30 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01]"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: GPS Location & Interactive Google Map (5 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            {/* GPS Metadata Card */}
            <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 p-6 shadow-md dark:shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5">
                <div className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-300">
                    GPS Coordinates
                  </span>
                </div>
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  Active Satellite Lock
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 space-y-1">
                <div className="text-[11px] text-slate-500 dark:text-slate-400">Decimal / Degree Coordinates:</div>
                <div className="font-mono text-sm font-bold text-cyan-700 dark:text-cyan-200">
                  {gpsCoords.formatted}
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-pink-600 dark:text-pink-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">{gpsCoords.venue}</span>
                    <span className="text-slate-500 dark:text-slate-400">{gpsCoords.address}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 pt-2">
                  <Mail className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                  <span>contact@fandomverse.io &bull; press@fandomverse.io</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
                  <span>+1 (213) 555-FANDOM (3263)</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                  <span>Open Mon - Sun: 09:00 AM - 10:00 PM PST</span>
                </div>
              </div>
            </div>

            {/* Interactive Embedded Google Map with GPS Pinpoint */}
            <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 overflow-hidden shadow-md dark:shadow-xl">
              <div className="p-3 bg-slate-50 dark:bg-zinc-950 border-b border-slate-200 dark:border-zinc-800 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                  <span>Interactive World Map</span>
                </span>
                <a
                  href="https://maps.google.com/?q=Los+Angeles+Convention+Center"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>Open in Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="relative aspect-[4/3] w-full bg-slate-950">
                {/* Embed OpenStreetMap / Google Maps Embed */}
                <iframe
                  title="FandomVerse Global Headquarters"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.867946950293!2d-118.27218848478546!3d34.04071378060851!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c7b8bc1295e7%3A0x6b87dcf1e755f1b1!2sLos%20Angeles%20Convention%20Center!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Overlay GPS Pin Badge */}
                <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-purple-500/40 text-[11px] font-mono text-purple-300 flex items-center gap-1.5 shadow-lg">
                  <Compass className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
                  <span>GPS Lock: 34.0407° N, 118.2698° W</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
