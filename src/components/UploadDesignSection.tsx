import React, { useEffect, useState } from 'react';
import { UploadCloud, FileCheck, MessageCircle, AlertCircle, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';
import { buildUploadDesignMessage, openWhatsAppChat } from '../utils/whatsapp';

export const UploadDesignSection: React.FC = () => {
  const MAX_FILE_SIZE = 50 * 1024 * 1024;
  const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'pdf', 'psd', 'ai', 'cdr'];
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [productType, setProductType] = useState('Undangan Pernikahan');
  const [quantity, setQuantity] = useState<number | string>(200);
  const [customerName, setCustomerName] = useState('');
  const [notes, setNotes] = useState('');
  const [fileError, setFileError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileError('');
    setPreviewUrl(null);

    if (!file) {
      setSelectedFile(null);
      return;
    }

    const extension = file.name.split('.').pop()?.toLowerCase() ?? '';
    if (!ALLOWED_EXTENSIONS.includes(extension)) {
      setSelectedFile(null);
      setFileError('Format file tidak didukung. Gunakan JPG, PNG, WEBP, GIF, PDF, PSD, AI, atau CDR.');
      e.target.value = '';
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setSelectedFile(null);
      setFileError('Ukuran file melebihi batas maksimal 50 MB. Silakan pilih file yang lebih kecil.');
      e.target.value = '';
      return;
    }

    setSelectedFile(file);

    if (file.type.startsWith('image/')) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleSendViaWhatsApp = () => {
    const msg = buildUploadDesignMessage({
      fileName: selectedFile ? selectedFile.name : undefined,
      productType,
      quantity,
      customerName: customerName.trim() || undefined,
      notes: notes.trim() || undefined,
    });
    openWhatsAppChat(msg);
  };

  return (
    <section id="upload-desain-section" className="py-16 bg-[#f3efe6] border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-[#faf8f4] rounded-3xl border border-stone-200/90 p-6 sm:p-10 shadow-sm space-y-6">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cetak Custom Design</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              Punya Desain Sendiri?
            </h2>
            <p className="text-sm sm:text-base text-stone-600 max-w-xl mx-auto">
              Anda dapat memilih file desain di perangkat untuk melihat nama/preview. File tidak disimpan di website; setelah WhatsApp terbuka, lampirkan file yang sama secara manual agar admin menerima file aslinya.
            </p>
          </div>

          {/* Upload Area (Client-side file preview) */}
          <div className="space-y-4">
            <div className="border-2 border-dashed border-stone-300 hover:border-emerald-500 rounded-2xl p-6 text-center transition bg-stone-50/50 hover:bg-stone-50 cursor-pointer relative">
              <input
                type="file"
                accept="image/*,.pdf,.psd,.ai,.cdr"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                id="design-file-input"
              />
              
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <div className="text-sm font-bold text-stone-800">
                  {selectedFile ? 'Ganti File Desain' : 'Klik atau Tarik File Desain ke Sini'}
                </div>
                <p className="text-xs text-stone-500">
                  Format: JPG, PNG, PDF, PSD, AI, atau CDR • Maks. 50MB • File tidak diunggah ke server
                </p>
              </div>
            </div>

            {fileError && (
              <div role="alert" className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 font-medium">
                {fileError}
              </div>
            )}

            {/* Selected File Information Bar & Local Preview */}
            {selectedFile && (
              <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 flex flex-col sm:flex-row items-center gap-4">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview Desain"
                    className="w-16 h-16 rounded-lg object-cover border border-emerald-300 shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <FileCheck className="w-8 h-8" />
                  </div>
                )}
                
                <div className="flex-1 text-center sm:text-left">
                  <div className="text-xs font-bold text-stone-900 truncate max-w-xs">
                    {selectedFile.name}
                  </div>
                  <div className="text-[11px] text-stone-500">
                    Ukuran file: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </div>
                  <div className="text-xs text-emerald-800 font-semibold mt-0.5">
                    ✓ File siap dikonsultasikan
                  </div>
                </div>
              </div>
            )}

            {/* Quick Details Form */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="text-xs font-bold text-stone-800 mb-1 block">
                  Kategori / Jenis Produk
                </label>
                <select
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none"
                >
                  <option value="Undangan Pernikahan">Undangan Pernikahan</option>
                  <option value="Undangan Sunatan">Undangan Sunatan</option>
                  <option value="Undangan Aqiqah">Undangan Aqiqah</option>
                  <option value="Undangan Ulang Tahun">Undangan Ulang Tahun</option>
                  <option value="Souvenir Custom">Souvenir Custom</option>
                  <option value="Buku Tamu / Banner / Brosur">Buku Tamu / Banner / Brosur</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-800 mb-1 block">
                  Rencana Jumlah (pcs)
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Contoh: 300"
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-800 mb-1 block">Nama Pemesan</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Contoh: Bagio"
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-800 mb-1 block">Catatan Tambahan</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Contoh: PDF A5 bolak-balik, bahan Jasmine"
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            {/* Honest Technical Note required by prompt */}
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div className="leading-relaxed text-[11px]">
                <p className="font-bold mb-1">File tidak dikirim otomatis dari website.</p>
                <ol className="list-decimal pl-4 space-y-0.5">
                  <li>Pilih file di sini untuk pengecekan nama/preview.</li>
                  <li>Klik tombol WhatsApp.</li>
                  <li>Di chat WhatsApp, tekan lampiran lalu pilih file desain yang sama.</li>
                </ol>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <button
                id="btn-upload-send-wa"
                type="button"
                onClick={handleSendViaWhatsApp}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 active:scale-98 text-white text-sm sm:text-base font-bold shadow-md hover:shadow-lg transition cursor-pointer min-h-[48px]"
              >
                <MessageCircle className="w-4 h-4 fill-white/20" />
                <span>Lanjut ke WhatsApp & Lampirkan File</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
