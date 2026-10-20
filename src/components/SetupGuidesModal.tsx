import React, { useState } from 'react';
import { X, DollarSign, Globe, Check, Copy, ExternalLink, ShieldCheck, Terminal, HelpCircle } from 'lucide-react';
import { AdSenseConfig } from '../types';

interface SetupGuidesModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'adsense' | 'cloudflare';
  adConfig: AdSenseConfig;
  onSaveAdConfig: (config: AdSenseConfig) => void;
}

export const SetupGuidesModal: React.FC<SetupGuidesModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'adsense',
  adConfig,
  onSaveAdConfig,
}) => {
  const [activeTab, setActiveTab] = useState<'adsense' | 'cloudflare'>(initialTab);
  const [formConfig, setFormConfig] = useState<AdSenseConfig>(adConfig);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveAdConfig(formConfig);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  const adScriptExample = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${formConfig.client || 'ca-pub-XXXXXXXXXXXXXXXX'}" crossorigin="anonymous"></script>`;

  const adSlotExample = `<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="${formConfig.client || 'ca-pub-XXXXXXXXXXXXXXXX'}"
  data-ad-slot="${formConfig.topSlot || '1234567890'}"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>
<script>
  (adsbygoogle = window.adsbygoogle || []).push({});
</script>`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
              DS
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg">Panduan & Konfigurasi Teknis</h3>
              <p className="text-xs text-slate-400">Google AdSense & Setup Custom Domain Cloudflare</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-bold text-slate-600">
          <button
            onClick={() => setActiveTab('adsense')}
            className={`flex-1 py-3 px-4 text-center border-b-2 transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'adsense'
                ? 'border-emerald-600 text-emerald-800 bg-white'
                : 'border-transparent hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <DollarSign className="w-4 h-4 text-amber-500" />
            <span>Cara Ganti Kode Iklan AdSense</span>
          </button>
          <button
            onClick={() => setActiveTab('cloudflare')}
            className={`flex-1 py-3 px-4 text-center border-b-2 transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'cloudflare'
                ? 'border-emerald-600 text-emerald-800 bg-white'
                : 'border-transparent hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Globe className="w-4 h-4 text-blue-500" />
            <span>Cara Custom Domain Cloudflare (seo.driacom.com)</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-sm text-slate-700">
          {activeTab === 'adsense' && (
            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-900">
                <p className="font-bold text-sm mb-1">2 Cara Mengganti Iklan Google AdSense Anda:</p>
                <ol className="list-decimal list-inside space-y-1.5 mt-2">
                  <li><strong>Cara Cepat (Lewat Form di Bawah)</strong>: Cukup masukkan Publisher ID (`ca-pub-XXXXXXXXXX`) dan Slot ID iklan Anda, lalu simpan.</li>
                  <li><strong>Cara Langsung (Kode File)</strong>: Pasang script AdSense di file <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">index.html</code> dan sesuaikan tag iklan di <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">src/components/AdSenseBanner.tsx</code>.</li>
                </ol>
              </div>

              {/* Form Input AdSense */}
              <form onSubmit={handleSave} className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Pengaturan Langsung di Aplikasi
                </h4>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Google AdSense Publisher ID (ca-pub-...)
                  </label>
                  <input
                    type="text"
                    value={formConfig.client}
                    onChange={e => setFormConfig({ ...formConfig, client: e.target.value })}
                    placeholder="Contoh: ca-pub-1234567890123456"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-hidden bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Slot ID Iklan Atas (Top Banner)
                    </label>
                    <input
                      type="text"
                      value={formConfig.topSlot}
                      onChange={e => setFormConfig({ ...formConfig, topSlot: e.target.value })}
                      placeholder="Contoh: 9876543210"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-hidden bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Slot ID Iklan Konten (In-Feed)
                    </label>
                    <input
                      type="text"
                      value={formConfig.inFeedSlot}
                      onChange={e => setFormConfig({ ...formConfig, inFeedSlot: e.target.value })}
                      placeholder="Contoh: 1122334455"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-hidden bg-white"
                    />
                  </div>
                </div>

                {/* Mode toggle */}
                <div className="pt-2 flex items-center justify-between border-t border-slate-200">
                  <div className="text-xs">
                    <span className="font-bold text-slate-900 block">Mode Penayangan:</span>
                    <span className="text-slate-500">
                      {formConfig.previewMode ? 'Pratinjau visual dummy aktif' : 'Kode script AdSense asli aktif'}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setFormConfig({ ...formConfig, previewMode: !formConfig.previewMode })}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg border cursor-pointer transition-colors ${
                        formConfig.previewMode
                          ? 'bg-amber-100 text-amber-800 border-amber-300'
                          : 'bg-emerald-600 text-white border-emerald-600'
                      }`}
                    >
                      {formConfig.previewMode ? 'Ganti ke Mode Asli (Live)' : 'Mode Live Aktif ✓'}
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                    >
                      {savedSuccess ? 'Tersimpan!' : 'Simpan'}
                    </button>
                  </div>
                </div>
              </form>

              {/* Code Snippet for Manual Insertion */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-900 block">
                  Potongan Kode Script AdSense untuk index.html:
                </span>
                <div className="relative bg-slate-900 text-slate-100 rounded-xl p-3 font-mono text-xs overflow-x-auto">
                  <pre>{adScriptExample}</pre>
                  <button
                    onClick={() => handleCopy(adScriptExample, 'script')}
                    className="absolute top-2 right-2 p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px] flex items-center gap-1 cursor-pointer"
                  >
                    {copiedCode === 'script' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode === 'script' ? 'Disalin' : 'Salin'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cloudflare' && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-blue-950">
                <div className="flex items-center gap-2 font-extrabold text-sm mb-1 text-blue-900">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Langkah Menghubungkan Subdomain seo.driacom.com di Cloudflare</span>
                </div>
                <p>
                  Ikuti 4 langkah mudah berikut di dashboard Cloudflare untuk domain <strong>driacom.com</strong>:
                </p>
              </div>

              <div className="space-y-3">
                {/* Step 1 */}
                <div className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-2xs">
                  <div className="flex items-center gap-2 mb-1.5 font-bold text-xs text-slate-900">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">1</span>
                    <span>Buka Menu DNS Records di Cloudflare</span>
                  </div>
                  <p className="text-xs text-slate-600 pl-7 leading-relaxed">
                    Masuk ke <strong>dash.cloudflare.com</strong>, pilih domain <strong>driacom.com</strong>, lalu klik tab menu <strong>DNS</strong> &gt; <strong>Records</strong>.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-2xs">
                  <div className="flex items-center gap-2 mb-1.5 font-bold text-xs text-slate-900">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">2</span>
                    <span>Tambahkan CNAME Record Baru</span>
                  </div>
                  <p className="text-xs text-slate-600 pl-7 mb-2.5">
                    Klik tombol <strong>&quot;Add record&quot;</strong> dan masukkan parameter berikut:
                  </p>
                  <div className="pl-7 grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-xs">
                    <div className="bg-slate-100 p-2 rounded border border-slate-200">
                      <span className="text-[10px] text-slate-500 block font-sans">Type:</span>
                      <strong className="text-blue-700">CNAME</strong>
                    </div>
                    <div className="bg-slate-100 p-2 rounded border border-slate-200">
                      <span className="text-[10px] text-slate-500 block font-sans">Name:</span>
                      <strong className="text-emerald-700">seo</strong>
                    </div>
                    <div className="bg-slate-100 p-2 rounded border border-slate-200">
                      <span className="text-[10px] text-slate-500 block font-sans">Target:</span>
                      <strong className="text-slate-800 text-[11px] truncate block" title="URL target deployment">
                        ais-pre-7lcvkc3hu2snfwl5n6rr4q-943766343207.asia-southeast1.run.app
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-2xs">
                  <div className="flex items-center gap-2 mb-1.5 font-bold text-xs text-slate-900">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">3</span>
                    <span>Atur Proxy Status (Awan Oranye)</span>
                  </div>
                  <p className="text-xs text-slate-600 pl-7 leading-relaxed">
                    Pastikan status <strong>Proxy status</strong> menyala (<strong>Proxied</strong> / awan oranye) agar mendapatkan proteksi Cloudflare dan sertifikat SSL HTTPS otomatis. Klik <strong>Save</strong>.
                  </p>
                </div>

                {/* Step 4 */}
                <div className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-2xs">
                  <div className="flex items-center gap-2 mb-1.5 font-bold text-xs text-slate-900">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">4</span>
                    <span>Pengaturan SSL/TLS Cloudflare</span>
                  </div>
                  <p className="text-xs text-slate-600 pl-7 leading-relaxed">
                    Buka menu <strong>SSL/TLS</strong> di Cloudflare, pastikan mode enkripsi diset ke <strong>Full</strong> atau <strong>Full (strict)</strong> agar tidak terjadi loop redirect. Setelah disimpan, akses <code className="bg-slate-100 px-1 py-0.5 rounded text-emerald-700 font-bold">https://seo.driacom.com</code>!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            DriaSeo Checker · https://seo.driacom.com
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
