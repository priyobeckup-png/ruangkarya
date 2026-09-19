import React from 'react';
import { Sparkles, MapPin, HeartHandshake } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';
import { getWhatsAppUrl } from '../utils/whatsapp';

export const AboutSection: React.FC = () => {
  const consultWhatsAppUrl = getWhatsAppUrl(
    `Halo Admin ${SITE_CONFIG.brandName}, saya ingin tanya-tanya seputar layanan percetakan untuk acara saya.`
  );
  const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=Jl.%20Danau%20Toba%2C%20Desa%20Gogik%2C%20Ungaran%20Barat%2C%20Kabupaten%20Semarang';

  return (
    <section id="tentang-section" className="py-16 bg-[#f3efe6] border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Mengenal Kami</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 tracking-tight">
              Tentang RuangKarya
            </h2>

            <div className="space-y-3.5 text-sm sm:text-base text-stone-600 leading-relaxed">
              <p>
                <strong>RuangKarya</strong> menyediakan kebutuhan <strong>undangan</strong>, <strong>souvenir</strong>, dan <strong>percetakan</strong> untuk berbagai acara.
              </p>
              <p>
                Katalog, contoh desain, estimasi harga, dan konsultasi pemesanan tersedia dalam satu website. Konfirmasi pesanan dan pembayaran dilakukan melalui WhatsApp.
              </p>
            </div>

            <a
              href={consultWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition shadow"
            >
              <HeartHandshake className="w-4 h-4" />
              <span>Konsultasi via WhatsApp</span>
            </a>
          </div>

          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-5">
            <h3 className="font-serif text-lg font-bold text-stone-900 border-b border-stone-100 pb-3">
              Informasi Bisnis
            </h3>

            <div className="flex items-start gap-3 text-xs sm:text-sm">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
              <div>
                <div className="font-bold text-stone-900">Lokasi Workshop</div>
                <div className="text-stone-600 mt-0.5">{SITE_CONFIG.address}</div>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-[11px] text-emerald-700 font-semibold mt-1 hover:underline"
                >
                  Buka di Google Maps
                </a>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
              <span className="block font-bold">WhatsApp:</span>
              <a
                href={consultWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono font-semibold text-emerald-800 hover:underline"
              >
                {SITE_CONFIG.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
