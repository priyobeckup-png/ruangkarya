import React, { useEffect, useState } from 'react';
import { ArrowRight, MessageCircle, Sparkles, CheckCircle } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';
import { getWhatsAppUrl } from '../utils/whatsapp';
import { resolveAssetUrl } from '../utils/assets';

interface HeroProps {
  onExploreCatalog: () => void;
  onOpenCalculator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCatalog, onOpenCalculator }) => {
  const heroSlides = [
    '2518.jpg',
    '2409.jpg',
    '2322.jpg',
    '2202.jpg',
    '88164.jpg',
  ].map((filename) => resolveAssetUrl(`images/hero/${filename.replace('.jpg', '.webp')}`));
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveHeroSlide((index) => (index + 1) % heroSlides.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [heroSlides.length]);

  const directWhatsAppUrl = getWhatsAppUrl(
    `Halo Admin ${SITE_CONFIG.brandName}, saya tertarik untuk memesan kebutuhan cetak acara saya. Boleh minta rekomendasi katalog?`
  );

  return (
    <section
      id="hero-section"
      className="relative pt-28 pb-14 sm:pt-36 sm:pb-20 md:pt-40 md:pb-24 overflow-hidden bg-gradient-to-b from-[#f4efe5] via-[#f7f5ef] to-[#f3efe6] border-b border-stone-200/70"
    >
      {/* Radiant Background Accents: Gold & Emerald Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden">
        <div className="absolute top-12 -right-20 w-96 h-96 rounded-full bg-emerald-300/25 blur-3xl" />
        <div className="absolute top-28 -left-20 w-96 h-96 rounded-full bg-amber-300/30 blur-3xl" />
        <div className="absolute bottom-10 left-1/3 w-80 h-80 rounded-full bg-teal-200/20 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left">
            
            {/* Top Micro-Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300/70 text-emerald-900 text-xs sm:text-sm font-bold tracking-wide shadow-xs">
                <Sparkles className="w-4 h-4 text-emerald-600 fill-emerald-500/20" />
                <span>Percetakan Undangan & Souvenir</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight leading-[1.15]">
              Cetak Momen <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-emerald-800 via-teal-700 to-emerald-900 bg-clip-text text-transparent relative inline-block">
                Istimewa Anda
                {/* Decorative underline */}
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-amber-400/80"
                  viewBox="0 0 200 12"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path d="M2 9C50 2 150 2 198 9" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-sm sm:text-base md:text-lg text-stone-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Undangan, souvenir, dan kebutuhan cetak untuk berbagai momen spesial dengan desain menarik, pilihan bahan, dan proses pemesanan yang mudah langsung via <span className="font-semibold text-emerald-800">WhatsApp</span>.
            </p>

            {/* Action Buttons: Highly visible & mobile-friendly */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                id="hero-cta-catalog-btn"
                onClick={onExploreCatalog}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-bold text-white bg-gradient-to-r from-stone-900 via-stone-900 to-stone-800 hover:from-emerald-900 hover:to-teal-900 active:scale-98 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer min-h-[48px]"
              >
                <span>Lihat Katalog Produk</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                id="hero-cta-wa-btn"
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 active:scale-98 rounded-xl shadow-md hover:shadow-emerald-600/30 transition-all duration-200 min-h-[48px]"
              >
                <MessageCircle className="w-5 h-5 fill-white/20" />
                <span>Pesan via WhatsApp</span>
              </a>

              <button
                id="hero-cta-calc-btn"
                onClick={onOpenCalculator}
                className="inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200/80 py-3 px-4 rounded-xl transition cursor-pointer min-h-[48px]"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Hitung Estimasi Biaya</span>
              </button>
            </div>

            {/* Simple facts from current catalog data */}
            <div className="pt-5 sm:pt-6 border-t border-stone-200/80 grid grid-cols-3 gap-2 sm:gap-4 text-center">
              <div className="p-2 rounded-xl bg-white/60">
                <div className="text-base sm:text-lg font-extrabold text-stone-900">65</div>
                <div className="text-[10px] sm:text-[11px] text-stone-500">Produk katalog</div>
              </div>
              <div className="p-2 rounded-xl bg-white/60">
                <div className="text-base sm:text-lg font-extrabold text-stone-900">66</div>
                <div className="text-[10px] sm:text-[11px] text-stone-500">Foto galeri</div>
              </div>
              <div className="p-2 rounded-xl bg-white/60">
                <div className="text-base sm:text-lg font-extrabold text-stone-900">WA</div>
                <div className="text-[10px] sm:text-[11px] text-stone-500">Konsultasi & order</div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Product Showcase Card with Floating Chips */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Glow Ring */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-emerald-500 to-amber-400 rounded-3xl blur-md opacity-30 group-hover:opacity-100 transition duration-1000"></div>

              {/* Main Visual Card */}
              <div className="relative rounded-2xl sm:rounded-3xl bg-white p-3 sm:p-4 shadow-xl border border-stone-200/90">
                <div className="relative h-64 sm:h-80 md:h-96 rounded-xl sm:rounded-2xl overflow-hidden bg-stone-100 shadow-inner">
                  {heroSlides.map((src, index) => (
                    <img
                      key={src}
                      src={src}
                      alt={`Contoh hasil cetak RuangKarya ${index + 1}`}
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                        activeHeroSlide === index ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.02]'
                      }`}
                      loading={index === 0 ? 'eager' : 'lazy'}
                    />
                  ))}
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/25 to-transparent" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md border border-amber-300/80 flex items-center gap-1.5 text-xs font-bold text-stone-900">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                    <span>Contoh desain & hasil cetak</span>
                  </div>

                  {/* Bottom Content Card on Image */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 sm:p-4 rounded-xl bg-white/95 backdrop-blur-md border border-stone-200 shadow-lg flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1 text-emerald-800 text-xs font-bold">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
                        <span>Koleksi Terbaru</span>
                      </div>
                      <div className="text-xs sm:text-sm font-extrabold text-stone-900 mt-0.5">
                        65 Produk di Katalog
                      </div>
                    </div>

                    <button
                      onClick={onExploreCatalog}
                      className="shrink-0 px-3 py-1.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs cursor-pointer transition"
                    >
                      Buka
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
