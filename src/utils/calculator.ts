export interface AddOnOption {
  id: string;
  name: string;
  pricePerUnit: number;
  description: string;
}

export const CALCULATOR_ADDONS: AddOnOption[] = [
  {
    id: 'plastik',
    name: 'Plastik OPP Bening',
    pricePerUnit: 100,
    description: 'Plastik pembungkus tebal pelindung undangan',
  },
  {
    id: 'label_polos',
    name: 'Label Stiker Nama Tamu (Kosong)',
    pricePerUnit: 100,
    description: 'Stiker label siap tulis sendiri',
  },
  {
    id: 'cetak_nama',
    name: 'Cetak Nama Tamu Langsung',
    pricePerUnit: 250,
    description: 'Nama tamu tercetak pada label / cover',
  },
  {
    id: 'amplop_premium',
    name: 'Amplop Khusus (Kalkir / Linen)',
    pricePerUnit: 750,
    description: 'Upgrade amplop semi transparan / bertekstur',
  },
  {
    id: 'foil_gold',
    name: 'Finishing Foil Emas / Hotprint',
    pricePerUnit: 350,
    description: 'Efek kilau emas pada nama / ornamen',
  },
  {
    id: 'emboss',
    name: 'Finishing Emboss Timbul',
    pricePerUnit: 300,
    description: 'Efek tekstur timbul 3D',
  },
];

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Menghitung estimasi tanpa menerapkan diskon kuantitas global.
 * Diskon/promo hanya boleh diterapkan jika ada aturan yang memang
 * dikonfigurasi untuk produk/kategori tersebut.
 */
export function calculateEstimate(
  basePrice: number,
  quantity: number,
  selectedAddOnIds: string[]
): {
  unitBasePrice: number;
  discountedUnitPrice: number;
  addOnPricePerUnit: number;
  finalUnitPrice: number;
  totalEstimate: number;
  discountPercentage: number;
} {
  const safeBasePrice = Math.max(0, basePrice);
  const safeQuantity = Math.max(0, quantity);
  const addOnPricePerUnit = selectedAddOnIds.reduce((sum, id) => {
    const found = CALCULATOR_ADDONS.find(a => a.id === id);
    return sum + (found ? found.pricePerUnit : 0);
  }, 0);

  const finalUnitPrice = safeBasePrice + addOnPricePerUnit;
  const totalEstimate = finalUnitPrice * safeQuantity;

  return {
    unitBasePrice: safeBasePrice,
    discountedUnitPrice: safeBasePrice,
    addOnPricePerUnit,
    finalUnitPrice,
    totalEstimate,
    discountPercentage: 0,
  };
}
