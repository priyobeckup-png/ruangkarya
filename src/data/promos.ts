import { PromoItem } from '../types';

// =========================================================================
// === EDIT PROMO DI SINI ==================================================
// Anda dapat mengubah teks diskon, periode promo, dan penawaran spesial
// =========================================================================

export const PROMOS: PromoItem[] = [
  {
    id: 'promo-1',
    badge: 'PROMO BUNDLING',
    title: 'Paket Bundling Undangan + Souvenir Spesial',
    subtitle: 'Tanyakan penawaran bundling undangan + souvenir',
    description: 'Tersedia penawaran bundling untuk pemesanan undangan dan souvenir. Detail harga, bonus, dan syarat dikonfirmasi admin via WhatsApp.',
    code: 'BERKAH150',
    discountText: 'Penawaran bundling',
    validUntil: 'Konfirmasi periode via WhatsApp',
    actionText: 'Klaim Promo via WhatsApp',
    targetCategory: 'Undangan Pernikahan',
  },
  {
    id: 'promo-2',
    badge: 'DISKON SUNATAN & AQIQAH',
    title: 'Cetak Ceria Mulai Rp 1.100 / pcs',
    subtitle: 'Tanyakan opsi bonus untuk pesanan sunatan & aqiqah',
    description: 'Tanyakan ketersediaan bonus, pilihan finishing, dan harga untuk undangan sunatan maupun aqiqah.',
    code: 'CERIAKID',
    discountText: 'Tanyakan bonus',
    validUntil: 'Konfirmasi ketersediaan',
    actionText: 'Tanya Promo Sunatan',
    targetCategory: 'Undangan Sunatan',
  },
  {
    id: 'promo-3',
    badge: 'SOUVENIR HEMAT',
    title: 'Mug & Pouch Custom Mulai Rp 6.500',
    subtitle: 'Pilihan souvenir custom untuk berbagai acara',
    description: 'Tanyakan harga, minimum order, kemasan, dan pilihan desain souvenir sesuai kebutuhan acara.',
    code: 'SOUVENIRHEMAT',
    discountText: 'Tanyakan penawaran',
    validUntil: 'Konfirmasi stok & periode',
    actionText: 'Konsultasi Souvenir',
    targetCategory: 'Souvenir',
  },
];
