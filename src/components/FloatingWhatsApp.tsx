import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';
import { getWhatsAppUrl } from '../utils/whatsapp';

export const FloatingWhatsApp: React.FC = () => {
  const [showBubble, setShowBubble] = useState(true);

  const defaultWhatsAppUrl = getWhatsAppUrl(
    `Halo Admin ${SITE_CONFIG.brandName}, saya ingin tanya seputar cetak undangan & souvenir.`
  );

  return (
    <div id="floating-whatsapp-container" className="hidden sm:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-2">
      
      {/* Help Bubble (Optional dismissible) */}
      {showBubble && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-stone-800 text-xs px-3.5 py-2 rounded-2xl shadow-lg border border-stone-200 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
          <span>Admin RuangKarya siap membantu Anda</span>
          <button
            onClick={() => setShowBubble(false)}
            aria-label="Tutup notifikasi"
            className="text-stone-400 hover:text-stone-600 ml-1 p-0.5"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Main Floating Button */}
      <a
        id="floating-whatsapp-button"
        href={defaultWhatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat Admin via WhatsApp"
        className="group flex items-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-105"
      >
        <div className="relative flex items-center justify-center">
          <MessageCircle className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-300 rounded-full ring-2 ring-emerald-600 animate-ping"></span>
        </div>
        <span className="text-sm font-bold tracking-wide pr-1">Chat Admin</span>
      </a>

    </div>
  );
};
