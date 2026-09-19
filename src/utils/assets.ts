/**
 * Menormalkan path gambar agar tetap valid di GitHub Pages,
 * baik di root domain maupun di sub-path repository.
 *
 * products.ts menyimpan path dengan awalan "/images/...", sedangkan
 * Vite dikonfigurasi dengan base relatif. Helper ini menyatukan keduanya
 * tanpa perlu mengubah 65 entri data produk.
 */
export function resolveAssetUrl(path: string): string {
  if (!path) return '';
  if (/^(https?:)?\/\//i.test(path) || path.startsWith('data:')) return path;
  const base = import.meta.env.BASE_URL || '/';
  const cleanPath = path.replace(/^\.?\//, '');
  return `${base}${cleanPath}`;
}

/**
 * Versi thumbnail ringan (maks 520px) untuk grid katalog & galeri.
 * File penuh hanya dimuat saat lightbox/detail dibuka.
 */
export function resolveThumbUrl(path: string): string {
  if (!path) return '';
  if (/^(https?:)?\/\//i.test(path) || path.startsWith('data:')) return path;
  const thumbPath = path.replace('images/undangan/', 'images/undangan/thumb/');
  return resolveAssetUrl(thumbPath);
}
