const BUDGET = 855_000_000_000;

const items = [
  { id: 'scholarship', emoji: '\uD83C\uDF93', name: 'Beasiswa Mahasiswa', desc: 'Beasiswa penuh 1 mahasiswa S1 sampai lulus', price: 58_000_000 },
  { id: 'school-renov', emoji: '\uD83C\uDFEB', name: 'Renovasi Sekolah', desc: 'Renovasi total 1 sekolah dasar negeri', price: 500_000_000 },
  { id: 'bts-tower', emoji: '\uD83D\uDCE1', name: 'BTS Daerah Terpencil', desc: 'Pengadaan 1 tower BTS di daerah 3T', price: 1_000_000_000 },
  { id: 'puskesmas', emoji: '\uD83C\uDFE5', name: 'Puskesmas Keliling', desc: '1 unit puskesmas keliling + perlengkapan', price: 1_500_000_000 },
  { id: 'bus-sekolah', emoji: '\uD83D\uDE8C', name: 'Bus Sekolah', desc: '1 unit bus sekolah untuk antar-jemput', price: 800_000_000 },
  { id: 'library', emoji: '\uD83D\uDCDA', name: 'Perpustakaan Desa', desc: '1 perpustakaan digital desa lengkap', price: 100_000_000 },
  { id: 'lab-komputer', emoji: '\uD83D\uDCBB', name: 'Lab Komputer', desc: '1 set lab komputer 20 unit', price: 200_000_000 },
  { id: 'ambulans', emoji: '\uD83D\uDE91', name: 'Ambulans Desa', desc: '1 unit ambulans untuk desa terpencil', price: 350_000_000 },
  { id: 'traktor', emoji: '\uD83C\uDF3E', name: 'Traktor Petani', desc: '1 unit traktor untuk kelompok tani', price: 250_000_000 },
  { id: 'solar-panel', emoji: '\u2600\uFE0F', name: 'Panel Surya Desa', desc: 'Panel surya untuk 1 desa off-grid', price: 750_000_000 },
  { id: 'training', emoji: '\uD83E\uDDD1\u200D\uD83C\uDF3E', name: 'Pelatihan Petani', desc: 'Program pelatihan petani 1 batch', price: 50_000_000 },
  { id: 'masjid-renov', emoji: '\uD83C\uDFD7\uFE0F', name: 'Renovasi Masjid', desc: 'Renovasi 1 masjid desa', price: 400_000_000 },
  { id: 'air-bersih', emoji: '\uD83D\uDCA7', name: 'Sumur Bor Desa', desc: 'Pembangunan sumur bor + pipanisasi 1 desa', price: 300_000_000 },
  { id: 'posyandu', emoji: '\uD83D\uDC76', name: 'Posyandu Digital', desc: 'Digitalisasi 1 posyandu + alat ukur', price: 75_000_000 },
  { id: 'perpustakaan-keliling', emoji: '\uD83D\uDE90', name: 'Perpus Keliling', desc: '1 mobil perpustakaan keliling', price: 600_000_000 },
];

const quantities = {};
for (const i of items) quantities[i.id] = 0;

const grid = document.getElementById('itemsGrid');
const remainingDisplay = document.getElementById('remainingDisplay');
const spentDisplay = document.getElementById('spentDisplay');
const progressBar = document.getElementById('progressBar');
const itemsBought = document.getElementById('itemsBought');
const resetBtn = document.getElementById('resetBtn');
const shareBtn = document.getElementById('shareBtn');
const modal = document.getElementById('receiptModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const canvas = document.getElementById('receiptCanvas');
const downloadBtn = document.getElementById('downloadReceiptBtn');

function formatRupiah(num) {
  const parts = Math.round(num).toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return 'Rp\u00a0' + parts.join(',');
}

function formatNum(num) {
  return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function updateUI() {
  const spent = items.reduce((s, i) => s + quantities[i.id] * i.price, 0);
  const remaining = BUDGET - spent;
  const pct = Math.min((spent / BUDGET) * 100, 100);
  const totalItems = items.reduce((s, i) => s + quantities[i.id], 0);

  if (remaining >= 0) {
    remainingDisplay.textContent = formatRupiah(remaining);
    remainingDisplay.className = 'remaining tabular';
  } else {
    remainingDisplay.textContent = '-' + formatRupiah(Math.abs(remaining));
    remainingDisplay.className = 'remaining tabular over';
  }

  spentDisplay.textContent = formatRupiah(spent);
  progressBar.style.width = pct + '%';
  progressBar.className = 'meter-bar-fill' + (pct > 30 ? '' : ' safe');
  itemsBought.textContent = formatNum(totalItems);

  for (const item of items) {
    const qty = quantities[item.id];
    const total = qty * item.price;
    const inputEl = document.getElementById('qty-' + item.id);
    const totalEl = document.getElementById('total-' + item.id);
    const plusBtn = document.getElementById('plus-' + item.id);
    const minusBtn = document.getElementById('minus-' + item.id);

    if (inputEl && document.activeElement !== inputEl) {
      inputEl.value = formatNum(qty);
    }
    if (totalEl) totalEl.textContent = qty > 0 ? formatRupiah(total) : '';
    if (plusBtn) plusBtn.disabled = false;
    if (minusBtn) minusBtn.disabled = qty <= 0;
  }
}

function add(id) {
  quantities[id]++;
  updateUI();
}

function remove(id) {
  if (quantities[id] <= 0) return;
  quantities[id]--;
  updateUI();
}

function setQuantity(id, val) {
  const cleaned = val.replace(/\./g, '').replace(/[^0-9]/g, '');
  const num = cleaned === '' ? 0 : parseInt(cleaned, 10);
  quantities[id] = Math.max(num, 0);
  updateUI();
}

function resetAll() {
  for (const i of items) quantities[i.id] = 0;
  updateUI();
}

// Render items
for (const item of items) {
  const card = document.createElement('div');
  card.className = 'item-card';

  card.innerHTML =
    '<div class="item-head">' +
      '<span class="emoji">' + item.emoji + '</span>' +
      '<div class="info">' +
        '<div class="name">' + item.name + '</div>' +
        '<div class="desc">' + item.desc + '</div>' +
        '<div class="price">' + formatRupiah(item.price) + '</div>' +
      '</div>' +
    '</div>' +
    '<div class="item-footer">' +
      '<div class="total" id="total-' + item.id + '"></div>' +
      '<div class="item-controls">' +
        '<button class="ctrl-btn" data-id="' + item.id + '" data-action="minus">&minus;</button>' +
        '<input id="qty-' + item.id + '" class="qty tabular" type="text" inputmode="numeric" value="0">' +
        '<button class="ctrl-btn" data-id="' + item.id + '" data-action="plus">+</button>' +
      '</div>' +
    '</div>';

  card.querySelector('.ctrl-btn[data-action="plus"]').addEventListener('click', () => add(item.id));
  card.querySelector('.ctrl-btn[data-action="minus"]').addEventListener('click', () => remove(item.id));
  const inp = card.querySelector('#qty-' + item.id);
  inp.addEventListener('input', function () {
    const raw = this.value.replace(/\./g, '').replace(/[^0-9]/g, '');
    if (raw === '') { this.value = ''; return; }
    this.value = raw.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    setQuantity(item.id, raw);
  });
  inp.addEventListener('blur', function () {
    this.value = formatNum(quantities[item.id]);
  });

  grid.appendChild(card);
}

updateUI();
resetBtn.addEventListener('click', resetAll);

// --- Receipt ---
const dpr = window.devicePixelRatio || 1;
const W = 500;

function generateReceipt() {
  const bought = items.filter(i => quantities[i.id] > 0);
  const rowH = 36;
  const H = 190 + bought.length * rowH + 110;
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  canvas.style.width = W + 'px';
  canvas.style.height = H + 'px';
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  ctx.fillStyle = '#111';
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(8, 8, W - 16, H - 16);

  ctx.setLineDash([6, 5]);
  ctx.strokeStyle = '#f87171';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(24, 14);
  ctx.lineTo(W - 24, 14);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = '#fff';
  ctx.font = 'bold 24px Inter, sans-serif';
  ctx.textAlign = 'left';
  const full = 'LETS CALCULATE MBG!';
  const w1 = ctx.measureText('LETS CALCULATE ').width;
  ctx.fillText(full, (W - ctx.measureText(full).width) / 2, 56);
  ctx.fillStyle = '#f87171';
  ctx.fillText('MBG!', (W - ctx.measureText(full).width) / 2 + w1, 56);
  ctx.fillStyle = 'rgba(255,255,255,0.3)';
  ctx.font = '11px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Spend Receipt', W / 2, 78);

  ctx.setLineDash([3, 3]);
  ctx.strokeStyle = 'rgba(255,255,255,0.08)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(32, 96);
  ctx.lineTo(W - 32, 96);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = 'rgba(255,255,255,0.6)';
  ctx.font = '13px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Dengan anggaran Makan Bergizi Gratis, saya memilih:', W / 2, 126);

  ctx.textAlign = 'left';
  let y = 162;
  bought.forEach(function (item, idx) {
    const qty = quantities[item.id];
    const total = qty * item.price;

    if (idx % 2 === 0) {
      ctx.fillStyle = 'rgba(255,255,255,0.03)';
      ctx.fillRect(24, y - 18, W - 48, rowH);
    }

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px Inter, sans-serif';
    ctx.fillText(item.emoji + '  ' + item.name, 36, y);

    ctx.textAlign = 'right';
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.font = '12px Inter, sans-serif';
    ctx.fillText(formatNum(qty) + ' \u00d7 ' + formatRupiah(item.price), W - 36, y - 2);

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px Inter, sans-serif';
    ctx.fillText(formatRupiah(total), W - 36, y + 16);
    ctx.textAlign = 'left';

    y += rowH;
  });

  const spentTotal = bought.reduce((s, i) => s + quantities[i.id] * i.price, 0);
  const remaining = BUDGET - spentTotal;

  y += 4;
  ctx.setLineDash([3, 3]);
  ctx.strokeStyle = 'rgba(255,255,255,0.08)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(32, y);
  ctx.lineTo(W - 32, y);
  ctx.stroke();
  ctx.setLineDash([]);
  y += 20;

  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.font = 'bold 16px Inter, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('Total Belanja', 36, y);
  ctx.textAlign = 'right';
  ctx.fillStyle = '#fff';
  ctx.fillText(formatRupiah(spentTotal), W - 36, y);

  y += 26;
  ctx.textAlign = 'left';
  ctx.font = '12px Inter, sans-serif';
  if (remaining >= 0) {
    ctx.fillStyle = '#34d399';
    ctx.fillText('Sisa anggaran: ' + formatRupiah(remaining), 36, y);
  } else {
    ctx.fillStyle = '#f87171';
    ctx.fillText('Defisit: -' + formatRupiah(Math.abs(remaining)), 36, y);
  }

  y += 40;
  ctx.setLineDash([6, 5]);
  ctx.strokeStyle = '#f87171';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(24, y);
  ctx.lineTo(W - 24, y);
  ctx.stroke();
  ctx.setLineDash([]);

  y += 24;
  ctx.fillStyle = 'rgba(255,255,255,0.2)';
  ctx.font = '11px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Anggaran Makan Bergizi Gratis: Rp 855.000.000.000 / hari', W / 2, y);
}

shareBtn.addEventListener('click', function () {
  if (items.every(i => quantities[i.id] === 0)) {
    alert('Belum ada item yang dibeli.');
    return;
  }
  generateReceipt();
  modal.style.display = 'flex';
});

closeModalBtn.addEventListener('click', () => modal.style.display = 'none');
modal.addEventListener('click', function (e) { if (e.target === modal) modal.style.display = 'none'; });

downloadBtn.addEventListener('click', function () {
  const link = document.createElement('a');
  link.download = 'lets-calculate-mbg-receipt.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
});
