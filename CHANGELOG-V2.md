# RuangKarya V2 — Perubahan

- Memperbaiki kategori Galeri berdasarkan kode produk agar filter Pernikahan, Sunatan, Aqiqah, Ulang Tahun, dan Event berisi foto yang sesuai.
- Filter Galeri sekarang dinamis dan hanya menampilkan kategori yang benar-benar memiliki foto.
- Menambahkan 5 gambar WebP ringan untuk slideshow Hero; total sekitar 154 KB untuk lima gambar.
- Mengganti gambar Hero eksternal dengan gambar lokal hasil galeri.
- Kalkulator sekarang memakai produk berkatalog yang memiliki harga sebagai sumber harga utama dan menyediakan dropdown pemilihan produk langsung.
- Kalkulator mengirim kode produk, nama produk, jumlah, add-on, dan estimasi total ke WhatsApp.
- Bagian upload desain menjelaskan bahwa file tidak disimpan di server dan harus dilampirkan manual setelah WhatsApp terbuka.
- Memperbaiki field Nama Pemesan pada form upload desain.
- Memperbarui alamat menjadi: Jl. Danau Toba, Desa Gogik, Ungaran Barat, Kabupaten Semarang.
- Menambahkan tautan Google Maps ke alamat tersebut.
- Menghapus klaim rating 4.9/5 dan label pesanan terverifikasi yang tidak memiliki sumber data di website.
- Memperhalus klaim keunggulan agar tidak menyatakan bonus/garansi sebagai fakta tanpa konfirmasi.
- Menambahkan robots.txt, sitemap.xml, favicon SVG, canonical URL, theme-color, dan JSON-LD LocalBusiness.
- Mengurangi klaim promo yang terlalu spesifik dan mengarahkan konfirmasi periode/ketersediaan melalui WhatsApp.

## Catatan teknis

Website tetap bersifat static/client-side dan tidak membutuhkan database.

File desain yang dipilih pada browser hanya digunakan untuk preview/nama file. Website tidak mengunggah atau menyimpan file tersebut. Pengiriman file asli dilakukan manual melalui lampiran WhatsApp setelah chat dibuka.

Build produksi belum dapat diverifikasi di lingkungan kerja ini karena `npm install` membutuhkan paket dari registry dan proses instalasi mengalami timeout. Pemeriksaan TypeScript juga tidak dapat diselesaikan penuh karena dependency lokal belum terpasang; tidak ditemukan error sintaks pada file yang diubah.
