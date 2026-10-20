import { DomainMetricResult } from '../types';

/**
 * Utility helper to draw rounded rectangles on HTML5 Canvas
 */
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

/**
 * Generates and downloads a high-resolution PNG image of a single domain's metric breakdown
 */
export async function downloadDomainMetricImage(data: DomainMetricResult): Promise<void> {
  const width = 1200;
  const height = 750;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // 1. Background: Deep luxury slate/navy gradient
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#090D16');
  bgGrad.addColorStop(0.5, '#0F172A');
  bgGrad.addColorStop(1, '#080D1A');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Subtle decorative ambient lighting orbs
  const orb1 = ctx.createRadialGradient(200, 150, 20, 200, 150, 400);
  orb1.addColorStop(0, 'rgba(16, 185, 129, 0.15)');
  orb1.addColorStop(1, 'rgba(16, 185, 129, 0)');
  ctx.fillStyle = orb1;
  ctx.fillRect(0, 0, width, height);

  const orb2 = ctx.createRadialGradient(1000, 600, 20, 1000, 600, 450);
  orb2.addColorStop(0, 'rgba(14, 165, 233, 0.12)');
  orb2.addColorStop(1, 'rgba(14, 165, 233, 0)');
  ctx.fillStyle = orb2;
  ctx.fillRect(0, 0, width, height);

  // Inner card container
  const padding = 36;
  const cardW = width - padding * 2;
  const cardH = height - padding * 2;
  ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
  roundRect(ctx, padding, padding, cardW, cardH, 24);
  ctx.fill();
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.stroke();

  // 2. Header Bar
  // Logo icon badge
  ctx.fillStyle = '#059669';
  roundRect(ctx, padding + 24, padding + 24, 44, 44, 12);
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 24px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillText('D', padding + 37, padding + 54);

  // Logo text
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 22px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillText('DriaSeo', padding + 80, padding + 43);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '500 13px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillText('by Driacom · driacom.com', padding + 80, padding + 61);

  // Date & Tag badge
  const dateStr = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const tagText = `LAPORAN RESMI · ${dateStr}`;
  ctx.font = 'bold 12px "Plus Jakarta Sans", system-ui, sans-serif';
  const tagWidth = ctx.measureText(tagText).width;

  ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
  roundRect(ctx, width - padding - tagWidth - 44, padding + 28, tagWidth + 24, 32, 16);
  ctx.fill();
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
  ctx.stroke();

  ctx.fillStyle = '#34D399';
  ctx.fillText(tagText, width - padding - tagWidth - 32, padding + 49);

  // Horizontal divider
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.beginPath();
  ctx.moveTo(padding + 24, padding + 86);
  ctx.lineTo(width - padding - 24, padding + 86);
  ctx.stroke();

  // 3. Domain Hero Bar
  const daInt = Math.round(Number(data.da));
  const paInt = Math.round(Number(data.pa));
  const drInt = Math.round(Number(data.dr));
  const ssInt = Math.round(Number(data.ssNum));

  // Domain Name
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 32px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillText(data.domain.toUpperCase(), padding + 24, padding + 132);

  // Authority Tier Badge
  let tierLabel = 'Growing Domain';
  let tierColor = '#94A3B8';
  let tierBg = 'rgba(148, 163, 184, 0.15)';
  let tierBorder = 'rgba(148, 163, 184, 0.4)';

  if (daInt >= 70) {
    tierLabel = 'TOP TIER AUTHORITY';
    tierColor = '#34D399';
    tierBg = 'rgba(52, 211, 153, 0.15)';
    tierBorder = 'rgba(52, 211, 153, 0.5)';
  } else if (daInt >= 45) {
    tierLabel = 'HIGH AUTHORITY';
    tierColor = '#38BDF8';
    tierBg = 'rgba(56, 189, 248, 0.15)';
    tierBorder = 'rgba(56, 189, 248, 0.5)';
  } else if (daInt >= 25) {
    tierLabel = 'MEDIUM AUTHORITY';
    tierColor = '#FBBF24';
    tierBg = 'rgba(251, 191, 36, 0.15)';
    tierBorder = 'rgba(251, 191, 36, 0.5)';
  }

  const domainWidth = ctx.measureText(data.domain.toUpperCase()).width;
  ctx.font = 'bold 11px "Plus Jakarta Sans", system-ui, sans-serif';
  const tierWidth = ctx.measureText(tierLabel).width;
  const badgeX = padding + 24 + domainWidth + 16;
  if (badgeX + tierWidth + 20 < width - padding - 150) {
    ctx.fillStyle = tierBg;
    roundRect(ctx, badgeX, padding + 110, tierWidth + 20, 26, 13);
    ctx.fill();
    ctx.strokeStyle = tierBorder;
    ctx.stroke();
    ctx.fillStyle = tierColor;
    ctx.fillText(tierLabel, badgeX + 10, padding + 127);
  }

  // Moz Trust & Rank on top right
  ctx.fillStyle = '#94A3B8';
  ctx.font = '600 13px "JetBrains Mono", monospace';
  const mtText = `Moz Trust: ${data.mt}  |  Moz Rank: ${data.mr}`;
  const mtWidth = ctx.measureText(mtText).width;
  ctx.fillText(mtText, width - padding - 24 - mtWidth, padding + 128);

  // 4. Four Main Metric Score Cards
  const cardGap = 16;
  const cardAreaW = cardW - 48;
  const metricCardW = (cardAreaW - cardGap * 3) / 4;
  const metricCardH = 145;
  const metricCardY = padding + 160;

  const metrics = [
    {
      title: 'Domain Authority',
      code: 'DA (Moz)',
      value: `${daInt}`,
      denom: '/100',
      accent: '#38BDF8', // sky
      bg: 'rgba(56, 189, 248, 0.08)',
      border: 'rgba(56, 189, 248, 0.25)',
      desc: 'Kekuatan Peringkat Domain',
    },
    {
      title: 'Page Authority',
      code: 'PA (Moz)',
      value: `${paInt}`,
      denom: '/100',
      accent: '#34D399', // emerald
      bg: 'rgba(52, 211, 153, 0.08)',
      border: 'rgba(52, 211, 153, 0.25)',
      desc: 'Otoritas Halaman Utama',
    },
    {
      title: 'Domain Rating',
      code: 'DR (Ahrefs)',
      value: `${drInt}`,
      denom: '/100',
      accent: '#A78BFA', // purple
      bg: 'rgba(167, 139, 250, 0.08)',
      border: 'rgba(167, 139, 250, 0.25)',
      desc: 'Kualitas Link Referring',
    },
    {
      title: 'Spam Score',
      code: 'SS (Moz)',
      value: `${ssInt}%`,
      denom: ssInt <= 10 ? 'Bersih' : ssInt <= 30 ? 'Wajar' : 'Tinggi',
      accent: ssInt <= 10 ? '#34D399' : ssInt <= 30 ? '#FBBF24' : '#FB7185',
      bg: ssInt <= 10 ? 'rgba(52, 211, 153, 0.08)' : ssInt <= 30 ? 'rgba(251, 191, 36, 0.08)' : 'rgba(251, 113, 133, 0.08)',
      border: ssInt <= 10 ? 'rgba(52, 211, 153, 0.25)' : ssInt <= 30 ? 'rgba(251, 191, 36, 0.25)' : 'rgba(251, 113, 133, 0.25)',
      desc: ssInt <= 10 ? 'Resiko Penalti Rendah' : 'Pantau Tautan Toksik',
    },
  ];

  metrics.forEach((m, idx) => {
    const mx = padding + 24 + idx * (metricCardW + cardGap);
    
    // Card BG
    ctx.fillStyle = m.bg;
    roundRect(ctx, mx, metricCardY, metricCardW, metricCardH, 16);
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = m.border;
    ctx.stroke();

    // Top label
    ctx.fillStyle = m.accent;
    ctx.font = 'bold 12px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.fillText(m.code, mx + 16, metricCardY + 28);

    // Big Value
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 48px "JetBrains Mono", monospace';
    ctx.fillText(m.value, mx + 16, metricCardY + 80);

    // Denom text
    const valWidth = ctx.measureText(m.value).width;
    ctx.fillStyle = '#94A3B8';
    ctx.font = '600 16px "JetBrains Mono", monospace';
    ctx.fillText(m.denom, mx + 18 + valWidth, metricCardY + 76);

    // Subtitle
    ctx.fillStyle = '#CBD5E1';
    ctx.font = '500 11px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.fillText(m.desc, mx + 16, metricCardY + 118);
  });

  // 5. Lower Two Information Panels
  const panelGap = 20;
  const panelW = (cardAreaW - panelGap) / 2;
  const panelH = 220;
  const panelY = metricCardY + metricCardH + 20;

  // Panel 1: Profil Backlink
  const p1X = padding + 24;
  ctx.fillStyle = 'rgba(30, 41, 59, 0.5)';
  roundRect(ctx, p1X, panelY, panelW, panelH, 16);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.stroke();

  // Header Panel 1
  ctx.fillStyle = '#38BDF8';
  ctx.font = 'bold 14px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillText('🔗  PROFIL & DISTRIBUSI BACKLINK', p1X + 18, panelY + 32);

  // Rows Panel 1
  const backlinkRows = [
    { label: 'Total Backlinks', val: data.backlink || '0' },
    { label: 'Tautan Nofollow', val: data.nofollow || '0' },
    { label: 'Tautan Redirect (301)', val: data.redirect || '0' },
    { label: 'Tautan Dihapus (Deleted)', val: data.deleted || '0' },
  ];

  backlinkRows.forEach((row, i) => {
    const rowY = panelY + 70 + i * 36;
    ctx.fillStyle = '#94A3B8';
    ctx.font = '500 13px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.fillText(row.label, p1X + 20, rowY);

    ctx.fillStyle = '#F8FAFC';
    ctx.font = 'bold 15px "JetBrains Mono", monospace';
    const valW = ctx.measureText(row.val).width;
    ctx.fillText(row.val, p1X + panelW - 20 - valW, rowY);

    // subtle dot separator
    if (i < 3) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.beginPath();
      ctx.moveTo(p1X + 20, rowY + 12);
      ctx.lineTo(p1X + panelW - 20, rowY + 12);
      ctx.stroke();
    }
  });

  // Panel 2: Usia & Registrasi Domain
  const p2X = p1X + panelW + panelGap;
  ctx.fillStyle = 'rgba(30, 41, 59, 0.5)';
  roundRect(ctx, p2X, panelY, panelW, panelH, 16);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.stroke();

  // Header Panel 2
  ctx.fillStyle = '#34D399';
  ctx.font = 'bold 14px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillText('📅  HISTORI & REGISTRASI DOMAIN', p2X + 18, panelY + 32);

  // Rows Panel 2
  const domainRows = [
    { label: 'Umur Domain (Age)', val: data.umurDomain || '-' },
    { label: 'Tanggal Didaftarkan', val: data.daftar || '-' },
    { label: 'Tanggal Kedaluwarsa', val: data.expired || '-' },
    { label: 'Status Kesehatan', val: ssInt <= 10 ? 'Aman & Bersih' : ssInt <= 30 ? 'Toleransi Wajar' : 'Perlu Pengawasan' },
  ];

  domainRows.forEach((row, i) => {
    const rowY = panelY + 70 + i * 36;
    ctx.fillStyle = '#94A3B8';
    ctx.font = '500 13px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.fillText(row.label, p2X + 20, rowY);

    ctx.fillStyle = i === 3 ? (ssInt <= 10 ? '#34D399' : '#FBBF24') : '#F8FAFC';
    ctx.font = i === 3 ? 'bold 13px "Plus Jakarta Sans", system-ui, sans-serif' : 'bold 14px "JetBrains Mono", monospace';
    const valW = ctx.measureText(row.val).width;
    ctx.fillText(row.val, p2X + panelW - 20 - valW, rowY);

    if (i < 3) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.beginPath();
      ctx.moveTo(p2X + 20, rowY + 12);
      ctx.lineTo(p2X + panelW - 20, rowY + 12);
      ctx.stroke();
    }
  });

  // 6. Footer Brand Note
  ctx.fillStyle = '#64748B';
  ctx.font = '500 12px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillText(
    'Dihasilkan secara otomatis melalui DriaSeo (https://driacom.com) · Alat Cek DA PA DR Gratis Resmi Driacom',
    padding + 24,
    height - padding - 20
  );

  ctx.fillStyle = '#10B981';
  ctx.font = 'bold 12px "Plus Jakarta Sans", system-ui, sans-serif';
  const authSig = 'VERIFIED BY DRIACOM';
  const sigW = ctx.measureText(authSig).width;
  ctx.fillText(authSig, width - padding - 24 - sigW, height - padding - 20);

  // 7. Trigger Direct Download
  const cleanDomain = data.domain.replace(/[^a-zA-Z0-9.-]/g, '_');
  const filename = `${cleanDomain}-metrik-driaseo.png`;

  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 'image/png');
}

/**
 * Generates and downloads a summary table matrix image of multiple checked domains
 */
export async function downloadBatchComparisonImage(results: DomainMetricResult[]): Promise<void> {
  const width = 1200;
  const rowH = 50;
  const tableHeaderH = 50;
  const topH = 170;
  const bottomH = 70;
  const height = topH + tableHeaderH + results.length * rowH + bottomH;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Background
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#090D16');
  bgGrad.addColorStop(1, '#0F172A');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  const padding = 36;
  const cardW = width - padding * 2;
  const cardH = height - padding * 2;

  // Card outline
  ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
  roundRect(ctx, padding, padding, cardW, cardH, 20);
  ctx.fill();
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.stroke();

  // Header
  ctx.fillStyle = '#059669';
  roundRect(ctx, padding + 24, padding + 24, 40, 40, 10);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 22px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillText('D', padding + 36, padding + 52);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 22px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillText('DriaSeo · Matriks Analisis Komparasi Otoritas Domain', padding + 76, padding + 44);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '500 13px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillText(`Ringkasan ${results.length} Domain · by Driacom (driacom.com)`, padding + 76, padding + 63);

  // Table Columns Setup
  const tableX = padding + 24;
  const tableW = cardW - 48;
  const tableY = padding + 100;

  // Table Header Background
  ctx.fillStyle = 'rgba(30, 41, 59, 0.9)';
  roundRect(ctx, tableX, tableY, tableW, tableHeaderH, 10);
  ctx.fill();

  const cols = [
    { label: '#', x: tableX + 16, w: 40 },
    { label: 'DOMAIN', x: tableX + 60, w: 260 },
    { label: 'DA (MOZ)', x: tableX + 330, w: 100 },
    { label: 'PA (MOZ)', x: tableX + 440, w: 100 },
    { label: 'DR (AHREFS)', x: tableX + 550, w: 110 },
    { label: 'SPAM SCORE', x: tableX + 670, w: 120 },
    { label: 'BACKLINKS', x: tableX + 800, w: 140 },
    { label: 'UMUR DOMAIN', x: tableX + 950, w: 150 },
  ];

  ctx.fillStyle = '#94A3B8';
  ctx.font = 'bold 11px "Plus Jakarta Sans", system-ui, sans-serif';
  cols.forEach((col) => {
    ctx.fillText(col.label, col.x, tableY + 30);
  });

  // Table Rows
  results.forEach((row, idx) => {
    const ry = tableY + tableHeaderH + idx * rowH;

    // Alternating Row BG
    if (idx % 2 === 0) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
      roundRect(ctx, tableX, ry, tableW, rowH - 2, 6);
      ctx.fill();
    }

    const daInt = Math.round(Number(row.da));
    const paInt = Math.round(Number(row.pa));
    const drInt = Math.round(Number(row.dr));
    const ssInt = Math.round(Number(row.ssNum));

    // # index
    ctx.fillStyle = '#64748B';
    ctx.font = 'bold 12px "JetBrains Mono", monospace';
    ctx.fillText(String(idx + 1), cols[0].x, ry + 30);

    // Domain
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 14px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.fillText(row.domain, cols[1].x, ry + 30);

    // DA
    ctx.fillStyle = '#38BDF8';
    ctx.font = 'bold 15px "JetBrains Mono", monospace';
    ctx.fillText(String(daInt), cols[2].x, ry + 30);

    // PA
    ctx.fillStyle = '#34D399';
    ctx.font = 'bold 15px "JetBrains Mono", monospace';
    ctx.fillText(String(paInt), cols[3].x, ry + 30);

    // DR
    ctx.fillStyle = '#A78BFA';
    ctx.font = 'bold 15px "JetBrains Mono", monospace';
    ctx.fillText(String(drInt), cols[4].x, ry + 30);

    // SS
    ctx.fillStyle = ssInt <= 10 ? '#34D399' : ssInt <= 30 ? '#FBBF24' : '#FB7185';
    ctx.font = 'bold 14px "JetBrains Mono", monospace';
    ctx.fillText(`${ssInt}%`, cols[5].x, ry + 30);

    // Backlinks
    ctx.fillStyle = '#E2E8F0';
    ctx.font = '500 13px "JetBrains Mono", monospace';
    ctx.fillText(row.backlink || '0', cols[6].x, ry + 30);

    // Umur Domain
    ctx.fillStyle = '#94A3B8';
    ctx.font = '500 12px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.fillText(row.umurDomain || '-', cols[7].x, ry + 30);

    // Row divider
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.beginPath();
    ctx.moveTo(tableX, ry + rowH);
    ctx.lineTo(tableX + tableW, ry + rowH);
    ctx.stroke();
  });

  // Footer Note
  const footerY = height - padding - 20;
  ctx.fillStyle = '#64748B';
  ctx.font = '500 12px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillText(
    'DriaSeo · Alat Cek DA PA DR Gratis Resmi Driacom (https://driacom.com)',
    padding + 24,
    footerY
  );

  const filename = `matriks-komparasi-driaseo-${results.length}-domain.png`;

  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 'image/png');
}
