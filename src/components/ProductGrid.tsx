import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X, ArrowUpDown, Tag, Sparkles } from 'lucide-react';
import { Product, ProductCategory } from '../types';
import { CATEGORIES } from '../data/categories';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  selectedCategory: ProductCategory | 'Semua';
  onCategoryChange: (cat: ProductCategory | 'Semua') => void;
  onViewDetail: (product: Product) => void;
  onOrder: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  selectedCategory,
  onCategoryChange,
  onViewDetail,
  onOrder,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'populer' | 'terbaru' | 'harga-asc' | 'harga-desc'>('populer');
  const [onlyPromo, setOnlyPromo] = useState(false);
  const [onlyFeatured, setOnlyFeatured] = useState(false);

  const availableCategories = useMemo(() => CATEGORIES.filter(cat => products.some(p => p.category === cat.id)), [products]);

  // Filter & Search Logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory !== 'Semua' && p.category !== selectedCategory) {
        return false;
      }

      // Promo filter
      if (onlyPromo && !p.promo) {
        return false;
      }

      // Featured filter
      if (onlyFeatured && !p.featured) {
        return false;
      }

      // Search query (name, code, category, tags)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchName = p.name.toLowerCase().includes(query);
        const matchCode = p.code.toLowerCase().includes(query);
        const matchCat = p.category.toLowerCase().includes(query);
        const matchTags = p.tags?.some(tag => tag.toLowerCase().includes(query));
        if (!matchName && !matchCode && !matchCat && !matchTags) {
          return false;
        }
      }

      return true;
    });
  }, [products, selectedCategory, searchQuery, onlyPromo, onlyFeatured]);

  // Sorting Logic
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      // Produk tanpa harga (Menyusul) selalu diletakkan di akhir agar
      // tidak terlihat seperti produk termurah.
      case 'harga-asc':
        return list.sort((a, b) => {
          if (a.price <= 0 && b.price <= 0) return 0;
          if (a.price <= 0) return 1;
          if (b.price <= 0) return -1;
          return a.price - b.price;
        });
      case 'harga-desc':
        return list.sort((a, b) => {
          if (a.price <= 0 && b.price <= 0) return 0;
          if (a.price <= 0) return 1;
          if (b.price <= 0) return -1;
          return b.price - a.price;
        });
      case 'terbaru':
        return list.sort((a, b) => Number(b.id) - Number(a.id));
      case 'populer':
      default:
        // Featured and promo items first
        return list.sort((a, b) => {
          const scoreA = (a.featured ? 2 : 0) + (a.promo ? 1 : 0);
          const scoreB = (b.featured ? 2 : 0) + (b.promo ? 1 : 0);
          return scoreB - scoreA;
        });
    }
  }, [filteredProducts, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    onCategoryChange('Semua');
    setOnlyPromo(false);
    setOnlyFeatured(false);
    setSortBy('populer');
  };

  return (
    <section id="katalog-section" className="py-16 bg-[#f4f0e6] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="text-xs font-bold uppercase tracking-widest text-emerald-700">
            Katalog Lengkap
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 tracking-tight">
            Pilih Desain Sesuai Selera Anda
          </h2>
          <p className="text-sm sm:text-base text-stone-600">
            Koleksi model cetak modern dan elegan. Bisa custom warna, teks doa, ornamen, dan penambahan foto.
          </p>
        </div>

        {/* Search Bar & Filter Bar */}
        <div className="bg-[#faf8f4] rounded-2xl p-4 sm:p-5 shadow-xs border border-stone-200/90 mb-8 space-y-4">
          
          {/* Top Row: Search Input & Sort Dropdown */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            {/* Search Box */}
            <div className="relative w-full sm:w-80 md:w-96">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="catalog-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama (Rustic), kode (A-001)..."
                className="w-full pl-10 pr-9 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Right Side: Toggles & Sort */}
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
              {/* Quick Filters */}
              <button
                id="filter-promo-toggle"
                onClick={() => setOnlyPromo(!onlyPromo)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border transition cursor-pointer ${
                  onlyPromo
                    ? 'bg-rose-50 border-rose-300 text-rose-700'
                    : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
              >
                <Tag className="w-3.5 h-3.5" />
                <span>Promo</span>
              </button>

              <button
                id="filter-featured-toggle"
                onClick={() => setOnlyFeatured(!onlyFeatured)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border transition cursor-pointer ${
                  onlyFeatured
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                    : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Unggulan</span>
              </button>

              {/* Sort Selection */}
              <div className="flex items-center gap-1.5">
                <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
                <select
                  id="catalog-sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="py-2 pl-2 pr-7 text-xs font-medium text-stone-700 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-emerald-500"
                >
                  <option value="populer">Terpopuler</option>
                  <option value="terbaru">Terbaru</option>
                  <option value="harga-asc">Harga Terendah</option>
                  <option value="harga-desc">Harga Tertinggi</option>
                </select>
              </div>
            </div>
          </div>

          {/* Bottom Row: Category Horizontal Scroll Tabs */}
          <div className="pt-2.5 border-t border-stone-100 overflow-x-auto no-scrollbar flex items-center gap-2 pb-1">
            <button
              id="filter-cat-semua"
              onClick={() => onCategoryChange('Semua')}
              className={`px-4 py-2 text-xs font-bold rounded-full shrink-0 transition-all cursor-pointer ${
                selectedCategory === 'Semua'
                  ? 'bg-gradient-to-r from-emerald-700 to-teal-700 text-white shadow-sm'
                  : 'bg-stone-100 text-stone-700 hover:bg-emerald-50 hover:text-emerald-800'
              }`}
            >
              Semua ({products.length})
            </button>

            {availableCategories.map((cat) => (
              <button
                key={cat.id}
                id={`filter-cat-${cat.id.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => onCategoryChange(cat.id)}
                className={`px-4 py-2 text-xs font-bold rounded-full shrink-0 transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-emerald-700 to-teal-700 text-white shadow-sm'
                    : 'bg-stone-100 text-stone-700 hover:bg-emerald-50 hover:text-emerald-800'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>

        </div>

        {/* Results Info Counter */}
        <div className="flex items-center justify-between text-xs text-stone-500 mb-4 px-1">
          <div>
            Menampilkan <span className="font-bold text-stone-800">{sortedProducts.length}</span> produk
            {selectedCategory !== 'Semua' && (
              <span> dalam kategori <strong className="text-emerald-700">{selectedCategory}</strong></span>
            )}
          </div>

          {(searchQuery || selectedCategory !== 'Semua' || onlyPromo || onlyFeatured) && (
            <button
              onClick={handleResetFilters}
              className="text-emerald-700 hover:text-emerald-800 font-medium underline underline-offset-2 cursor-pointer"
            >
              Reset Filter
            </button>
          )}
        </div>

        {/* Product Grid: 2 columns on mobile, 3 on tablet, 4 on desktop */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.code}
                product={product}
                onViewDetail={onViewDetail}
                onOrder={onOrder}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-2xl p-10 text-center max-w-md mx-auto border border-stone-200 my-8 space-y-4">
            <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-800">Tidak ada produk yang cocok</h3>
              <p className="text-xs text-stone-500 mt-1">
                Coba gunakan kata kunci pencarian yang lain atau ubah kategori filter.
              </p>
            </div>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition cursor-pointer"
            >
              Tampilkan Semua Produk
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
