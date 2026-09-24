import React, { useState } from 'react';
import { useFandom } from '../context/FandomContext';
import { ShoppingBag, Star, Check, Sparkles } from 'lucide-react';

export const MerchandiseCard = ({ item }) => {
  const { addToCart } = useFandom();
  const [selectedOption, setSelectedOption] = useState(
    item.options && item.options.length ? item.options[0] : 'Standard'
  );
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  const handleAddToCart = () => {
    addToCart(item, selectedOption);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1500);
  };

  return (
    <div className="group rounded-2xl bg-white dark:bg-zinc-900 hover:bg-purple-50/20 dark:hover:bg-zinc-850 border border-slate-200/90 dark:border-zinc-800 hover:border-purple-400 dark:hover:border-purple-500/40 overflow-hidden flex flex-col transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-xl dark:shadow-purple-900/10">
      {/* Product Image */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-900">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = "/images/merch/tanjiro-hoodie.jpg";
          }}
        />

        {/* Item Type & SubType Pills */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
          <span className="px-2 py-0.5 rounded bg-black/75 backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase tracking-wider text-white">
            {item.subType || item.itemType || 'Collectible'}
          </span>
          {item.badge && (
            <span className="px-2 py-0.5 rounded bg-amber-500/90 text-white backdrop-blur-md text-[9px] font-black tracking-wide shadow-sm">
              {item.badge}
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-bold text-amber-400">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span>{item.rating || '4.9'}</span>
        </div>
      </div>

      {/* Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
            <span className="text-pink-600 dark:text-pink-400 uppercase tracking-wider font-bold">
              {item.franchise}
            </span>
            <span className="uppercase text-purple-700 dark:text-purple-300 font-mono text-[10px]">
              {item.category}
            </span>
          </div>

          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors line-clamp-2 leading-snug">
            {item.name}
          </h3>

          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
            {item.description}
          </p>

          {/* Options / Sizes Selector */}
          {item.options && item.options.length > 0 && (
            <div className="flex items-center gap-1.5 mt-3 overflow-x-auto no-scrollbar py-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mr-1 flex-shrink-0">
                Option:
              </span>
              {item.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedOption(opt)}
                  className={`text-[10px] px-2 py-0.5 rounded-md font-mono transition-colors flex-shrink-0 ${
                    selectedOption === opt
                      ? 'bg-purple-600 text-white font-bold'
                      : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-white'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Price & Add to Cart */}
        <div className="pt-4 mt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase font-semibold">Price</span>
            <span className="text-base sm:text-lg font-black text-emerald-600 dark:text-emerald-400 font-mono">
              ${item.price.toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md ${
              isAddedRecently
                ? 'bg-emerald-600 text-white'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-purple-900/30 hover:scale-[1.02]'
            }`}
          >
            {isAddedRecently ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
