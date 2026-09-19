import React from 'react';
import { Tag, Sparkles, ArrowRight, MessageCircle } from 'lucide-react';
import { PromoItem } from '../types';
import { SITE_CONFIG } from '../data/siteConfig';
import { getWhatsAppUrl } from '../utils/whatsapp';

interface PromoBannerProps {
  promos: PromoItem[];
  onSelectCategory?: (categoryName: string) => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ promos, onSelectCategory }) => {
  if (!promos || promos.length === 0) return null;

  return (
    <section id="promo-section" className="py-8 bg-[#f3efe6] border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          
          {/* Main Featured Promo Card */}
          {promos.slice(0, 1).map((promo) => {
            const promoWhatsAppUrl = getWhatsAppUrl(
              `Halo Admin ${SITE_CONFIG.brandName}, saya ingin klaim promo: "${promo.title}" (Kode: ${promo.code || '-'}). Boleh minta info ketentuannya?`
            );

            return (
              <div
                key={promo.id}
                id="promo-highlight-banner"
                className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-900 via-stone-900 to-emerald-950 text-white p-6 sm:p-8 shadow-md"
              >
                {/* Decorative background circle */}
                <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-emerald-500/15 blur-2xl pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="space-y-2 max-w-2xl">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{promo.badge}</span>
                      <span className="mx-1">•</span>
                      <span>{promo.discountText}</span>
                    </div>

                    <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-white tracking-tight">
                      {promo.title}
                    </h2>

                    <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
                      {promo.description}
                    </p>

                    <div className="text-xs text-stone-400 pt-1">
                      Berlaku: <span className="text-emerald-300 font-medium">{promo.validUntil}</span>
                      {promo.code && (
                        <span className="ml-3 inline-block bg-stone-800/80 px-2 py-0.5 rounded border border-stone-700 font-mono text-stone-200">
                          Kode: {promo.code}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                    {promo.targetCategory && onSelectCategory && (
                      <button
                        onClick={() => onSelectCategory(promo.targetCategory!)}
                        className="px-4 py-2.5 text-sm font-semibold rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition cursor-pointer text-center"
                      >
                        Lihat Produk Promo
                      </button>
                    )}

                    <a
                      href={promoWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-stone-950 shadow transition text-center"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{promo.actionText}</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Secondary Mini Promo Highlights (if more exist) */}
          {promos.length > 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              {promos.slice(1).map((promo) => {
                const subPromoWhatsApp = getWhatsAppUrl(
                  `Halo Admin ${SITE_CONFIG.brandName}, saya ingin tanya promo: "${promo.title}".`
                );

                return (
                  <div
                    key={promo.id}
                    className="p-4 sm:p-5 rounded-xl bg-white border border-stone-200 flex items-start justify-between gap-4 hover:border-emerald-300 transition"
                  >
                    <div className="space-y-1">
                      <div className="inline-block text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                        {promo.badge}
                      </div>
                      <div className="font-bold text-stone-900 text-sm sm:text-base">
                        {promo.title}
                      </div>
                      <p className="text-xs text-stone-500 line-clamp-2">
                        {promo.subtitle}
                      </p>
                    </div>

                    <a
                      href={subPromoWhatsApp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 p-2.5 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition"
                      aria-label={promo.actionText}
                      title={promo.actionText}
                    >
                      <MessageCircle className="w-5 h-5" />
                    </a>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </div>
    </section>
  );
};
