import React, { useMemo, useState } from 'react';
import { Calculator, MessageCircle, Info } from 'lucide-react';
import { CALCULATOR_ADDONS, calculateEstimate, formatRupiah } from '../utils/calculator';
import { buildCalculatorMessage, getWhatsAppUrl } from '../utils/whatsapp';
import { PRODUCTS } from '../data/products';

export const PriceCalculatorSection: React.FC = () => {
  // Sumber produk tunggal: products.ts. Produk tanpa harga tetap ditampilkan.
  const calculatorProducts = useMemo(() => PRODUCTS, []);
  const [selectedProductCode, setSelectedProductCode] = useState(calculatorProducts[0]?.code ?? '');
  const currentProduct = calculatorProducts.find((product) => product.code === selectedProductCode);
  const minimumOrder = currentProduct?.minimumOrder ?? 1;

  const [quantity, setQuantity] = useState<number>(minimumOrder);
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [notes, setNotes] = useState('');

  const activeBasePrice = currentProduct?.price ?? 0;
  const hasPrice = Boolean(currentProduct && currentProduct.price > 0);
  const calculation = calculateEstimate(activeBasePrice, quantity, selectedAddOnIds);

  const handleProductChange = (code: string) => {
    const product = calculatorProducts.find((item) => item.code === code);
    setSelectedProductCode(code);
    setQuantity(product?.minimumOrder ?? 1);
    setSelectedAddOnIds([]);
  };

  const handleQuantityChange = (value: number) => {
    const safeValue = Number.isFinite(value) ? Math.max(minimumOrder, Math.floor(value)) : minimumOrder;
    setQuantity(safeValue);
  };

  const handleToggleAddOn = (id: string) => {
    setSelectedAddOnIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const selectedAddOnNames = selectedAddOnIds
    .map(id => CALCULATOR_ADDONS.find(a => a.id === id)?.name)
    .filter(Boolean) as string[];

  const handleConfirmViaWhatsApp = () => {
    if (!currentProduct) return;

    const msg = buildCalculatorMessage({
      productName: currentProduct.name,
      productCode: currentProduct.code,
      quantity,
      basePrice: hasPrice ? activeBasePrice : undefined,
      addOns: selectedAddOnNames,
      totalEstimate: hasPrice ? calculation.totalEstimate : undefined,
      customerName: customerName.trim() || undefined,
      notes: notes.trim() || undefined,
    });

    window.open(getWhatsAppUrl(msg), '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="kalkulator-section" className="py-16 bg-[#faf7f2] border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            <span>Kalkulator Harga</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 tracking-tight">
            Hitung Estimasi Biaya
          </h2>
          <p className="text-sm sm:text-base text-stone-600">
            Pilih produk langsung dari katalog, tentukan jumlah dan tambahan, lalu konsultasikan hasilnya melalui WhatsApp.
          </p>
        </div>

        <div className="max-w-5xl mx-auto bg-[#f4efe5] rounded-3xl border border-stone-200/90 p-5 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-5">
              <div className="space-y-2">
                <label htmlFor="calculator-product-select" className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                  1. Pilih Produk dari Katalog
                </label>
                <select
                  id="calculator-product-select"
                  value={selectedProductCode}
                  onChange={(e) => handleProductChange(e.target.value)}
                  className="w-full px-3.5 py-3 text-sm bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                >
                  {Array.from(new Set(calculatorProducts.map(product => product.category))).map(category => (
                    <optgroup key={category} label={category}>
                      {calculatorProducts
                        .filter(product => product.category === category)
                        .map(product => (
                          <option key={product.code} value={product.code}>
                            {product.code} — {product.name} — {product.price > 0 ? `${formatRupiah(product.price)} / pcs` : 'Menyusul'}
                          </option>
                        ))}
                    </optgroup>
                  ))}
                </select>
                {currentProduct && (
                  <p className="text-[11px] text-stone-500">
                    Minimum order {currentProduct.minimumOrder} pcs • Harga mengikuti data katalog.
                  </p>
                )}
              </div>

              {!hasPrice ? (
                <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 sm:p-5 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-bold text-amber-950">Harga produk ini perlu dikonfirmasi admin.</h3>
                      <p className="text-xs text-amber-900 mt-1 leading-relaxed">
                        Produk tetap tersedia di katalog, tetapi website tidak akan mengarang harga atau menghitungnya sebagai Rp0.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleConfirmViaWhatsApp}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition min-h-[48px]"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Tanya Harga via WhatsApp
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-3">
                    <label htmlFor="calculator-quantity" className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                      2. Jumlah Pesanan
                    </label>
                    <div className="flex gap-2">
                      <input
                        id="calculator-quantity"
                        type="number"
                        min={minimumOrder}
                        step="1"
                        value={quantity}
                        onChange={(e) => handleQuantityChange(Number(e.target.value))}
                        className="w-full px-3.5 py-3 text-sm bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-emerald-500"
                      />
                      <span className="inline-flex items-center px-3 text-sm font-semibold text-stone-500 bg-stone-100 rounded-xl">pcs</span>
                    </div>
                    <input
                      type="range"
                      min={minimumOrder}
                      max={Math.max(2000, minimumOrder)}
                      step="1"
                      value={Math.min(quantity, Math.max(2000, minimumOrder))}
                      onChange={(e) => handleQuantityChange(Number(e.target.value))}
                      className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                    />
                    <div className="flex flex-wrap gap-1.5">
                      {[100, 200, 300, 500, 1000].filter(qty => qty >= minimumOrder).map(qty => (
                        <button
                          key={qty}
                          type="button"
                          onClick={() => setQuantity(qty)}
                          className={`text-xs px-2.5 py-1 rounded-lg border transition ${
                            quantity === qty
                              ? 'bg-emerald-700 border-emerald-700 text-white font-bold'
                              : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-100'
                          }`}
                        >
                          {qty} pcs
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                      3. Finishing / Tambahan
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {CALCULATOR_ADDONS.map(addon => {
                        const checked = selectedAddOnIds.includes(addon.id);
                        return (
                          <label
                            key={addon.id}
                            className={`p-2.5 rounded-xl border text-xs flex items-start gap-2.5 cursor-pointer select-none transition ${
                              checked ? 'bg-emerald-50 border-emerald-300' : 'bg-white border-stone-200 hover:bg-stone-100/50'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => handleToggleAddOn(addon.id)}
                              className="mt-0.5"
                            />
                            <span className="flex-1">
                              <span className="block font-semibold text-stone-900">{addon.name}</span>
                              <span className="block text-[11px] text-emerald-700 mt-0.5">+{formatRupiah(addon.pricePerUnit)} / pcs</span>
                            </span>
                          </label>
                        );
                      })}
                    </div>
                    <p className="text-[11px] text-stone-500">
                      Harga tambahan di atas berasal dari data kalkulator website dan tetap perlu dikonfirmasi sesuai produk.
                    </p>
                  </div>
                </>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="calculator-name" className="text-xs font-bold text-stone-800 mb-1 block">Nama (Opsional)</label>
                  <input
                    id="calculator-name"
                    type="text"
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    placeholder="Nama Anda"
                    className="w-full px-3 py-2.5 text-xs bg-white border border-stone-200 rounded-xl focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="calculator-notes" className="text-xs font-bold text-stone-800 mb-1 block">Catatan (Opsional)</label>
                  <input
                    id="calculator-notes"
                    type="text"
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="Contoh: bahan/finishing khusus"
                    className="w-full px-3 py-2.5 text-xs bg-white border border-stone-200 rounded-xl focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#faf8f4] rounded-2xl p-5 sm:p-6 border border-stone-200/90 shadow-md space-y-4">
              <div className="text-xs font-bold uppercase tracking-widest text-emerald-800 pb-2 border-b border-stone-100">
                Rincian Estimasi
              </div>

              <div className="space-y-2 text-xs text-stone-600">
                <div className="flex justify-between gap-4"><span>Produk:</span><span className="font-semibold text-stone-900 text-right">{currentProduct?.name ?? 'Pilih produk'}</span></div>
                <div className="flex justify-between"><span>Kode:</span><span className="font-semibold text-stone-900">{currentProduct?.code ?? '-'}</span></div>
                <div className="flex justify-between"><span>Jumlah:</span><span className="font-bold text-stone-900">{quantity} pcs</span></div>
                <div className="flex justify-between"><span>Harga produk:</span><span className="text-stone-900">{hasPrice ? `${formatRupiah(activeBasePrice)} / pcs` : 'Menyusul'}</span></div>

                {hasPrice && (
                  <>
                    <div className="flex justify-between"><span>Subtotal:</span><span className="font-semibold">{formatRupiah(activeBasePrice * quantity)}</span></div>
                    <div className="flex justify-between"><span>Tambahan:</span><span>+{formatRupiah(calculation.addOnPricePerUnit * quantity)}</span></div>
                    <div className="pt-2 border-t border-stone-100 flex justify-between font-bold text-stone-900"><span>Estimasi total:</span><span className="text-emerald-800">{formatRupiah(calculation.totalEstimate)}</span></div>
                  </>
                )}
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-950 leading-relaxed flex items-start gap-2.5">
                <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <p>Harga di atas adalah estimasi. Harga final dapat dikonfirmasi melalui WhatsApp.</p>
              </div>

              {hasPrice && (
                <button
                  id="btn-confirm-calc-wa"
                  onClick={handleConfirmViaWhatsApp}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-md transition min-h-[48px]"
                >
                  <MessageCircle className="w-4 h-4" />
                  Konsultasikan Pesanan via WhatsApp
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
