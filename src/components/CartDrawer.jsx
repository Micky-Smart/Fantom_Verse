import React, { useState, useEffect } from 'react';
import { useFandom } from '../context/FandomContext';
import { X, Trash2, Plus, Minus, ShoppingBag, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CartDrawer = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartSubtotal,
    cartTax,
    cartTotal,
    cartCount
  } = useFandom();

  const [checkoutComplete, setCheckoutComplete] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isCartOpen) {
        setIsCartOpen(false);
        setCheckoutComplete(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  const handleSimulateCheckout = () => {
    // Launch celebratory confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    setCheckoutComplete(true);
  };

  const handleFinishCheckout = () => {
    clearCart();
    setCheckoutComplete(false);
    setIsCartOpen(false);
  };

  return (
    <div
      onClick={() => {
        setIsCartOpen(false);
        setCheckoutComplete(false);
      }}
      className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-backdrop-fade cursor-pointer"
    >
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-4 sm:pl-10">
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-[calc(100vw-1rem)] sm:w-screen max-w-md bg-white dark:bg-zinc-900 border-l border-slate-200 dark:border-zinc-800 shadow-2xl flex flex-col cursor-default animate-drawer-right"
        >
          {/* Header */}
          <div className="p-5 border-b border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-600/20 text-purple-600 dark:text-purple-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Temporary Shopping Cart</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {cartCount} {cartCount === 1 ? 'item' : 'items'} &bull; Client-Side Calculation
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setIsCartOpen(false);
                setCheckoutComplete(false);
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Checkout Completed Simulated State */}
          {checkoutComplete ? (
            <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center animate-bounce">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-white">Order Confirmed!</h4>
              <p className="text-xs text-slate-300 max-w-xs leading-relaxed">
                Thank you for supporting your favorite fandom! Your order calculation was processed successfully at <span className="font-bold text-emerald-400 font-mono">${cartTotal.toFixed(2)}</span>.
              </p>
              <div className="w-full bg-slate-100 dark:bg-zinc-950 rounded-xl p-4 border border-slate-200 dark:border-zinc-800 text-left text-xs space-y-2">
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Order Reference:</span>
                  <span className="font-mono text-purple-600 dark:text-purple-300">#FV-{(Math.random()*90000+10000).toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Items:</span>
                  <span>{cartCount} Fan Merchandise</span>
                </div>
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Grand Total:</span>
                  <span className="font-bold text-slate-900 dark:text-white font-mono">${cartTotal.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={handleFinishCheckout}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-sm hover:from-purple-500 hover:to-pink-500 shadow-lg shadow-purple-900/40"
              >
                Clear Cart & Continue Exploring
              </button>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {cart.length === 0 ? (
                  <div className="text-center py-20 text-slate-400 space-y-3">
                    <ShoppingBag className="w-12 h-12 mx-auto text-slate-400 dark:text-slate-600" />
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Your cart is currently empty.</p>
                    <p className="text-xs text-slate-500">
                      Explore the Merchandise Store to add apparel, figures, and collectibles!
                    </p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={`${item.id}-${item.selectedOption}`}
                      className="flex gap-3 p-3 rounded-xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200/90 dark:border-zinc-750 hover:border-purple-400 dark:hover:border-purple-500/30 transition-all"
                    >
                      {/* Image */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover bg-slate-200 dark:bg-slate-900 border border-slate-200 dark:border-white/10 flex-shrink-0"
                      />

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                          {item.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                          <span className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-white/5 text-purple-700 dark:text-purple-300 font-mono">
                            {item.selectedOption}
                          </span>
                          <span>•</span>
                          <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                            ${item.price.toFixed(2)}
                          </span>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-slate-200 dark:border-white/10 rounded-lg bg-white dark:bg-black/40">
                            <button
                              onClick={() => updateQuantity(item.id, item.selectedOption, -1)}
                              className="p-1 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-2 text-xs font-mono font-bold text-slate-900 dark:text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.selectedOption, 1)}
                              className="p-1 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                            <button
                              onClick={() => removeFromCart(item.id, item.selectedOption)}
                              className="text-slate-400 hover:text-rose-500 p-1 transition-colors"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Price Calculation Footer */}
              {cart.length > 0 && (
                <div className="p-5 border-t border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950/90 space-y-3">
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-500 dark:text-slate-400">
                      <span>Subtotal:</span>
                      <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                        ${cartSubtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-500 dark:text-slate-400">
                      <span>Estimated Tax (8%):</span>
                      <span className="font-mono text-slate-800 dark:text-slate-200">
                        ${cartTax.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-white/10">
                      <span>Total Billing Amount:</span>
                      <span className="font-mono text-base text-emerald-600 dark:text-emerald-400">
                        ${cartTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-2 rounded-lg bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-500/20 text-[10px] text-purple-700 dark:text-purple-300/80">
                    <ShieldCheck className="w-4 h-4 text-purple-500 flex-shrink-0" />
                    <span>Store Demo: Real-time tax & subtotal calculation. Instant simulated checkout.</span>
                  </div>

                  <button
                    onClick={handleSimulateCheckout}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-sm shadow-lg shadow-purple-900/40 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01]"
                  >
                    <span>Proceed to Simulated Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
