export interface OrderStep {
  step: number;
  title: string;
  desc: string;
  iconName: string;
}

export const HOW_TO_ORDER_STEPS: OrderStep[] = [
  {
    step: 1,
    title: 'Pilih Produk',
    desc: 'Jelajahi katalog RuangKarya dan pilih model undangan atau souvenir yang Anda sukai.',
    iconName: 'LayoutGrid',
  },
  {
    step: 2,
    title: 'Isi Detail Pesanan',
    desc: 'Masukkan jumlah pesanan, nama, tanggal acara, serta opsi bahan atau catatan khusus.',
    iconName: 'FileText',
  },
  {
    step: 3,
    title: 'Kirim via WhatsApp',
    desc: 'Klik tombol WhatsApp. Rincian pesanan otomatis tersusun rapi dan terkirim ke admin kami.',
    iconName: 'MessageCircle',
  },
  {
    step: 4,
    title: 'Konfirmasi Desain',
    desc: 'Admin menghitung total pasti & tim desainer membuatkan preview draft desain untuk dicek.',
    iconName: 'CheckCircle2',
  },
  {
    step: 5,
    title: 'Proses Produksi',
    desc: 'Setelah desain Anda setujui (ACC), pesanan langsung masuk antrean cetak dengan QC ketat.',
    iconName: 'Printer',
  },
  {
    step: 6,
    title: 'Pesanan Selesai & Kirim',
    desc: 'Pesanan dipacking aman lapis bubble wrap tebal dan dikirim ke alamat Anda.',
    iconName: 'PackageCheck',
  },
];
