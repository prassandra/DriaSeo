export type Language = 'id' | 'en';

export interface Translations {
  appName: string;
  tagline: string;
  customDomainLabel: string;
  customDomainBadge: string;
  nav: {
    checkMetric: string;
    services: string;
    guide: string;
    faq: string;
    sampleDomain: string;
    adsSlot: string;
  };
  hero: {
    title: string;
    subtitle: string;
    placeholder: string;
    counterLabel: string;
    quickSample: string;
    clear: string;
    checkButton: string;
    checkingButton: string;
  };
  promo: {
    badge: string;
    heading: string;
    subheading: string;
    daService: {
      title: string;
      badge: string;
      desc: string;
      benefitsTitle: string;
      benefits: string[];
      cta: string;
      url: string;
    };
    drService: {
      title: string;
      badge: string;
      desc: string;
      benefitsTitle: string;
      benefits: string[];
      cta: string;
      url: string;
    };
  };
  results: {
    title: string;
    subtitle: string;
    exportCsv: string;
    copyAll: string;
    copied: string;
    copySummary: string;
    visitSite: string;
    dnsDetails: string;
    hideDetails: string;
    aiAuditButton: string;
    spamAlert: string;
    tableHeaders: {
      da: string;
      pa: string;
      ss: string;
      dr: string;
      mt: string;
      mr: string;
      backlink: string;
      domainAge: string;
      nofollow: string;
      redirect: string;
      deleted: string;
      registered: string;
      expired: string;
    };
    serverInfo: {
      ip: string;
      registrar: string;
      sslStatus: string;
      sslActive: string;
      responseTime: string;
      nameservers: string;
    };
  };
  aiModal: {
    title: string;
    subtitle: string;
    loading: string;
    needHelpTitle: string;
    needHelpDesc: string;
    copyResult: string;
    close: string;
  };
  footer: {
    desc: string;
    poweredBy: string;
    quickLinks: string;
    partners: string;
    rightsReserved: string;
    createdBy: string;
  };
}

export const translations: Record<Language, Translations> = {
  id: {
    appName: 'DriaSeo',
    tagline: 'Cek DA, PA, DR, Spam Score & Backlink Otomatis',
    customDomainLabel: 'Website Resmi:',
    customDomainBadge: 'https://driacom.com',
    nav: {
      checkMetric: 'Cek Metrik',
      services: 'Manfaat DA & DR',
      guide: 'Panduan SEO',
      faq: 'FAQ',
      sampleDomain: 'Contoh Domain',
      adsSlot: 'Slot Iklan',
    },
    hero: {
      title: 'DriaSeo - Cek Metrik Domain Authority & Rating',
      subtitle: 'Tool otomatis dan akurat untuk memeriksa Moz Domain Authority (DA), Page Authority (PA), Ahrefs Domain Rating (DR), Spam Score, Backlinks, dan Umur Domain.',
      placeholder: 'Domain / URL Disini... ({count}/10)',
      counterLabel: '{count}/10 Domain',
      quickSample: 'Contoh Cepat:',
      clear: 'Bersihkan',
      checkButton: 'CEK METRIK DOMAIN',
      checkingButton: 'MEMERIKSA METRIK DOMAIN...',
    },
    promo: {
      badge: 'Solusi Pertumbuhan Website dari Driacom',
      heading: 'Manfaat Nyata DA & DR untuk Perkembangan Website Anda',
      subheading: 'Memahami pentingnya otoritas dan kualitas profil backlink secara objektif tanpa overclaim untuk keberlanjutan performa SEO jangka panjang.',
      daService: {
        title: 'Manfaat Domain Authority (DA) untuk Website',
        badge: 'Otoritas Domain (Moz)',
        desc: 'Domain Authority (DA) mencerminkan reputasi dan kekuatan keseluruhan domain Anda di mata mesin pencari.',
        benefitsTitle: 'Manfaat Utama Peningkatan DA:',
        benefits: [
          'Membantu halaman website bersaing lebih baik untuk kata kunci target pada hasil pencarian (SERP).',
          'Mempercepat proses perayapan (crawling) dan pengindeksan artikel/halaman baru di Google.',
          'Meningkatkan nilai kredibilitas website bagi calon mitra bisnis, sponsorship, dan advertorial.',
          'Memperkuat distribusi otoritas (link equity) ke seluruh halaman internal di dalam situs.',
        ],
        cta: 'Kunjungi Layanan DA di da.driacom.com →',
        url: 'https://da.driacom.com',
      },
      drService: {
        title: 'Manfaat Domain Rating (DR) untuk Website',
        badge: 'Profil Backlink (Ahrefs)',
        desc: 'Domain Rating (DR) mengukur kekuatan profil backlink dari referring domains independen yang mengarah ke website Anda.',
        benefitsTitle: 'Manfaat Utama Peningkatan DR:',
        benefits: [
          'Mengukur seberapa kuat dan berkualitas pondasi tautan masuk dari domain rujukan terpercaya.',
          'Memperkuat aliran link juice untuk membantu menjaga kestabilan posisi halaman penting di Google.',
          'Mempermudah membandingkan kekuatan profil tautan website Anda terhadap domain kompetitor industri.',
          'Mendukung pertumbuhan visibilitas organik website secara lebih terstruktur dan berkesinambungan.',
        ],
        cta: 'Kunjungi Layanan DR di dr.driacom.com →',
        url: 'https://dr.driacom.com',
      },
    },
    results: {
      title: 'Hasil Pemeriksaan Metrik',
      subtitle: 'Data diperbarui secara real-time berdasarkan query RDAP WHOIS, DNS Google, dan evaluasi authority.',
      exportCsv: 'Ekspor CSV',
      copyAll: 'Salin Semua',
      copied: 'Tersalin!',
      copySummary: 'Salin',
      visitSite: 'Kunjungi Website',
      dnsDetails: 'Detail DNS & Server',
      hideDetails: 'Tutup Detail',
      aiAuditButton: 'Audit SEO & Solusi Spam (AI)',
      spamAlert: 'Spam Score Perlu Perhatian',
      tableHeaders: {
        da: 'DA',
        pa: 'PA',
        ss: 'SS',
        dr: 'DR',
        mt: 'MT',
        mr: 'MR',
        backlink: 'BACKLINK',
        domainAge: 'UMUR DOMAIN',
        nofollow: 'NOFOLLOW',
        redirect: 'REDIRECT',
        deleted: 'DELETED',
        registered: 'DAFTAR',
        expired: 'EXPIRED',
      },
      serverInfo: {
        ip: 'IP Server / Host:',
        registrar: 'Registrar:',
        sslStatus: 'Status SSL & HTTP:',
        sslActive: 'SSL Aktif',
        responseTime: 'Kecepatan Respon:',
        nameservers: 'Nameservers (DNS):',
      },
    },
    aiModal: {
      title: 'Analisis SEO & Solusi Spam Score',
      subtitle: 'Diagnosis otomatis dengan rekomendasi optimasi praktis.',
      loading: 'Menganalisis parameter SEO domain dengan AI...',
      needHelpTitle: 'Butuh Bantuan Optimasi Backlink & Jasa SEO?',
      needHelpDesc: 'Konsultasikan pertumbuhan organik dan peningkatan DA/DR website Anda bersama tim profesional',
      copyResult: 'Salin Hasil Audit',
      close: 'Tutup',
    },
    footer: {
      desc: 'DriaSeo Checker adalah platform otomatis untuk memeriksa Domain Authority (DA Moz), Page Authority (PA), Domain Rating (DR Ahrefs), Spam Score, Backlinks, dan Umur Domain.',
      poweredBy: '',
      quickLinks: 'Navigasi Tools',
      partners: 'Layanan & Partner Driacom',
      rightsReserved: 'Seluruh hak cipta dilindungi.',
      createdBy: 'Created by',
    },
  },
  en: {
    appName: 'DriaSeo',
    tagline: 'Automatic DA, PA, DR, Spam Score & Backlink Checker',
    customDomainLabel: 'Official Website:',
    customDomainBadge: 'https://driacom.com',
    nav: {
      checkMetric: 'Check Metrics',
      services: 'DA & DR Benefits',
      guide: 'SEO Guide',
      faq: 'FAQ',
      sampleDomain: 'Sample Domains',
      adsSlot: 'Ad Slots',
    },
    hero: {
      title: 'DriaSeo - Domain Authority & Rating Checker',
      subtitle: 'Free, automated, and accurate tool to check Moz Domain Authority (DA), Page Authority (PA), Ahrefs Domain Rating (DR), Spam Score, Backlinks, and Domain Age.',
      placeholder: 'Enter Domain / URL here... ({count}/10)',
      counterLabel: '{count}/10 Domains',
      quickSample: 'Quick Samples:',
      clear: 'Clear',
      checkButton: 'CHECK DOMAIN METRICS',
      checkingButton: 'CHECKING DOMAIN METRICS...',
    },
    promo: {
      badge: 'Website Growth Solutions by Driacom',
      heading: 'Real Benefits of DA & DR for Your Website Growth',
      subheading: 'Understand the objective value of domain authority and backlink quality without overclaiming to sustain healthy, long-term SEO performance.',
      daService: {
        title: 'Benefits of Domain Authority (DA) for Websites',
        badge: 'Domain Authority (Moz)',
        desc: 'Domain Authority (DA) reflects your domain overall reputation and competitive standing in search engine ranking models.',
        benefitsTitle: 'Key Benefits of Improving DA:',
        benefits: [
          'Helps content compete more effectively for targeted search queries on Google SERPs.',
          'Accelerates search bot crawling frequency and indexing of newly published pages.',
          'Enhances website credibility for sponsorships, business partnerships, and advertorials.',
          'Strengthens internal link equity flow to critical landing and pillar pages.',
        ],
        cta: 'Visit DA Service at da.driacom.com →',
        url: 'https://da.driacom.com',
      },
      drService: {
        title: 'Benefits of Domain Rating (DR) for Websites',
        badge: 'Backlink Strength (Ahrefs)',
        desc: 'Domain Rating (DR) evaluates the collective strength and quality of unique referring domains linking to your website.',
        benefitsTitle: 'Key Benefits of Improving DR:',
        benefits: [
          'Measures the robustness and trust level of incoming links from reputable websites.',
          'Fortifies link juice equity to help sustain ranking positions during algorithm updates.',
          'Enables clear, objective competitive benchmarking against niche industry peers.',
          'Supports long-term organic reach and search presence across a broader keyword footprint.',
        ],
        cta: 'Visit DR Service at dr.driacom.com →',
        url: 'https://dr.driacom.com',
      },
    },
    results: {
      title: 'Domain Metric Results',
      subtitle: 'Real-time data retrieved from RDAP WHOIS, Google Public DNS, and authority evaluation engines.',
      exportCsv: 'Export CSV',
      copyAll: 'Copy All',
      copied: 'Copied!',
      copySummary: 'Copy',
      visitSite: 'Visit Website',
      dnsDetails: 'DNS & Server Details',
      hideDetails: 'Hide Details',
      aiAuditButton: 'AI SEO & Spam Audit',
      spamAlert: 'Spam Score Warning',
      tableHeaders: {
        da: 'DA',
        pa: 'PA',
        ss: 'SS',
        dr: 'DR',
        mt: 'MT',
        mr: 'MR',
        backlink: 'BACKLINK',
        domainAge: 'DOMAIN AGE',
        nofollow: 'NOFOLLOW',
        redirect: 'REDIRECT',
        deleted: 'DELETED',
        registered: 'REGISTERED',
        expired: 'EXPIRED',
      },
      serverInfo: {
        ip: 'Server IP / Host:',
        registrar: 'Registrar:',
        sslStatus: 'SSL & HTTP Status:',
        sslActive: 'Active SSL',
        responseTime: 'Response Time:',
        nameservers: 'Nameservers (DNS):',
      },
    },
    aiModal: {
      title: 'SEO Audit & Spam Score Solution',
      subtitle: 'Automated diagnostic with actionable tactical recommendations.',
      loading: 'Analyzing domain SEO parameters with AI...',
      needHelpTitle: 'Need Professional Link Building & SEO Services?',
      needHelpDesc: 'Consult your organic search growth and DA/DR improvement with the professional team at',
      copyResult: 'Copy Audit Result',
      close: 'Close',
    },
    footer: {
      desc: 'DriaSeo Checker is an automated tool to inspect Domain Authority (DA Moz), Page Authority (PA), Domain Rating (DR Ahrefs), Spam Score, Backlinks, and Domain Age.',
      poweredBy: '',
      quickLinks: 'Tool Navigation',
      partners: 'Driacom Services & Partners',
      rightsReserved: 'All rights reserved.',
      createdBy: 'Created by',
    },
  },
};
