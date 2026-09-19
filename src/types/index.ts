export type ProductCategory = 
  | 'Undangan Pernikahan'
  | 'Undangan Sunatan'
  | 'Undangan Aqiqah'
  | 'Undangan Ulang Tahun'
  | 'Undangan Event'
  | 'Souvenir'
  | 'Cetak Lainnya';

export interface ProductVariant {
  name: string;
  options: string[];
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  id: string | number;
  code: string;
  name: string;
  category: ProductCategory;
  price: number;
  priceType: 'per_pcs' | 'paket';
  minimumOrder: number;
  description: string;
  images: string[];
  variants?: ProductVariant[];
  specifications: ProductSpecification[];
  featured?: boolean;
  promo?: {
    discountPercent?: number;
    badgeText?: string;
    originalPrice?: number;
  };
  tags?: string[];
}

export interface CategoryInfo {
  id: ProductCategory;
  title: string;
  subtitle: string;
  iconName: string;
  bgGradient: string;
  accentColor: string;
}

export interface PromoItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  code?: string;
  badge: string;
  discountText: string;
  validUntil: string;
  actionText: string;
  targetCategory?: ProductCategory;
}

export interface Testimonial {
  id: string | number;
  name: string;
  city: string;
  event: string;
  product: string;
  rating: number;
  comment: string;
  date: string;
}

export interface GalleryItem {
  id: string | number;
  title: string;
  category: ProductCategory;
  imageUrl: string;
  client: string;
  description?: string;
}

export interface OrderFormData {
  productName: string;
  productCode: string;
  quantity: number;
  customerName: string;
  eventType: string;
  eventDate: string;
  customerWhatsApp: string;
  selectedVariants: Record<string, string>;
  selectedAddOns: string[];
  notes: string;
  estimatedPrice?: number;
}
