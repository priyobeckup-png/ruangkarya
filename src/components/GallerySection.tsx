import React, { useEffect, useState } from 'react';
import { Camera, Eye, X, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { GALLERY_ITEMS, galleryThumb } from '../data/gallery';

// Jumlah foto yang ditampilkan pertama kali. Sisanya dimuat bertahap
// supaya halaman tetap ringan di HP dan pengunjung terpancing membuka lebih banyak.
const INITIAL_VISIBLE = 8;
const LOAD_STEP = 8;

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_VISIBLE);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  // Hanya tampilkan kategori yang benar-benar punya foto, supaya tidak ada filter kosong.
  const categories = ['Semua', ...Array.from(new Set(GALLERY_ITEMS.map(item => item.category)))];

  const filteredItems = selectedCategory === 'Semua'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === selectedCategory);

  const visibleItems = filteredItems.slice(0, visibleCount);
  const remaining = filteredItems.length - visibleItems.length;

  // Ganti kategori saat lightbox terbuka bisa membuat index menunjuk item yang
  // sudah tidak ada, jadi lightbox ditutup dan jumlah tampilan direset.
  const handleCategoryChange = (cat: string) => {
    setActiveLightboxIndex(null);
    setVisibleCount(INITIAL_VISIBLE);
    setSelectedCategory(cat);
  };

  const handleLoadMore = () => {
    setVisibleCount(count => Math.min(count + LOAD_STEP, filteredItems.length));
  };

  const openLightbox = (index: number) => setActiveLightboxIndex(index);
  const closeLightbox = () => setActiveLightboxIndex(null);

  // Lightbox menelusuri SELURUH foto kategori aktif, bukan hanya yang sudah dimuat,
  // supaya pengunjung bisa terus menggeser tanpa menutup lightbox.
  const nextImage = () => {
    setActiveLightboxIndex(index =>
      index === null ? null : (index + 1) % filteredItems.length
    );
  };

  const prevImage = () => {
    setActiveLightboxIndex(index =>
      index === null ? null : (index - 1 + filteredItems.length) % filteredItems.length
    );
  };

  useEffect(() => {
    if (activeLightboxIndex === null) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowRight') nextImage();
      if (event.key === 'ArrowLeft') prevImage();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [activeLightboxIndex, filteredItems.length]);

  const activeItem = activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : null;

  return (
    <section id="galeri-section" className="py-16 bg-[#faf7f2] border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5" />
            <span>Dokumentasi Produksi</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 tracking-tight">
            {GALLERY_ITEMS.length} Desain Hasil Cetak
          </h2>
          <p className="text-sm sm:text-base text-stone-600">
            Foto asli hasil cetak RuangKarya. Pilih kategori untuk melihat contoh undangan pernikahan, sunatan, aqiqah, ulang tahun, dan event.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-full border transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-stone-900 border-stone-900 text-white shadow-xs'
                  : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
              }`}
            >
              {cat}{cat !== 'Semua' && <span className="ml-1 opacity-70">({GALLERY_ITEMS.filter(item => item.category === cat).length})</span>}
            </button>
          ))}
        </div>

        {filteredItems.length === 0 ? (
          <div className="max-w-md mx-auto text-center bg-white rounded-2xl border border-stone-200 p-8">
            <Camera className="w-8 h-8 text-stone-400 mx-auto mb-3" />
            <h3 className="font-bold text-stone-900">Belum ada foto di kategori ini</h3>
            <p className="text-xs text-stone-500 mt-1">Pilih kategori lain untuk melihat koleksi yang tersedia.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
              {visibleItems.map((item, index) => {
                const isTeaser = remaining > 0 && index === visibleItems.length - 1;

                return (
                  <div
                    key={item.id}
                    onClick={() => (isTeaser ? handleLoadMore() : openLightbox(index))}
                    className="group relative rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 aspect-[4/5] cursor-pointer shadow-xs hover:shadow-md transition-all"
                  >
                    <img
                      src={galleryThumb(item.imageUrl)}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      width={520}
                      height={650}
                      className={`w-full h-full object-cover transition-transform duration-300 ${
                        isTeaser ? 'scale-105 blur-[2px] brightness-50' : 'group-hover:scale-105'
                      }`}
                    />

                    {isTeaser ? (
                      /* Kartu terakhir jadi pemancing rasa penasaran, bukan tombol polos */
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-3">
                        <div className="w-11 h-11 rounded-full bg-white/15 border border-white/40 flex items-center justify-center mb-2 group-hover:bg-white/25 transition">
                          <Plus className="w-6 h-6" />
                        </div>
                        <div className="font-serif text-2xl font-bold leading-none">+{remaining}</div>
                        <div className="text-[11px] font-semibold text-emerald-200 mt-1.5 leading-tight">
                          desain lagi di kategori ini
                        </div>
                      </div>
                    ) : (
                      <>
                        {/* Overlay hover desktop */}
                        <div className="hidden sm:flex absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-3.5 flex-col justify-end text-white">
                          <div className="text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
                            {item.category}
                          </div>
                          <h4 className="text-sm font-bold line-clamp-2 mt-0.5">{item.title}</h4>
                          <div className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-emerald-300">
                            <Eye className="w-3.5 h-3.5" />
                            <span>Lihat Detail</span>
                          </div>
                        </div>

                        {/* Label permanen di mobile */}
                        <div className="sm:hidden absolute bottom-0 left-0 right-0 bg-gradient-to-t from-stone-950/90 to-transparent text-white px-2.5 pb-2 pt-6">
                          <div className="text-[11px] font-bold truncate">{item.title}</div>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Penghitung + tombol muat lagi */}
            <div className="mt-7 text-center space-y-3">
              <p className="text-xs text-stone-500 font-medium">
                Menampilkan {visibleItems.length} dari {filteredItems.length} desain
                {selectedCategory !== 'Semua' && ` • ${selectedCategory}`}
              </p>
              {remaining > 0 && (
                <button
                  type="button"
                  onClick={handleLoadMore}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-stone-300 hover:border-emerald-500 hover:bg-emerald-50 text-stone-800 text-sm font-bold transition min-h-[48px]"
                >
                  <Plus className="w-4 h-4" />
                  Muat {Math.min(LOAD_STEP, remaining)} Desain Lagi
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div
          id="gallery-lightbox-modal"
          className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            aria-label="Tutup galeri"
            className="absolute top-4 right-4 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          >
            <X className="w-6 h-6" />
          </button>

          {filteredItems.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                aria-label="Gambar sebelumnya"
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                aria-label="Gambar berikutnya"
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          <div
            className="max-w-4xl max-h-[85vh] flex flex-col items-center justify-center text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeItem.imageUrl}
              alt={activeItem.title}
              className="max-h-[66vh] max-w-full rounded-xl object-contain shadow-2xl border border-stone-800"
            />
            <div className="mt-4 text-center max-w-xl">
              <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">
                {activeItem.category}
              </span>
              <h3 className="text-base sm:text-lg font-bold mt-1">{activeItem.title}</h3>
              {activeItem.description && (
                <p className="text-xs sm:text-sm text-stone-300 mt-1 leading-relaxed">
                  {activeItem.description}
                </p>
              )}
              <p className="text-[11px] text-stone-500 mt-2">
                {(activeLightboxIndex ?? 0) + 1} dari {filteredItems.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
