import React from 'react';
import { 
  HeartHandshake, 
  Sparkles, 
  Baby, 
  PartyPopper, 
  CalendarDays, 
  Gift, 
  Printer, 
  ArrowRight 
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { ProductCategory } from '../types';

interface CategorySectionProps {
  onSelectCategory: (category: ProductCategory) => void;
  productCountsByCategory?: Record<string, number>;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  onSelectCategory,
  productCountsByCategory = {},
}) => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6" />;
      case 'Baby':
        return <Baby className="w-6 h-6" />;
      case 'PartyPopper':
        return <PartyPopper className="w-6 h-6" />;
      case 'CalendarDays':
        return <CalendarDays className="w-6 h-6" />;
      case 'Gift':
        return <Gift className="w-6 h-6" />;
      case 'Printer':
      default:
        return <Printer className="w-6 h-6" />;
    }
  };

  // Color mapping per category for high visual appeal
  const categoryThemeStyles: Record<string, { badge: string; cardHover: string; iconBg: string; textHighlight: string }> = {
    'Undangan Pernikahan': {
      badge: 'bg-rose-100 text-rose-800 border-rose-200',
      cardHover: 'hover:border-rose-300 hover:shadow-rose-100/50',
      iconBg: 'bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-rose-200',
      textHighlight: 'group-hover:text-rose-700',
    },
    'Undangan Sunatan': {
      badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      cardHover: 'hover:border-emerald-300 hover:shadow-emerald-100/50',
      iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-emerald-200',
      textHighlight: 'group-hover:text-emerald-700',
    },
    'Undangan Aqiqah': {
      badge: 'bg-sky-100 text-sky-800 border-sky-200',
      cardHover: 'hover:border-sky-300 hover:shadow-sky-100/50',
      iconBg: 'bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-sky-200',
      textHighlight: 'group-hover:text-sky-700',
    },
    'Undangan Ulang Tahun': {
      badge: 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200',
      cardHover: 'hover:border-fuchsia-300 hover:shadow-fuchsia-100/50',
      iconBg: 'bg-gradient-to-br from-fuchsia-500 to-pink-600 text-white shadow-fuchsia-200',
      textHighlight: 'group-hover:text-fuchsia-700',
    },
    'Undangan Event': {
      badge: 'bg-blue-100 text-blue-800 border-blue-200',
      cardHover: 'hover:border-blue-300 hover:shadow-blue-100/50',
      iconBg: 'bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-blue-200',
      textHighlight: 'group-hover:text-blue-700',
    },
    'Souvenir': {
      badge: 'bg-amber-100 text-amber-800 border-amber-200',
      cardHover: 'hover:border-amber-300 hover:shadow-amber-100/50',
      iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-amber-200',
      textHighlight: 'group-hover:text-amber-700',
    },
    'Cetak Lainnya': {
      badge: 'bg-teal-100 text-teal-800 border-teal-200',
      cardHover: 'hover:border-teal-300 hover:shadow-teal-100/50',
      iconBg: 'bg-gradient-to-br from-teal-600 to-emerald-700 text-white shadow-teal-200',
      textHighlight: 'group-hover:text-teal-700',
    },
  };

  return (
    <section id="kategori-section" className="py-12 sm:py-16 bg-[#faf7f2] border-y border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Pilihan Kategori Lengkap</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight">
            Kebutuhan Cetak Sesuai Acara
          </h2>
          <p className="text-xs sm:text-base text-stone-600">
            Temukan model undangan dan souvenir sesuai tema perayaan Anda dengan desain terbaik dan harga bersahabat.
          </p>
        </div>

        {/* Mobile Quick Category Swipe Horizontal Track (visible on small screens) */}
        <div className="sm:hidden mb-6 overflow-x-auto pb-2 -mx-4 px-4 flex gap-2.5 no-scrollbar scroll-smooth">
          {CATEGORIES.map((cat) => {
            const theme = categoryThemeStyles[cat.id] || {
              badge: 'bg-stone-100 text-stone-800',
              iconBg: 'bg-emerald-600 text-white',
            };
            return (
              <button
                key={`mobile-chip-${cat.id}`}
                onClick={() => onSelectCategory(cat.id)}
                className="shrink-0 flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 active:bg-emerald-50 active:border-emerald-300 text-xs font-bold text-stone-800 shadow-2xs"
              >
                <div className={`w-6 h-6 rounded-lg ${theme.iconBg} flex items-center justify-center text-[10px]`}>
                  {cat.title.slice(0, 1)}
                </div>
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map((cat, index) => {
            const count = productCountsByCategory[cat.id];
            const theme = categoryThemeStyles[cat.id] || {
              badge: 'bg-stone-100 text-stone-800 border-stone-200',
              cardHover: 'hover:border-emerald-300',
              iconBg: 'bg-emerald-600 text-white',
              textHighlight: 'group-hover:text-emerald-700',
            };

            return (
              <button
                key={cat.id}
                id={`category-card-${index}`}
                onClick={() => onSelectCategory(cat.id)}
                className={`group text-left p-4 sm:p-5 rounded-2xl border border-stone-200/90 bg-stone-50/50 hover:bg-white ${theme.cardHover} hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className={`p-3 rounded-2xl ${theme.iconBg} shadow-md transition-transform duration-200 group-hover:scale-110`}>
                      {getCategoryIcon(cat.iconName)}
                    </div>
                    {typeof count === 'number' && (
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${theme.badge}`}>
                        {count} Produk
                      </span>
                    )}
                  </div>

                  <h3 className={`text-base sm:text-lg font-bold text-stone-900 ${theme.textHighlight} transition-colors`}>
                    {cat.title}
                  </h3>
                  
                  <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                    {cat.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-200/70 flex items-center justify-between text-xs font-bold text-emerald-800 group-hover:text-emerald-950">
                  <span>Buka Koleksi Desain</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform text-emerald-600" />
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
