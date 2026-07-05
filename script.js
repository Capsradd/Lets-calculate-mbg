const PER_DETIK = 855_000_000_000 / 86400;

const input = document.getElementById('calcInput');
const btn = document.getElementById('calcBtn');
const error = document.getElementById('calcError');
const result = document.getElementById('calcResult');

const rDays = document.getElementById('resDays');
const rHours = document.getElementById('resHours');
const rMinutes = document.getElementById('resMinutes');
const rSeconds = document.getElementById('resSeconds');
const totalLabel = document.getElementById('totalSec');

function formatRupiah(num) {
  const parts = Math.round(num).toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return 'Rp ' + parts.join(',');
}

function formatNumber(num) {
  return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function parseInput(str) {
  const cleaned = str.replace(/\./g, '').replace(/[^0-9]/g, '');
  if (cleaned === '') return { valid: true, value: 0 };
  const val = parseInt(cleaned, 10);
  if (isNaN(val) || val < 0) return { valid: false };
  return { valid: true, value: val };
}

function formatInput(el) {
  const raw = el.value.replace(/\./g, '').replace(/[^0-9]/g, '');
  if (raw === '') { el.value = ''; return; }
  el.value = raw.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function convertDuration(totalSeconds) {
  const d = Math.floor(totalSeconds / 86400);
  const h = Math.floor((totalSeconds % 86400) / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = Math.floor(totalSeconds % 60);
  return { days: d, hours: h, minutes: m, seconds: s };
}

function calculate() {
  const raw = input.value.trim();
  if (raw === '') {
    error.innerHTML = '&nbsp;';
    result.classList.add('hidden');
    return;
  }

  const parsed = parseInput(raw);
  if (!parsed.valid) {
    error.textContent = 'Masukkan angka yang valid.';
    result.classList.add('hidden');
    return;
  }

  error.innerHTML = '&nbsp;';

  if (parsed.value === 0) {
    result.classList.remove('hidden');
    rDays.textContent = '0';
    rHours.textContent = '0';
    rMinutes.textContent = '0';
    rSeconds.textContent = '0';
    totalLabel.textContent = '0';
    return;
  }

  const totalSeconds = parsed.value / PER_DETIK;
  const { days, hours, minutes, seconds } = convertDuration(totalSeconds);

  result.classList.remove('hidden');
  rDays.textContent = formatNumber(days);
  rHours.textContent = formatNumber(hours);
  rMinutes.textContent = formatNumber(minutes);
  rSeconds.textContent = formatNumber(seconds);
  totalLabel.textContent = formatNumber(totalSeconds);
}

input.addEventListener('input', () => { formatInput(input); calculate(); });
btn.addEventListener('click', calculate);
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') { e.preventDefault(); btn.click(); }
});
