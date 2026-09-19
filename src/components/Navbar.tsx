import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle, Phone, Sparkles, Tag } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';
import { getWhatsAppUrl } from '../utils/whatsapp';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, activeSection = 'home' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'kategori', label: 'Kategori' },
    { id: 'katalog', label: 'Katalog' },
    { id: 'galeri', label: 'Galeri' },
    { id: 'promo', label: 'Promo' },
    { id: 'testimoni', label: 'Testimoni' },
    { id: 'cara-pesan', label: 'Cara Pesan' },
    { id: 'kalkulator', label: 'Kalkulator' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const directWhatsAppUrl = getWhatsAppUrl(
    `Halo Admin ${SITE_CONFIG.brandName}, saya ingin konsultasi pemesanan undangan / souvenir.`
  );

  return (
    <header
      id="main-navbar"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white text-[11px] sm:text-xs py-1.5 px-3 shadow-inner">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap text-amber-200">
            <span className="inline-flex items-center gap-1 bg-amber-400/20 text-amber-300 font-bold px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider border border-amber-400/30">
              <Tag className="w-3 h-3" />
              Promo
            </span>
            <span className="text-white font-medium truncate">
              Cek promo & bonus terbaru di bagian Promo • Detail penawaran dikonfirmasi via WhatsApp
            </span>
          </div>

          <div className="hidden md:flex items-center gap-3 shrink-0 text-emerald-100 font-medium">
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3 text-amber-300" />
              <span>{SITE_CONFIG.phoneDisplay}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar Bar */}
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-[#faf8f4]/95 backdrop-blur-md shadow-md border-b border-stone-200/90 py-2.5'
            : 'bg-[#faf8f4]/90 backdrop-blur-md border-b border-stone-200/60 py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Tagline */}
          <button
            id="brand-logo-btn"
            onClick={() => handleNavClick('home')}
            className="text-left group flex items-center gap-3 cursor-pointer focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-700 via-emerald-600 to-teal-500 flex items-center justify-center text-white font-serif font-black text-xl shadow-md ring-2 ring-amber-400/40 group-hover:scale-105 transition-transform duration-200">
              RK
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-extrabold text-xl sm:text-2xl text-stone-900 tracking-tight">
                  {SITE_CONFIG.brandName}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block shadow-xs animate-pulse"></span>
              </div>
              <p className="text-[10px] sm:text-[11px] font-semibold text-emerald-800 uppercase tracking-widest hidden sm:block">
                {SITE_CONFIG.tagline}
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => handleNavClick(link.id)}
                className={`px-3 py-2 text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                  activeSection === link.id
                    ? 'text-emerald-800 bg-emerald-100/70 shadow-xs'
                    : 'text-stone-700 hover:text-emerald-700 hover:bg-emerald-50/60'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right WhatsApp Button */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              id="navbar-wa-button"
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-emerald-600 via-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 active:scale-95 rounded-xl shadow-md hover:shadow-emerald-600/25 transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4 fill-white/20" />
              <span>Pesan via WhatsApp</span>
            </a>
          </div>

          {/* Mobile Quick Action Buttons */}
          <div className="flex lg:hidden items-center gap-1.5">
            <a
              id="mobile-quick-wa-btn"
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Pesan via WhatsApp"
              className="p-2 text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-xl shadow-xs transition"
            >
              <MessageCircle className="w-5 h-5" />
            </a>

            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
              className="p-2 text-stone-700 hover:text-stone-900 rounded-xl hover:bg-stone-100 focus:outline-none transition"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-drawer"
            className="lg:hidden border-t border-stone-200 bg-[#faf8f4] px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-2 duration-200"
          >
            <div className="grid grid-cols-2 gap-2 pb-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  id={`mobile-nav-link-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left px-3 py-2.5 text-sm font-semibold rounded-xl cursor-pointer transition-colors ${
                    activeSection === link.id
                      ? 'text-emerald-800 bg-emerald-100/70 border border-emerald-200'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-stone-100 space-y-2">
              <a
                id="mobile-drawer-wa-cta"
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 rounded-xl shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Pesan via WhatsApp ({SITE_CONFIG.phoneDisplay})</span>
              </a>

              <p className="text-center text-[11px] text-stone-500 pt-1">
                Fast Response • Konsultasi Gratis Desain
              </p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
