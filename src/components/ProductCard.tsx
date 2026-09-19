import React from 'react';
import { Eye, MessageCircle, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { formatRupiah } from '../utils/calculator';
import { resolveThumbUrl } from '../utils/assets';

interface ProductCardProps {
  product: Product;
  onViewDetail: (product: Product) => void;
  onOrder: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetail,
  onOrder,
}) => {
  const primaryImage = resolveThumbUrl(product.images[0] || 'images/hero/2518.webp');
  const unitSuffix = product.priceType === 'paket' ? ' / pkt' : ' / pcs';

  return (
    <div
      id={`product-card-${product.code}`}
      className="group bg-white rounded-2xl border border-stone-200/90 hover:border-emerald-400 hover:shadow-lg transition-all duration-200 flex flex-col overflow-hidden"
    >
      {/* Product Image Area */}
      <div 
        className="relative aspect-[4/3] bg-stone-100 overflow-hidden cursor-pointer" 
        onClick={() => onViewDetail(product)}
      >
        <img
          src={primaryImage}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badge Overlay: Promo or Unggulan */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 items-start">
          {product.promo?.badgeText ? (
            <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-extrabold px-2 py-0.5 rounded-lg bg-gradient-to-r from-rose-600 to-amber-600 text-white shadow-xs">
              <Sparkles className="w-3 h-3" />
              {product.promo.badgeText}
            </span>
          ) : product.featured ? (
            <span className="text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-lg bg-gradient-to-r from-emerald-800 to-teal-800 text-white shadow-xs">
              UNGGULAN
            </span>
          ) : null}
        </div>

        {/* Rating Pill and Code */}
        <div className="absolute top-2 right-2 flex items-center gap-1">
          <div className="bg-white/95 backdrop-blur-xs text-emerald-900 text-[10px] sm:text-[11px] font-bold px-1.5 py-0.5 rounded-md shadow-xs border border-emerald-200/60">
            {product.price > 0 ? 'Harga tersedia' : 'Harga via WA'}
          </div>
          <div className="hidden sm:inline-block bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded-md shadow-xs">
            {product.code}
          </div>
        </div>
      </div>

      {/* Product Content Body */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-2.5 sm:space-y-3">
        <div>
          {/* Category & Minimum Order */}
          <div className="flex items-center justify-between text-[11px] text-stone-500 font-medium mb-1">
            <span className="text-emerald-800 font-bold truncate max-w-[60%]">
              {product.category}
            </span>
            <span className="text-stone-500 font-semibold text-[10px] sm:text-[11px] bg-stone-100 px-1.5 py-0.5 rounded">
              Min. {product.minimumOrder}
            </span>
          </div>

          {/* Product Name */}
          <h3
            onClick={() => onViewDetail(product)}
            className="text-xs sm:text-sm md:text-base font-bold text-stone-900 group-hover:text-emerald-800 transition-colors line-clamp-2 cursor-pointer leading-snug"
          >
            {product.name}
          </h3>

          {/* Short Description (hidden on mobile to save vertical height) */}
          <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed hidden md:block">
            {product.description}
          </p>
        </div>

        {/* Price & Action Buttons */}
        <div className="pt-2 border-t border-stone-100 space-y-2">
          {/* Price Tag */}
          <div>
            {product.price > 0 ? (
              <>
                <span className="text-[10px] sm:text-[11px] text-stone-500 block font-normal leading-tight">
                  Mulai dari
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-sm sm:text-base md:text-lg font-black text-emerald-800 tracking-tight">
                    {formatRupiah(product.price)}
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-medium text-stone-500">
                    {unitSuffix}
                  </span>
                </div>
              </>
            ) : (
              <>
                <span className="text-[10px] sm:text-[11px] text-stone-500 block font-normal leading-tight">
                  Harga
                </span>
                <span className="text-sm sm:text-base md:text-lg font-black text-amber-700 tracking-tight">
                  Menyusul
                </span>
              </>
            )}
          </div>

          {/* Two Action Buttons with minimum 44px touch targets on mobile */}
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
            <button
              id={`btn-detail-${product.code}`}
              onClick={() => onViewDetail(product)}
              className="w-full inline-flex items-center justify-center gap-1 py-2 px-2 text-xs font-bold text-stone-700 bg-stone-100 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-200 active:bg-stone-200 border border-stone-200/80 rounded-xl transition cursor-pointer min-h-[44px]"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Detail</span>
            </button>

            <button
              id={`btn-order-${product.code}`}
              onClick={() => onOrder(product)}
              className="w-full inline-flex items-center justify-center gap-1 py-2 px-2 text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 active:scale-95 rounded-xl shadow-xs transition cursor-pointer min-h-[44px]"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white/20" />
              <span>Pesan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
