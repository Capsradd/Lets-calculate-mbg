# LETS CALCULATE MBG!

*Project Akhir Mata Kuliah Pendidikan Pancasila*

---

Dashboard landing page brutalist untuk memantau **laju pembakaran anggaran Makan Bergizi Gratis (MBG)** secara real-time. Dibangun dengan data realisasi Badan Gizi Nasional (BGN): **Rp 855 miliar/hari** — setara **Rp 9.895.833/detik**.

## Deskripsi

Halaman ini menyajikan dua perspektif sekaligus: (1) **live counter** yang menghitung akumulasi anggaran terpakai sejak halaman dibuka, dan (2) **enam section data** yang memberi konteks tentang skala, alokasi, dan kontroversi program MBG — mulai dari anatomi anggaran, pengadaan non-makanan (temuan Project Multatuli), krisis keamanan pangan, skandal korupsi Kejaksaan Agung, hingga perdebatan konstitusional di Mahkamah Konstitusi.

Seluruh klaim numerik dilabeli sumber untuk menjaga akurasi dan transparansi.

## Fitur per Halaman

| Halaman | Fungsi |
|---|---|
| `index.html` | Landing dashboard: live burn rate, gauge, RKB comparison, 6 data sections |
| `calculator.html` | Hitung durasi anggaran habis berdasarkan harga barang |
| `spend.html` | Simulasi belanja interaktif dengan 15 item + receipt generator |
| `about.html` | Penjelasan program MBG, tujuan website, dan teknis |

### Interaksi Umum

- **Live counter** menggunakan `requestAnimationFrame` (update 100ms, bukan `setInterval`)
- **Count-up animation** via `IntersectionObserver` (ease-out cubic, 2 detik, sekali jalan)
- **Timeline bar** mengisi horizontal secara progresif saat discroll
- Navbar reusable dari `navbar.js` (auto-detect halaman aktif dari pathname)

## Tech Stack

- **HTML** — struktur halaman
- **Tailwind CSS CDN** — styling utility-first
- **Vanilla JavaScript** — semua logika (tanpa framework/bundler)
- Zero build step, zero backend, zero dependency berat

## Struktur File

```
/
├── index.html         # Landing page utama (yang dideskripsikan di sini)
├── calculator.html    # Kalkulator durasi anggaran
├── spend.html         # Simulasi belanja + receipt
├── about.html         # Halaman tentang MBG
├── navbar.js          # Navigasi reusable (dimuat tiap halaman)
├── script.js          # Logic kalkulator
└── spend.js           # Logic spend + canvas receipt
```

## Cara Menjalankan

### Lokal
Buka `index.html` langsung di browser — semua file static, tidak perlu server.

### GitHub Pages
1. Push repo ke GitHub
2. Settings → Pages → Source: `Deploy from a branch` → `main` → `/ (root)`
3. Selesai. URL: `https://<username>.github.io/<repo>/`

Alternatif: tinggal push ke `main`, enable Pages, langsung live.

## Sumber Data

Seluruh angka dan klaim dalam halaman ini merujuk pada:

1. **UU APBN 2026** — Pagu awal dan final program MBG
2. **Badan Gizi Nasional (BGN)** — Realisasi harian Rp 855 M, revisi pagu, realisasi per periode
3. **Project Multatuli** — Analisis data LKPP belanja BGN 2025 (Rp 6,2 T / 1.089 paket)
4. **LKPP** — Data pengadaan BGN 2025
5. **JPPI** — Data keracunan MBG Jan–Apr 2026
6. **FSGI** — Data keracunan MBG Feb–Mei 2026
7. **Komnas HAM** — Data keracunan dan temuan SLHS SPPG per Mei 2026
8. **Kejaksaan Agung RI** — Penahanan mantan Kepala & Wakil Kepala BGN, 3 Juni 2026
9. **ICW** — Laporan pengadaan mencurigakan ke KPK
10. **Sekretariat Kabinet** — Penghentian sementara MBG 22 Jun–13 Jul 2026
11. **Mahkamah Konstitusi RI** — Perkara uji materi Pasal 22 ayat (3) UU APBN 2026
12. **ELSAM & Perhimpunan Guru Indonesia** — Penggugat uji materi ke MK

## Catatan

Anggaran MBG bersifat **dinamis** dan telah direvisi beberapa kali sepanjang 2026. Seluruh data dalam halaman ini berdasarkan dokumen publik yang tersedia per **pertengahan 2026**. Tidak ada klaim tanpa sumber — setiap angka yang tampil bisa diverifikasi dari lembaga terkait.

---

*Dibuat untuk memenuhi tugas akhir mata kuliah Pendidikan Pancasila.*
