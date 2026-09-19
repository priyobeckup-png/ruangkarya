/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PromoBanner } from './components/PromoBanner';
import { CategorySection } from './components/CategorySection';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { OrderFormModal } from './components/OrderFormModal';
import { PriceCalculatorSection } from './components/PriceCalculatorSection';
import { UploadDesignSection } from './components/UploadDesignSection';
import { GallerySection } from './components/GallerySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { HowToOrderSection } from './components/HowToOrderSection';
import { AboutSection } from './components/AboutSection';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';

import { PRODUCTS } from './data/products';
import { PROMOS } from './data/promos';
import { Product, ProductCategory } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'Semua'>('Semua');
  
  // Modals state
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const [orderProduct, setOrderProduct] = useState<Product | null>(null);
  const [orderVariants, setOrderVariants] = useState<Record<string, string>>({});

  // Calculate product counts per category for display in category cards
  const productCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    PRODUCTS.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Smooth scroll to section
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);

    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const mapping: Record<string, string> = {
      katalog: 'katalog-section',
      kategori: 'kategori-section',
      galeri: 'galeri-section',
      promo: 'promo-section',
      testimoni: 'testimoni-section',
      'cara-pesan': 'cara-pesan-section',
      kalkulator: 'kalkulator-section',
      'upload-desain': 'upload-desain-section',
      tentang: 'tentang-section',
    };

    const targetElementId = mapping[sectionId] || `${sectionId}-section`;
    const elem = document.getElementById(targetElementId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Category click handler from Category section or Promo banner
  const handleSelectCategory = (cat: ProductCategory) => {
    setSelectedCategory(cat);
    handleNavigate('katalog');
  };

  // View Product Detail modal
  const handleViewDetail = (product: Product) => {
    setDetailProduct(product);
  };

  // Direct Order click from Card
  const handleDirectOrder = (product: Product) => {
    setOrderProduct(product);
    setOrderVariants({});
  };

  // Transition from Detail modal to Order Form modal
  const handleOrderFromDetail = (product: Product, variants: Record<string, string>) => {
    setDetailProduct(null);
    setOrderProduct(product);
    setOrderVariants(variants);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f5f0] text-stone-900 font-sans selection:bg-emerald-100 selection:text-emerald-900 pb-16 sm:pb-0">
      
      {/* 1. Navbar */}
      <Navbar onNavigate={handleNavigate} activeSection={activeSection} />

      {/* Main Content Sections */}
      <main className="flex-1">
        
        {/* 2. Hero Section */}
        <Hero
          onExploreCatalog={() => handleNavigate('katalog')}
          onOpenCalculator={() => handleNavigate('kalkulator')}
        />

        {/* 3. Promo Banner */}
        <PromoBanner
          promos={PROMOS}
          onSelectCategory={(catName) => handleSelectCategory(catName as ProductCategory)}
        />

        {/* 4. Category Section */}
        <CategorySection
          onSelectCategory={handleSelectCategory}
          productCountsByCategory={productCounts}
        />

        {/* 5. Product Catalog & Filter Grid */}
        <ProductGrid
          products={PRODUCTS}
          selectedCategory={selectedCategory}
          onCategoryChange={(cat) => setSelectedCategory(cat)}
          onViewDetail={handleViewDetail}
          onOrder={handleDirectOrder}
        />

        {/* 6. Price Calculator */}
        <PriceCalculatorSection />

        {/* 7. Upload Custom Design */}
        <UploadDesignSection />

        {/* 8. Gallery of Finished Prints */}
        <GallerySection />

        {/* 9. Testimonials */}
        <TestimonialsSection />

        {/* 10. How To Order (6 Steps) */}
        <HowToOrderSection />

        {/* 11. About RuangKarya */}
        <AboutSection />

      </main>

      {/* 12. Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* 13. Desktop Floating WhatsApp CTA */}
      <FloatingWhatsApp />

      {/* 14. Mobile Sticky Bottom Navigation */}
      <MobileBottomNav activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Modals */}
      <ProductDetailModal
        product={detailProduct}
        isOpen={Boolean(detailProduct)}
        onClose={() => setDetailProduct(null)}
        onOrderProduct={handleOrderFromDetail}
      />

      <OrderFormModal
        product={orderProduct}
        initialVariants={orderVariants}
        isOpen={Boolean(orderProduct)}
        onClose={() => setOrderProduct(null)}
      />

    </div>
  );
}
