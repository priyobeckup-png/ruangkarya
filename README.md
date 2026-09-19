# RuangKarya — Website Katalog Percetakan, Undangan & Souvenir

Website resmi percetakan **RuangKarya** (Undangan • Souvenir • Percetakan) dengan sistem pemesanan langsung terintegrasi ke **WhatsApp** (`083170819117`).

Dibuat menggunakan arsitektur modern yang ringan, cepat, responsif di HP (mobile-first), dan **100% tanpa database server yang rumit**. Semua data produk, harga, testimoni, dan galeri tersusun rapi dalam file TypeScript yang mudah diedit oleh pemilik bisnis.

---

## 📁 Struktur Folder Project

```
├── public/                 # Aset statis & gambar
├── src/
│   ├── components/         # Komponen UI modular
│   │   ├── AboutSection.tsx            # Profil usaha & kredibilitas
│   │   ├── CategorySection.tsx        # 7 Kategori card interaktif
│   │   ├── FloatingWhatsApp.tsx       # Tombol melayang WhatsApp
│   │   ├── Footer.tsx                 # Footer & navigasi kontak
│   │   ├── GallerySection.tsx         # Galeri foto hasil cetak & Lightbox
│   │   ├── Hero.tsx                   # Hero banner & CTA
│   │   ├── HowToOrderSection.tsx      # 6 Langkah cara pesan
│   │   ├── Navbar.tsx                 # Navigasi desktop & hamburger mobile
│   │   ├── OrderFormModal.tsx         # Modal form pesanan & generate teks WA
│   │   ├── PriceCalculatorSection.tsx # Kalkulator estimasi biaya real-time
│   │   ├── ProductCard.tsx            # Card produk katalog
│   │   ├── ProductDetailModal.tsx     # Modal detail spesifikasi produk
│   │   ├── ProductGrid.tsx            # Grid katalog, search & filter
│   │   ├── PromoBanner.tsx            # Banner penawaran & diskon
│   │   ├── TestimonialsSection.tsx    # Ulasan kepuasan pelanggan
│   │   └── UploadDesignSection.tsx    # Form kirim desain sendiri
│   ├── data/               # Data katalog tanpa database (EDIT DI SINI)
│   │   ├── categories.ts              # Data 7 kategori resmi
│   │   ├── gallery.ts                 # Data galeri foto hasil cetak
│   │   ├── howToOrder.ts              # Data langkah pemesanan
│   │   ├── products.ts                # Data produk, harga & spesifikasi
│   │   ├── promos.ts                  # Data diskon & promo berkala
│   │   ├── siteConfig.ts              # Pengaturan brand, kontak & no WA
│   │   └── testimonials.ts            # Data testimoni pembeli
│   ├── types/
│   │   └── index.ts                   # Definisi tipe TypeScript
│   ├── utils/
│   │   ├── calculator.ts              # Logika kalkulasi harga & diskon volume
│   │   └── whatsapp.ts                # Generator link & teks pesan WhatsApp
│   ├── App.tsx             # Halaman utama aplikasi
│   ├── index.css           # Styling Tailwind CSS & Font
│   └── main.tsx            # Entry point React
├── index.html              # Entry point HTML & Meta SEO
├── package.json            # Daftar dependencies & scripts
├── metadata.json           # Metadata AI Studio
└── README.md               # Panduan lengkap pengelolaan
```

---

## 🚀 Cara Menjalankan Project

### 1. Mode Development (Pengembangan Lokal)
```bash
npm install
npm run dev
```
Buka browser di `http://localhost:3000`.

### 2. Build Production
```bash
npm run build
```
File hasil kompilasi siap saji akan berada di dalam folder `dist/`.

---

## 🛠️ Panduan Pemilik Bisnis (Cara Mengedit Konten)

### 1. Cara Mengganti Nama Brand & Nomor WhatsApp
Buka file `src/data/siteConfig.ts`:
```typescript
export const SITE_CONFIG = {
  brandName: 'RuangKarya',                     // Ganti nama brand di sini
  tagline: 'Undangan • Souvenir • Percetakan', // Ganti tagline
  phoneDisplay: '0831-7081-9117',             // Format tampilan
  whatsappNumber: '6283170819117',            // Nomor tujuan WA internasional
  // ...
};
```

### 2. Cara Menambah / Mengubah Produk & Harga
Buka file `src/data/products.ts`:
Cukup copy-paste blok produk yang ada dan sesuaikan isinya:
```typescript
{
  id: 25,
  code: 'A-010',
  name: 'Undangan Pernikahan Soft Cover Minimalis',
  category: 'Undangan Pernikahan',
  price: 1600,                                 // Harga per pcs (dalam Rupiah)
  priceType: 'per_pcs',
  minimumOrder: 100,                           // Jumlah order minimal
  description: 'Undangan lipat simpel dengan kertas tebal...',
  images: [
    'URL_FOTO_1',
    'URL_FOTO_2',
  ],
  specifications: [
    { label: 'Bahan Kertas', value: 'Art Carton 260gr' },
    { label: 'Ukuran', value: '14 x 20 cm' },
  ],
}
```

### 3. Cara Mengubah Promo
Buka file `src/data/promos.ts` dan ubah judul, kode voucher, serta besaran diskon.

### 4. Cara Mengubah Foto Galeri
Buka file `src/data/gallery.ts` dan ganti URL foto dengan foto hasil cetak asli Anda.

### 5. Cara Mengubah Testimonial
Buka file `src/data/testimonials.ts` dan ubah ulasan pembeli sesuai kebutuhan.

---

## 🌐 Cara Deploy ke GitHub & Vercel / Netlify

1. Simpan dan push kode ke repository GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit RuangKarya website"
   git branch -M main
   git remote add origin https://github.com/USERNAME/ruangkarya.git
   git push -u origin main
   ```
2. Hubungkan repository GitHub ke **Vercel** atau **Netlify**:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Website Anda langsung online dengan HTTPS gratis dan performa kilat!
