import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, ShieldCheck, TrendingUp, HelpCircle, Layers, Award, Tag } from 'lucide-react';
import { Language } from '../i18n';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';
import { AdSenseBanner } from './AdSenseBanner';

interface SeoEducationalGuideProps {
  lang: Language;
}

export const SeoEducationalGuide: React.FC<SeoEducationalGuideProps> = ({ lang }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const isEn = lang === 'en';

  const faqs = isEn
    ? [
        {
          q: 'How to check website DA and PA score for free on DriaSeo?',
          a: 'Checking DA and PA for any website or blog on DriaSeo is instant and 100% free: type or paste your domain address (e.g., yoursite.com) into the input box above, then click the "CHECK DOMAIN METRICS" button. You will get Moz Domain Authority (DA), Page Authority (PA), Ahrefs Domain Rating (DR), and Spam Score metrics in real-time.'
        },
        {
          q: 'Can I check DA PA for free blogs like Blogspot and WordPress?',
          a: 'Yes, DriaSeo supports all types of domains and blogs, including top-level custom domains (.com, .id, .org) as well as free hosted blog platforms like .blogspot.com and .wordpress.com.'
        },
        {
          q: 'What is a good DA and PA score to compete on Google Page One?',
          a: 'A Moz DA score of 30+ to 50+ is generally considered competitive for ranking on Google Page One in moderate to high competition niches. However, high-quality on-page content relevance and natural backlinks are equally vital to dominate SERP positions.'
        },
        {
          q: 'What is the difference between Domain Authority (DA) and Domain Rating (DR)?',
          a: 'Domain Authority (DA) was developed by Moz to predict a domain ranking potential across Google SERPs on a logarithmic 1-100 scale. Domain Rating (DR) is developed by Ahrefs and specifically evaluates the quantity and quality of unique referring domains pointing to your website.'
        },
        {
          q: 'What is considered a safe Spam Score for a domain?',
          a: 'Moz categorizes Spam Score into three tiers: 1% to 30% is Low (Safe), 31% to 60% is Medium, and 61% to 100% is High (Risk of Google penalties). Websites with a Spam Score above 30% should audit their toxic backlinks and disavow harmful domains.'
        },
        {
          q: 'How can I safely increase my website DA and DR without penalties?',
          a: 'You can use trusted professional link acquisition like Driacom official services at https://da.driacom.com for Moz DA and https://dr.driacom.com for Ahrefs DR, combined with pillar content, internal link optimization, and technical performance.'
        },
        {
          q: 'Can I check multiple domains at once (Bulk DA PA Checker)?',
          a: 'Yes, DriaSeo Checker allows you to enter up to 10 domains simultaneously in the input box (one domain per line or separated by commas) and batch inspect all metrics with a single click.'
        },
        {
          q: 'Why does domain age matter for Google SEO?',
          a: 'Older, well-maintained domains hold proven historical track records that signal credibility to Google search algorithms, making them less susceptible to initial indexing delays compared to brand new domains.'
        }
      ]
    : [
        {
          q: 'Bagaimana cara cek DA PA website gratis di DriaSeo?',
          a: 'Cara cek DA PA website atau blog secara gratis di DriaSeo sangat mudah: masukkan alamat domain (misal: situsanda.com atau bloganda.blogspot.com) pada kotak pengecekan di atas, lalu klik tombol "CEK METRIK DOMAIN". Sistem kami akan menampilkan skor Domain Authority (DA Moz), Page Authority (PA), Domain Rating (DR Ahrefs), Spam Score, dan Umur Domain secara akurat dan instan.'
        },
        {
          q: 'Apakah bisa cek DA PA untuk blog gratis seperti Blogspot dan WordPress?',
          a: 'Ya, DriaSeo Checker mendukung pengecekan metrik untuk semua jenis blog dan website, baik domain kustom TLD (.com, .id, .net, dll) maupun subdomain blogspot gratis (.blogspot.com) dan WordPress (.wordpress.com).'
        },
        {
          q: 'Berapa skor DA PA yang bagus agar bisa bersaing di Page One Google?',
          a: 'Skor DA 30 ke atas sudah tergolong bagus untuk bersaing di halaman pertama Google (Page One) untuk kata kunci bernilai menengah. Untuk kata kunci persaingan tinggi, skor DA 50+ ke atas sangat ideal. Selain DA, relevansi konten berkualitas tinggi dan backlink natural sangat menentukan posisi ranking.'
        },
        {
          q: 'Apa perbedaan antara Domain Authority (DA) dan Domain Rating (DR)?',
          a: 'Domain Authority (DA) dikembangkan oleh Moz untuk memprediksi probabilitas peringkat seluruh domain di Google SERP pada skala logaritmik 1-100. Sedangkan Domain Rating (DR) adalah metrik dari Ahrefs yang secara khusus mengukur kuantitas dan kualitas profil backlink unik (referring domains) yang mengarah ke website Anda.'
        },
        {
          q: 'Berapakah skor Spam Score yang aman untuk website?',
          a: 'Moz mengkategorikan Spam Score ke dalam 3 rentang: 1% - 30% tergolong Rendah (Aman), 31% - 60% tergolong Sedang, dan 61% - 100% tergolong Tinggi. Website dengan Spam Score di atas 30% sebaiknya segera mengaudit profil backlink dan membersihkan tautan beracun menggunakan Google Disavow Tool.'
        },
        {
          q: 'Bagaimana cara aman menaikkan skor DA dan DR website?',
          a: 'Gunakan layanan profesional terpercaya dari Driacom di https://da.driacom.com untuk Domain Authority dan https://dr.driacom.com untuk Domain Rating yang bergaransi aman, permanen, dan bebas kenaikan Spam Score.'
        },
        {
          q: 'Apakah bisa melakukan cek metrik hingga 10 domain sekaligus (Bulk DA PA Checker)?',
          a: 'Ya, DriaSeo Checker mendukung pemeriksaan massal (bulk checker) hingga 10 domain sekaligus secara gratis. Cukup masukkan satu domain per baris atau pisahkan dengan koma/spasi pada kotak input, lalu klik tombol "CEK METRIK DOMAIN".'
        },
        {
          q: 'Mengapa umur domain (Domain Age) berpengaruh terhadap SEO?',
          a: 'Umur domain yang matang memberikan sinyal stabilitas, histori rekam jejak, dan reputasi kepada algoritma mesin pencari seperti Google. Domain yang telah beroperasi selama beberapa tahun tanpa pelanggaran kebijakan spam memiliki probabilitas lebih tinggi untuk lolos dari filter Google Sandbox.'
        }
      ];

  return (
    <section className="w-full my-12 pt-8 border-t border-slate-200 dark:border-slate-800" id="panduan-seo">
      {/* Editorial Header */}
      <ScrollReveal direction="up" distance={16}>
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2">
            <BookOpen className="w-4 h-4" />
            <span>{isEn ? 'Comprehensive SEO & Metric Guide' : 'Panduan Komprehensif SEO & Metrik Domain'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            {isEn
              ? 'Understanding Domain Authority, DR, & Spam Score Metrics'
              : 'Panduan Lengkap Memahami DA, PA, DR & Spam Score Website'}
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            {isEn
              ? 'Learn how search engine algorithms evaluate website credibility, backlink equity, and how to maintain a healthy authority profile.'
              : 'Pelajari bagaimana algoritma mesin pencari menilai kredibilitas domain Anda, cara menganalisis profil tautan balik, serta langkah teruji mempertahankan kesehatan otoritas website.'}
          </p>
        </div>
      </ScrollReveal>

      {/* 4 Feature Pillar Cards */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10" staggerDelay={0.07}>
        <StaggerItem>
          <article className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors h-full">
            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="p-2 bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 rounded-lg">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                {isEn ? '1. Domain Authority (DA) & Page Authority (PA)' : '1. Domain Authority (DA) & Page Authority (PA)'}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {isEn
                ? 'Moz DA predicts ranking ability on a 1-100 logarithmic scale. Higher authority correlates with stronger competitive keyword ranking potential across Google SERPs.'
                : 'DA Moz mencerminkan kekuatan peringkat seluruh subdomain dan subdirektori web pada skala 1-100. Semakin mendekati angka 100, semakin besar peluang artikel Anda menduduki halaman pertama Google untuk kata kunci bersaing.'}
            </p>
          </article>
        </StaggerItem>

        <StaggerItem>
          <article className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors h-full">
            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="p-2 bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 rounded-lg">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                {isEn ? '2. Domain Rating (DR) by Ahrefs' : '2. Domain Rating (DR) Ahrefs'}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {isEn
                ? 'Ahrefs DR measures the strength of a target domain backlink profile compared to all other sites in the global database. Focused heavily on high-trust dofollow referring domains.'
                : 'Domain Rating (DR) berfokus pada kuantitas dan kualitas Referring Domains unik yang memberikan tautan dofollow ke domain Anda, mencerminkan kekuatan Link Juice murni.'}
            </p>
          </article>
        </StaggerItem>

        <StaggerItem>
          <article className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors h-full">
            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="p-2 bg-rose-50 dark:bg-rose-950/70 text-rose-600 dark:text-rose-400 rounded-lg">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                {isEn ? '3. Spam Score & Risk Mitigation' : '3. Spam Score (SS) & Solusi Penurunan'}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {isEn
                ? 'Spam Score calculates similarity to domains that have been penalized or de-indexed by search engines. Keep Spam Score below 10% for optimal organic ranking security.'
                : 'Spam Score adalah indikator persentase situs web sejenis yang pernah terkena sanksi Google. Nilai SS tinggi umumnya dipicu oleh lonjakan backlink spam atau domain bekas yang disalahgunakan.'}
            </p>
          </article>
        </StaggerItem>

        <StaggerItem>
          <article className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors h-full">
            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="p-2 bg-amber-50 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400 rounded-lg">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                {isEn ? '4. Nofollow, Redirect, and Deleted Backlinks' : '4. Peranan Backlink Nofollow, Redirect, & Deleted'}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {isEn
                ? 'A natural link profile includes a healthy blend of dofollow and nofollow links. 301 redirects preserve link authority from discontinued or relocated page URLs.'
                : 'Profil backlink yang alami memiliki variasi seimbang antara dofollow dan nofollow. Tautan redirect (301) membantu mengalihkan authority halaman lama ke halaman baru secara utuh.'}
            </p>
          </article>
        </StaggerItem>
      </StaggerContainer>

      {/* Responsive Display Ad Slot: Di Atas Tabel Komparasi */}
      <div className="w-full my-6 flex justify-center overflow-visible">
        <AdSenseBanner slot="5462390377" />
      </div>

      {/* Comparison Table */}
      <ScrollReveal direction="up" distance={18} delay={0.05}>
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden mb-12 shadow-2xs">
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
            {isEn ? 'Key SEO Metric Comparison Matrix' : 'Tabel Komparasi Metrik SEO Utama'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {isEn ? 'Core evaluation dimensions across authority indicators.' : 'Karakteristik metrik authority untuk mengevaluasi kualitas domain.'}
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Metric</th>
                <th className="py-2.5 px-3">Provider</th>
                <th className="py-2.5 px-3">Scale</th>
                <th className="py-2.5 px-3">Focus Area</th>
                <th className="py-2.5 px-3">Target Ideal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-600 dark:text-slate-300 font-sans">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">DA (Domain Authority)</td>
                <td className="py-2.5 px-3">Moz</td>
                <td className="py-2.5 px-3 font-data">1 - 100</td>
                <td className="py-2.5 px-3">{isEn ? 'Overall domain ranking probability' : 'Prediksi peringkat domain keseluruhan'}</td>
                <td className="py-2.5 px-3 text-emerald-600 dark:text-emerald-400 font-semibold">&gt; 35 (Good) / &gt; 50 (Excellent)</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">PA (Page Authority)</td>
                <td className="py-2.5 px-3">Moz</td>
                <td className="py-2.5 px-3 font-data">1 - 100</td>
                <td className="py-2.5 px-3">{isEn ? 'Single URL ranking strength' : 'Prediksi peringkat URL halaman spesifik'}</td>
                <td className="py-2.5 px-3 text-emerald-600 dark:text-emerald-400 font-semibold">&gt; 30</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">DR (Domain Rating)</td>
                <td className="py-2.5 px-3">Ahrefs</td>
                <td className="py-2.5 px-3 font-data">0.1 - 100</td>
                <td className="py-2.5 px-3">{isEn ? 'Unique referring domains equity' : 'Kualitas & kuantitas referring domain dofollow'}</td>
                <td className="py-2.5 px-3 text-emerald-600 dark:text-emerald-400 font-semibold">&gt; 35 (Competitive)</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">Spam Score (SS)</td>
                <td className="py-2.5 px-3">Moz</td>
                <td className="py-2.5 px-3 font-data">1% - 100%</td>
                <td className="py-2.5 px-3">{isEn ? 'Penalty similarity signals' : 'Tingkat kemiripan sinyal spam web'}</td>
                <td className="py-2.5 px-3 text-emerald-600 dark:text-emerald-400 font-semibold">&lt; 10% (Clean & Safe)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      </ScrollReveal>

      {/* Responsive Display Ad Slot: Dibawah Panduan Memahami DA PA */}
      <div className="w-full my-6 flex justify-center overflow-visible">
        <AdSenseBanner slot="5462390377" />
      </div>

      {/* Frequently Asked Questions (FAQ) with Accordion */}
      <ScrollReveal direction="up" distance={18} delay={0.08}>
      <div className="bg-slate-50 dark:bg-slate-900/60 rounded-xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800" id="faq">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            {isEn ? 'Frequently Asked Questions (FAQ)' : 'Pertanyaan yang Sering Diajukan (FAQ)'}
          </h3>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden transition-all shadow-2xs"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left py-3.5 px-4 flex items-center justify-between gap-3 text-slate-900 dark:text-white font-semibold text-xs sm:text-sm hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Semantic Keyword Cloud: High-Volume Page One Search Queries */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-3">
            <Tag className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              {isEn ? 'Top Search Keywords & Topics' : 'Pencarian Terkait Cek DA PA Website & Blog'}
            </h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              'cek da pa',
              'cek da pa dr',
              'cek da pa website',
              'cek da pa blog',
              'cek da pa blogspot',
              'cek da pa wordpress',
              'cek domain authority moz',
              'cek page authority pa',
              'cek domain rating ahrefs',
              'cek spam score moz',
              'bulk da pa checker',
              'cek umur domain whois',
              'cek backlink dofollow nofollow',
              'cek da pa gratis online',
              'alat cek da pa indonesia',
              'cara cek da pa website',
              'free domain authority checker',
              'check moz da pa score online',
              'jasa naikin da moz driacom',
              'jasa naikin dr ahrefs driacom'
            ].map((keyword, i) => (
              <span
                key={i}
                className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-medium bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-2xs hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors select-none"
              >
                #{keyword}
              </span>
            ))}
          </div>
        </div>
      </div>
      </ScrollReveal>
    </section>
  );
};
