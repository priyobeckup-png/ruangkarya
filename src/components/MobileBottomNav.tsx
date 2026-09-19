import React from 'react';
import { Home, Grid3X3, Layers, Calculator, MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';
import { getWhatsAppUrl } from '../utils/whatsapp';

interface MobileBottomNavProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeSection,
  onNavigate,
}) => {
  const directWhatsAppUrl = getWhatsAppUrl(
    `Halo Admin ${SITE_CONFIG.brandName}, saya ingin konsultasi pemesanan undangan / souvenir.`
  );

  return (
    <div
      id="mobile-bottom-navigation"
      className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#faf8f4]/95 backdrop-blur-md border-t border-stone-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-2 py-1.5"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        
        {/* 1. Home */}
        <button
          id="mobile-nav-home"
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition cursor-pointer min-w-[56px] ${
            activeSection === 'home'
              ? 'text-emerald-700 font-semibold'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Home className={`w-5 h-5 ${activeSection === 'home' ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
          <span className="text-[10px] mt-0.5 tracking-tight">Beranda</span>
        </button>

        {/* 2. Kategori */}
        <button
          id="mobile-nav-kategori"
          onClick={() => onNavigate('kategori')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition cursor-pointer min-w-[56px] ${
            activeSection === 'kategori'
              ? 'text-emerald-700 font-semibold'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Grid3X3 className={`w-5 h-5 ${activeSection === 'kategori' ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
          <span className="text-[10px] mt-0.5 tracking-tight">Kategori</span>
        </button>

        {/* 3. Katalog */}
        <button
          id="mobile-nav-katalog"
          onClick={() => onNavigate('katalog')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition cursor-pointer min-w-[56px] ${
            activeSection === 'katalog'
              ? 'text-emerald-700 font-semibold'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Layers className={`w-5 h-5 ${activeSection === 'katalog' ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
          <span className="text-[10px] mt-0.5 tracking-tight">Katalog</span>
        </button>

        {/* 4. Kalkulator */}
        <button
          id="mobile-nav-kalkulator"
          onClick={() => onNavigate('kalkulator')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition cursor-pointer min-w-[56px] ${
            activeSection === 'kalkulator'
              ? 'text-emerald-700 font-semibold'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Calculator className={`w-5 h-5 ${activeSection === 'kalkulator' ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
          <span className="text-[10px] mt-0.5 tracking-tight">Hitung</span>
        </button>

        {/* 5. Direct WhatsApp Chat Button */}
        <a
          id="mobile-nav-wa-cta"
          href={directWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 px-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl shadow-md active:scale-95 transition min-w-[62px]"
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5 stroke-[2.2]" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full ring-1 ring-white animate-pulse" />
          </div>
          <span className="text-[10px] font-bold mt-0.5 tracking-tight">Chat WA</span>
        </a>

      </div>
    </div>
  );
};
