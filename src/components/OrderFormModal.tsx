import React, { useState, useEffect } from 'react';
import { X, MessageCircle, AlertCircle, CheckCircle2, ShoppingBag, Calendar, User, Phone, Sparkles } from 'lucide-react';
import { Product, OrderFormData } from '../types';
import { resolveAssetUrl } from '../utils/assets';
import { SITE_CONFIG } from '../data/siteConfig';
import { buildOrderMessage, openWhatsAppChat } from '../utils/whatsapp';
import { formatRupiah, calculateEstimate } from '../utils/calculator';

interface OrderFormModalProps {
  product: Product | null;
  initialVariants?: Record<string, string>;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderFormModal: React.FC<OrderFormModalProps> = ({
  product,
  initialVariants = {},
  isOpen,
  onClose,
}) => {
  const [quantity, setQuantity] = useState<number>(100);
  const [customerName, setCustomerName] = useState('');
  const [eventType, setEventType] = useState('Pernikahan');
  const [eventDate, setEventDate] = useState('');
  const [customerWhatsApp, setCustomerWhatsApp] = useState('');
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Set default values when product opens
  useEffect(() => {
    if (product) {
      setQuantity(Math.max(product.minimumOrder || 50, 100));
      setSelectedVariants(initialVariants || {});
      setErrorMessage('');
      
      // Auto-set event type from product category
      if (product.category.includes('Pernikahan')) setEventType('Pernikahan');
      else if (product.category.includes('Sunatan')) setEventType('Sunatan / Khitanan');
      else if (product.category.includes('Aqiqah')) setEventType('Aqiqah / Tasyakuran');
      else if (product.category.includes('Ulang Tahun')) setEventType('Ulang Tahun');
      else if (product.category.includes('Event')) setEventType('Seminar / Event');
      else setEventType('Acara Spesial');
    }
  }, [product, initialVariants]);

  // ESC key support
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

  // Real-time price estimation
  const estimateResult = calculateEstimate(product.price, quantity, []);
  const hasPrice = product.price > 0;
  const estimatedTotal = estimateResult.totalEstimate;
  // Produk tanpa harga tidak boleh ditampilkan atau dikirim sebagai Rp0.
  const estimateLabel = hasPrice ? formatRupiah(estimatedTotal) : 'Menyusul';

  const handleAddOnToggle = (addonName: string) => {
    setSelectedAddOns(prev => 
      prev.includes(addonName) ? prev.filter(a => a !== addonName) : [...prev, addonName]
    );
  };

  const handleVariantChange = (variantName: string, option: string) => {
    setSelectedVariants(prev => ({
      ...prev,
      [variantName]: option,
    }));
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validations
    if (!customerName.trim()) {
      setErrorMessage('Masukkan nama Anda.');
      return;
    }
    if (!customerWhatsApp.trim()) {
      setErrorMessage('Masukkan nomor WhatsApp Anda agar admin dapat menghubungi balik.');
      return;
    }
    if (!quantity || quantity < (product.minimumOrder || 1)) {
      setErrorMessage(`Jumlah pesanan minimal ${product.minimumOrder} pcs untuk produk ini.`);
      return;
    }

    setErrorMessage('');

    const orderData: OrderFormData = {
      productName: product.name,
      productCode: product.code,
      quantity,
      customerName: customerName.trim(),
      eventType,
      eventDate: eventDate.trim(),
      customerWhatsApp: customerWhatsApp.trim(),
      selectedVariants,
      selectedAddOns,
      notes: notes.trim(),
      estimatedPrice: hasPrice ? estimatedTotal : 0,
    };

    const message = buildOrderMessage(orderData);
    openWhatsAppChat(message);
    onClose();
  };

  return (
    <div
      id="order-form-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="order-form-modal-container"
        className="relative bg-[#faf8f4] w-full max-w-2xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-stone-200/90 flex flex-col max-h-[92vh]"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-[#f5f1e8] border-b border-stone-200/90 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-tight">
                Form Pemesanan Cepat
              </h3>
              <p className="text-xs text-stone-500">
                Lengkapi data pesanan untuk terhubung ke WhatsApp Admin
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Tutup form"
            className="w-8 h-8 rounded-lg bg-stone-200/60 hover:bg-stone-300/80 text-stone-700 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Form Container */}
        <form onSubmit={handleOrderSubmit} className="flex flex-col flex-1 min-h-0">
          {/* Scrollable Modal Body */}
          <div className="overflow-y-auto p-4 sm:p-6 space-y-5 flex-1">
            
            {/* Selected Product Card Banner */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/80 flex items-center gap-3.5 shadow-2xs">
              <img
                src={resolveAssetUrl(product.images[0])}
                alt={product.name}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border border-emerald-200 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold bg-white text-stone-800 px-2 py-0.5 rounded border border-emerald-200">
                    {product.code}
                  </span>
                  <span className="text-xs text-emerald-800 font-bold truncate">
                    {product.category}
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-stone-900 truncate mt-0.5">
                  {product.name}
                </h4>
                <div className="text-xs text-stone-600 font-medium">
                  Harga: <strong className={product.price > 0 ? "text-emerald-800" : "text-amber-700"}>{product.price > 0 ? formatRupiah(product.price) : 'Menyusul'}</strong> {product.price > 0 && (product.priceType === 'paket' ? '/ paket' : '/ pcs')} • Min. {product.minimumOrder} pcs
                </div>
              </div>
            </div>

            {/* Validation Error Message */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-2 text-xs font-semibold text-rose-700 animate-shake">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}
            
            {/* Input Row 1: Jumlah Pesanan & Jenis Acara */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="text-xs font-bold text-stone-800 mb-1 flex items-center justify-between">
                  <span>Jumlah Pesanan (pcs) <span className="text-rose-500">*</span></span>
                  <span className="text-[11px] font-normal text-stone-500">Min. {product.minimumOrder} pcs</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={product.minimumOrder || 1}
                    step={10}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-full px-3 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:outline-none"
                    placeholder="Contoh: 300"
                    required
                  />
                  <div className="flex gap-1 shrink-0">
                    {[100, 300, 500].map(qty => (
                      <button
                        key={qty}
                        type="button"
                        onClick={() => setQuantity(qty)}
                        className={`text-[11px] font-medium px-2 py-2 rounded-lg border transition ${
                          quantity === qty
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-stone-100 text-stone-600 border-stone-200 hover:bg-stone-200'
                        }`}
                      >
                        {qty}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-800 mb-1 block">
                  Jenis Acara
                </label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:outline-none"
                >
                  <option value="Pernikahan">Pernikahan / Wedding</option>
                  <option value="Sunatan / Khitanan">Sunatan / Khitanan</option>
                  <option value="Aqiqah / Tasyakuran">Aqiqah / Tasyakuran</option>
                  <option value="Ulang Tahun">Ulang Tahun / Sweet 17</option>
                  <option value="Seminar / Event">Seminar / Gathering / Event</option>
                  <option value="Lainnya">Kebutuhan Cetak Lainnya</option>
                </select>
              </div>
            </div>

            {/* Input Row 2: Nama & Nomor WhatsApp */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="text-xs font-bold text-stone-800 mb-1 block">
                  Nama Lengkap Pemesan <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Contoh: Budi Santoso"
                    className="w-full pl-9 pr-3 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-800 mb-1 block">
                  Nomor WhatsApp Pemesan <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={customerWhatsApp}
                    onChange={(e) => setCustomerWhatsApp(e.target.value)}
                    placeholder="Contoh: 081234567890"
                    className="w-full pl-9 pr-3 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Tanggal Acara */}
            <div>
              <label className="text-xs font-bold text-stone-800 mb-1 block">
                Tanggal Rencana Acara
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  placeholder="Contoh: 12 Desember 2026 / Masih tentatif"
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Product Variants (if available) */}
            {product.variants && product.variants.length > 0 && (
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 space-y-3">
                <div className="text-xs font-bold text-stone-800">
                  Pilihan Varian Produk
                </div>
                {product.variants.map((v) => (
                  <div key={v.name} className="space-y-1.5">
                    <span className="text-[11px] font-semibold text-stone-600 block">{v.name}:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {v.options.map((opt) => {
                        const active = selectedVariants[v.name] === opt;
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => handleVariantChange(v.name, opt)}
                            className={`text-xs px-2.5 py-1 rounded-lg border transition ${
                              active
                                ? 'bg-emerald-700 border-emerald-700 text-white font-semibold'
                                : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Checklist Tambahan Opsi */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-800 block">
                Tambahan Opsi (Opsional)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {[
                  'Plastik OPP Pembungkus',
                  'Label Nama Tamu / Stiker',
                  'Kartu Ucapan Terima Kasih (Thanks Card)',
                  'Barcode QR Lokasi Acara',
                ].map((addon) => {
                  const checked = selectedAddOns.includes(addon);
                  return (
                    <label
                      key={addon}
                      onClick={() => handleAddOnToggle(addon)}
                      className={`flex items-center gap-2 p-2.5 rounded-xl border transition cursor-pointer select-none ${
                        checked
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-medium'
                          : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => {}}
                        className="rounded text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>{addon}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Catatan Khusus */}
            <div>
              <label className="text-xs font-bold text-stone-800 mb-1 block">
                Catatan Khusus Pemesanan
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Contoh: Warna tema biru navy dan emas, font kaligrafi halus..."
                className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            {/* Real-time Order Summary Preview as requested */}
            <div className="p-4 rounded-xl bg-stone-900 text-white space-y-2 text-xs font-mono">
              <div className="text-emerald-400 font-bold uppercase tracking-wider text-[10px] pb-1 border-b border-stone-800">
                RINGKASAN PESANAN
              </div>
              <div className="space-y-1 pt-1 text-stone-300">
                <div>Produk: <strong className="text-white">{product.name} ({product.code})</strong></div>
                <div>Jumlah: <strong className="text-white">{quantity} pcs</strong></div>
                {customerName && <div>Nama: <strong className="text-white">{customerName}</strong></div>}
                {eventDate && <div>Tanggal: <strong className="text-white">{eventDate}</strong></div>}
                {notes && <div>Catatan: <span className="text-stone-300">{notes}</span></div>}
                <div className="pt-2 border-t border-stone-800 flex justify-between items-center text-sm font-sans font-bold">
                  <span className="text-stone-400 text-xs">Estimasi Total Web:</span>
                  <span className={hasPrice ? "text-emerald-400" : "text-amber-400"}>{estimateLabel}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Sticky Modal Footer for instant checkout on mobile */}
          <div className="p-3.5 sm:p-4 bg-white border-t border-stone-200/90 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-lg">
            <div>
              <span className="text-[11px] text-stone-500 block font-medium">Estimasi Biaya:</span>
              <div className="flex items-baseline gap-1">
                <span className={`text-lg sm:text-xl font-black font-serif ${hasPrice ? 'text-emerald-800' : 'text-amber-700'}`}>
                  {estimateLabel}
                </span>
                <span className="text-[11px] text-stone-500 font-medium">({quantity} pcs)</span>
              </div>
            </div>

            <button
              id="btn-confirm-order-wa"
              type="submit"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 active:scale-98 text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition cursor-pointer min-h-[48px]"
            >
              <MessageCircle className="w-5 h-5 fill-white/20" />
              <span>PESAN VIA WHATSAPP</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
