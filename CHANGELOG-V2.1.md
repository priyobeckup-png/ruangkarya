# RuangKarya v2.1

## Perbaikan utama
- Kalkulator membaca seluruh produk langsung dari `src/data/products.ts`.
- Produk tanpa harga tetap tersedia dan diarahkan ke WhatsApp tanpa dihitung sebagai Rp0.
- Diskon volume global 5/10/15% dihapus dari kalkulator karena belum terbukti berlaku untuk semua produk.
- Ringkasan kalkulator menampilkan harga produk, jumlah, subtotal, tambahan, dan estimasi total.
- Pencarian katalog tetap mencakup nama, kode, kategori, dan tag.
- Tab kategori katalog hanya menampilkan kategori yang memang memiliki produk.
- Kategori galeri mempertahankan 66 gambar dengan pembagian 27/10/10/10/9.
- Upload desain diberi validasi format dan batas 50 MB; file tetap hanya dibaca lokal dan harus dilampirkan manual di WhatsApp.
- Informasi bisnis yang tidak memiliki dasar pada data proyek (jam layanan, akun sosial, klaim pelanggan/keunggulan tertentu) tidak lagi ditampilkan sebagai fakta.
- Testimoni yang belum dapat diverifikasi tidak ditampilkan sebagai testimoni nyata.
- SEO dasar dipertahankan dan ditambah `robots` serta `og:url`.
- Layout hero dibuat lebih faktual dengan angka katalog/galeri yang berasal dari data proyek.

## Verifikasi
- Struktur TypeScript/TSX berhasil melewati pemeriksaan sintaks transpiler TypeScript.
- `npm install` dan build/lint penuh belum dapat dijalankan karena instalasi dependensi mengalami timeout pada environment audit.
