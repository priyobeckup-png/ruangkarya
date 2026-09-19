import { Testimonial } from '../types';

// =========================================================================
// === EDIT TESTIMONI DI SINI ==============================================
//
// PENTING — BACA DULU:
// Isi di bawah ini adalah CONTOH / PLACEHOLDER, bukan pelanggan asli.
// Selama `TESTIMONIALS_ARE_PLACEHOLDER` bernilai true, website akan
// menampilkan penanda "contoh tampilan" supaya tidak menipu pengunjung.
//
// Cara pakai:
// 1. Ganti name, city, event, product, comment, dan date dengan data ASLI
//    dari pelanggan yang sudah memberi izin dipublikasikan.
// 2. Setelah SEMUA data di bawah diganti dengan data asli,
//    ubah TESTIMONIALS_ARE_PLACEHOLDER menjadi false.
// 3. Hapus baris yang belum terisi — lebih baik 3 testimoni asli
//    daripada 6 testimoni karangan.
// =========================================================================

export const TESTIMONIALS_ARE_PLACEHOLDER = true;

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'contoh-1',
    name: '[Nama Pelanggan 1]',
    city: '[Kota/Kecamatan]',
    event: 'Pernikahan',
    product: 'Undangan Pernikahan',
    rating: 5,
    comment: '[Tulis ulang kesan pelanggan di sini. Contoh struktur: apa yang dipesan, bagaimana proses desainnya, dan bagaimana hasil cetaknya.]',
    date: '[Bulan Tahun]',
  },
  {
    id: 'contoh-2',
    name: '[Nama Pelanggan 2]',
    city: '[Kota/Kecamatan]',
    event: 'Khitanan',
    product: 'Undangan Sunatan',
    rating: 5,
    comment: '[Tulis ulang kesan pelanggan di sini. Sebutkan hal konkret seperti kecepatan pengerjaan atau revisi desain.]',
    date: '[Bulan Tahun]',
  },
  {
    id: 'contoh-3',
    name: '[Nama Pelanggan 3]',
    city: '[Kota/Kecamatan]',
    event: 'Aqiqah',
    product: 'Undangan Aqiqah',
    rating: 5,
    comment: '[Tulis ulang kesan pelanggan di sini. Hindari kalimat berlebihan; kesan yang wajar justru lebih dipercaya.]',
    date: '[Bulan Tahun]',
  },
  {
    id: 'contoh-4',
    name: '[Nama Pelanggan 4]',
    city: '[Kota/Kecamatan]',
    event: 'Ulang Tahun',
    product: 'Undangan Ulang Tahun',
    rating: 5,
    comment: '[Tulis ulang kesan pelanggan di sini.]',
    date: '[Bulan Tahun]',
  },
  {
    id: 'contoh-5',
    name: '[Nama Pelanggan 5]',
    city: '[Kota/Kecamatan]',
    event: 'Event / Kantor',
    product: 'Undangan Event',
    rating: 5,
    comment: '[Tulis ulang kesan pelanggan di sini.]',
    date: '[Bulan Tahun]',
  },
  {
    id: 'contoh-6',
    name: '[Nama Pelanggan 6]',
    city: '[Kota/Kecamatan]',
    event: 'Souvenir',
    product: 'Souvenir Custom',
    rating: 5,
    comment: '[Tulis ulang kesan pelanggan di sini.]',
    date: '[Bulan Tahun]',
  },
];
