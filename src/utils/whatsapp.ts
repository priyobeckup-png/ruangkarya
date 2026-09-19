import { SITE_CONFIG } from '../data/siteConfig';
import { OrderFormData } from '../types';

/**
 * Membuat link WhatsApp Click to Chat resmi dengan nomor 6283170819117
 */
export function getWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message.trim());
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encoded}`;
}

/**
 * Membuka WhatsApp di tab baru atau aplikasi WhatsApp
 */
export function openWhatsAppChat(message: string): void {
  const url = getWhatsAppUrl(message);
  window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * Format pesan pemesanan produk dinamis
 */
export function buildOrderMessage(data: OrderFormData): string {
  const variantsList = Object.entries(data.selectedVariants)
    .filter(([_, value]) => Boolean(value))
    .map(([key, value]) => `• ${key}: ${value}`)
    .join('\n');

  const addOnsList = data.selectedAddOns.length > 0
    ? data.selectedAddOns.map(addon => `• ${addon}`).join('\n')
    : '';

  let message = `Halo Admin ${SITE_CONFIG.brandName}, saya ingin memesan:\n\n`;
  message += `Produk: ${data.productName}\n`;
  message += `Kode: ${data.productCode}\n`;
  message += `Jumlah: ${data.quantity} pcs\n`;
  message += `Nama: ${data.customerName}\n`;
  if (data.eventType) message += `Jenis acara: ${data.eventType}\n`;
  if (data.eventDate) message += `Tanggal acara: ${data.eventDate}\n`;
  if (data.customerWhatsApp) message += `Nomor WhatsApp: ${data.customerWhatsApp}\n`;

  if (variantsList) {
    message += `\nPilihan Variasi:\n${variantsList}\n`;
  }

  if (addOnsList) {
    message += `\nTambahan Opsi:\n${addOnsList}\n`;
  }

  if (data.notes && data.notes.trim()) {
    message += `\nCatatan:\n${data.notes.trim()}\n`;
  }

  if (data.estimatedPrice && data.estimatedPrice > 0) {
    message += `\nEstimasi Total (Web): Rp ${data.estimatedPrice.toLocaleString('id-ID')}\n`;
  }

  message += `\nMohon informasi harga final dan proses selanjutnya.\nTerima kasih.`;

  return message;
}

/**
 * Format pesan konsultasi kalkulator harga
 */
export function buildCalculatorMessage(params: {
  productName: string;
  productCode?: string;
  quantity: number;
  basePrice?: number;
  addOns: string[];
  totalEstimate?: number;
  customerName?: string;
  notes?: string;
}): string {
  let msg = `Halo Admin ${SITE_CONFIG.brandName}, saya ingin konsultasi pesanan:\n\n`;
  msg += `Produk: ${params.productName}\n`;
  if (params.productCode) msg += `Kode Produk: ${params.productCode}\n`;
  msg += `Jumlah: ${params.quantity} pcs\n`;
  msg += typeof params.basePrice === 'number' && params.basePrice > 0
    ? `Harga Dasar: Rp ${params.basePrice.toLocaleString('id-ID')} / pcs\n`
    : `Harga Dasar: Menyusul (mohon dikonfirmasi admin)\n`;

  if (params.addOns.length > 0) {
    msg += `Tambahan / Finishing:\n${params.addOns.map(a => `• ${a}`).join('\n')}\n`;
  } else {
    msg += `Tambahan / Finishing: Tidak ada\n`;
  }

  if (typeof params.totalEstimate === 'number' && params.totalEstimate > 0) {
    msg += `Estimasi Total: Rp ${params.totalEstimate.toLocaleString('id-ID')}\n`;
  }

  if (params.customerName) msg += `Nama: ${params.customerName}\n`;
  if (params.notes?.trim()) msg += `Catatan: ${params.notes.trim()}\n`;

  msg += `\nMohon konfirmasi harga final, ketersediaan, dan detail pesanan. Terima kasih.`;
  return msg;
}

/**
 * Format pesan kirim desain sendiri
 */
export function buildUploadDesignMessage(params: {
  fileName?: string;
  productType: string;
  quantity: number | string;
  customerName?: string;
  notes?: string;
}): string {
  let msg = `Halo Admin ${SITE_CONFIG.brandName}, saya punya desain sendiri yang ingin dicetak:\n\n`;
  msg += `Kategori / Produk: ${params.productType}\n`;
  msg += `Rencana Jumlah: ${params.quantity} pcs\n`;
  if (params.fileName) msg += `File Desain: ${params.fileName}\n`;
  if (params.customerName) msg += `Nama: ${params.customerName}\n`;
  if (params.notes) msg += `Catatan Desain: ${params.notes}\n`;
  msg += `\nSaya akan melampirkan file desain asli di chat WhatsApp ini. Mohon dicek apakah resolusinya sudah sesuai untuk dicetak. Terima kasih!`;
  return msg;
}

/**
 * Format pesan konsultasi cepat
 */
export function buildQuickConsultMessage(topic = 'tanya seputar cetak undangan & souvenir'): string {
  return `Halo Admin ${SITE_CONFIG.brandName}, saya ingin ${topic}. Boleh minta info katalog dan price list terbarunya?`;
}
