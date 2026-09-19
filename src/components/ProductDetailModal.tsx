import React, { useState, useEffect } from 'react';
import { X, MessageCircle, ShieldCheck, Check, Info, Sparkles, Heart } from 'lucide-react';
import { Product } from '../types';
import { resolveAssetUrl } from '../utils/assets';
import { formatRupiah } from '../utils/calculator';
import { SITE_CONFIG } from '../data/siteConfig';
import { getWhatsAppUrl } from '../utils/whatsapp';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onOrderProduct: (product: Product, selectedVariants: Record<string, string>) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onOrderProduct,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});

  // Reset image and default variants when product changes
  useEffect(() => {
    if (product) {
      setSelectedImageIndex(0);
      const defaults: Record<string, string> = {};
      if (product.variants) {
        product.variants.forEach((v) => {
          if (v.options.length > 0) {
            defaults[v.name] = v.options[0];
          }
        });
      }
      setSelectedVariants(defaults);
    }
  }, [product]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const currentImage = resolveAssetUrl(product.images[selectedImageIndex] || product.images[0]);
  const unitSuffix = product.priceType === 'paket' ? ' / paket' : ' / pcs';

  const directInquiryUrl = getWhatsAppUrl(
    `Halo Admin ${SITE_CONFIG.brandName}, saya ingin bertanya mengenai detail produk: "${product.name}" (Kode: ${product.code}).`
  );

  return (
    <div
      id="product-detail-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="product-detail-modal-container"
        className="relative bg-[#faf8f4] w-full max-w-4xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-stone-200/90 flex flex-col max-h-[92vh]"
      >
        {/* Modal Close Button */}
        <button
          id="close-product-detail-btn"
          onClick={onClose}
          aria-label="Tutup detail produk"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-stone-950 shadow-md flex items-center justify-center transition focus:outline-none"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
            
            {/* Left Column: Image Gallery */}
            <div className="md:col-span-6 space-y-3">
              {/* Big Main Image */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shadow-inner">
                <img
                  src={currentImage}
                  alt={product.name}
                  className="w-full h-full object-cover transition-opacity duration-300"
                />

                {/* Badge Overlay */}
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  {product.promo?.badgeText && (
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-rose-600 text-white shadow-sm flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      {product.promo.badgeText}
                    </span>
                  )}
                  {product.featured && !product.promo?.badgeText && (
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-stone-900 text-white shadow-sm">
                      UNGGULAN
                    </span>
                  )}
                </div>

                <div className="absolute top-3 right-3 bg-white/95 text-stone-900 text-xs font-mono font-bold px-2.5 py-1 rounded-md shadow border border-stone-200">
                  {product.code}
                </div>
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition shrink-0 cursor-pointer ${
                        selectedImageIndex === idx
                          ? 'border-emerald-600 ring-2 ring-emerald-500/20'
                          : 'border-stone-200 hover:border-stone-400 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Trust Box */}
              <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-200/80 space-y-2 text-xs text-stone-600">
                <div className="flex items-center gap-2 font-semibold text-stone-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Proses Cetak Dicek Bersama Sebelum Produksi</span>
                </div>
                <p className="text-[11px] leading-relaxed text-stone-500">
                  Draft desain dikirimkan untuk dicek dan disetujui (ACC) sebelum masuk proses cetak. Detail bahan, warna, dan hasil akhir dapat dikonsultasikan lebih dulu via WhatsApp.
                </p>
              </div>
            </div>

            {/* Right Column: Information, Variants & Actions */}
            <div className="md:col-span-6 flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                
                {/* Header Info */}
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {product.category}
                    </span>
                    <span className="text-xs text-stone-500 font-mono">
                      Kode: <strong>{product.code}</strong>
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 tracking-tight leading-snug">
                    {product.name}
                  </h2>
                </div>

                {/* Price Display */}
                <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/60 flex items-center justify-between">
                  <div>
                    {product.price > 0 ? (
                      <>
                        <span className="text-xs text-stone-500 block">Harga Mulai dari:</span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl sm:text-3xl font-bold text-emerald-800 font-serif">
                            {formatRupiah(product.price)}
                          </span>
                          <span className="text-xs font-medium text-stone-600">{unitSuffix}</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <span className="text-xs text-stone-500 block">Harga:</span>
                        <span className="text-2xl sm:text-3xl font-bold text-amber-700 font-serif">
                          Menyusul
                        </span>
                      </>
                    )}
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] text-stone-500 block">Minimal Pemesanan:</span>
                    <span className="text-sm font-bold text-stone-800 bg-white px-2.5 py-1 rounded-lg border border-stone-200 inline-block">
                      {product.minimumOrder} pcs
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Deskripsi Produk
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Variants Selection (if any) */}
                {product.variants && product.variants.length > 0 && (
                  <div className="space-y-3 pt-2 border-t border-stone-100">
                    {product.variants.map((v) => (
                      <div key={v.name} className="space-y-1.5">
                        <label className="text-xs font-bold text-stone-800 block">
                          {v.name}:
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {v.options.map((opt) => {
                            const isSelected = selectedVariants[v.name] === opt;
                            return (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => setSelectedVariants({ ...selectedVariants, [v.name]: opt })}
                                className={`text-xs px-3 py-1.5 rounded-lg border transition cursor-pointer flex items-center gap-1.5 ${
                                  isSelected
                                    ? 'bg-emerald-700 border-emerald-700 text-white font-semibold shadow-xs'
                                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                                }`}
                              >
                                {isSelected && <Check className="w-3 h-3" />}
                                <span>{opt}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Specifications Table */}
                {product.specifications && product.specifications.length > 0 && (
                  <div className="pt-2 border-t border-stone-100 space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                      Spesifikasi Detail
                    </h4>
                    <div className="rounded-xl border border-stone-200 divide-y divide-stone-100 text-xs overflow-hidden">
                      {product.specifications.map((spec, i) => (
                        <div key={i} className="grid grid-cols-3 py-2 px-3 bg-white even:bg-stone-50/50">
                          <span className="font-medium text-stone-500">{spec.label}</span>
                          <span className="col-span-2 text-stone-800 font-medium">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-stone-200 space-y-2.5">
                <button
                  id="modal-order-this-product-btn"
                  onClick={() => onOrderProduct(product, selectedVariants)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-sm sm:text-base font-bold shadow-md hover:shadow-lg transition cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Pesan Produk Ini</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={directInquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold transition"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>Tanya Spesifikasi</span>
                  </a>

                  <button
                    onClick={onClose}
                    className="py-2.5 px-3 rounded-xl border border-stone-200 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition cursor-pointer"
                  >
                    Tutup
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
