[README(1).md](https://github.com/user-attachments/files/26369091/README.1.md)
# 🐟 Raja Laut Seafood Restaurant – Website

Website profesional untuk **Raja Laut Seafood Restaurant**, Makassar, Sulawesi Selatan.

## 🌊 Fitur Website

- **Hero Section** – Animasi gelombang laut, bubble, counter statistik
- **Tentang Kami** – Sejarah dan keunggulan restoran
- **Menu** – Filter kategori (Ikan, Udang, Cumi, Kepiting, Lobster, Minuman) dengan anchor link per menu
- **Promo Spesial** – Penawaran dan paket menarik
- **Tim Karyawan** – Profil lengkap setiap karyawan
- **Galeri** – Grid foto interaktif
- **Ulasan Pelanggan** – Rating dan testimoni
- **Form Reservasi** – Terintegrasi langsung ke WhatsApp
- **Kontak & Lokasi** – Peta interaktif dan media sosial
- **Floating WhatsApp Button** – Chat reservasi cepat
- **Anchor Links** – Navigasi mulus antar semua section

## 📁 Struktur File

```
raja-laut/
├── index.html          # Halaman utama
├── css/
│   └── style.css       # Stylesheet utama
├── js/
│   └── main.js         # JavaScript interaktif
├── images/
│   └── logo.png        # Logo Raja Laut
└── README.md
```

## 🚀 Cara Deploy ke GitHub Pages

### Langkah 1 – Buat Repository GitHub

1. Login ke [github.com](https://github.com)
2. Klik tombol **"New"** atau **"+"** → **New repository**
3. Nama repository: `raja-laut` (atau nama lain)
4. Set ke **Public**
5. Klik **Create repository**

### Langkah 2 – Upload File

**Cara A – Via GitHub Website (mudah):**
1. Di halaman repository baru, klik **"uploading an existing file"**
2. Drag & drop semua file dan folder (`index.html`, `css/`, `js/`, `images/`)
3. Scroll bawah → klik **"Commit changes"**

**Cara B – Via Git (terminal):**
```bash
git init
git add .
git commit -m "Initial commit: Raja Laut Website"
git branch -M main
git remote add origin https://github.com/USERNAME/raja-laut.git
git push -u origin main
```

### Langkah 3 – Aktifkan GitHub Pages

1. Buka **Settings** di repository
2. Scroll ke bagian **"Pages"** (di sidebar kiri)
3. Di bawah **"Source"**, pilih **"Deploy from a branch"**
4. Branch: **main**, Folder: **/ (root)**
5. Klik **Save**

### Langkah 4 – Akses Website

Setelah 1-2 menit, website Anda akan live di:
```
https://USERNAME.github.io/raja-laut/
```

## ✏️ Cara Kustomisasi

### Ganti Nomor WhatsApp
Cari dan ganti `6281234567890` di:
- `index.html` (wa-float link)
- `js/main.js` (form reservasi)

### Ganti Alamat & Kontak
Edit di `index.html` bagian **#kontak**

### Tambah/Edit Menu
Tambah `<article class="menu-card" data-cat="KATEGORI" id="menu-NAMA">` di bagian `#menu`

### Ubah Warna
Edit CSS variables di `css/style.css` bagian `:root { }`

## 📱 Responsif

Website sudah responsif untuk:
- 📱 Mobile (< 480px)
- 📱 Tablet (< 768px)
- 💻 Desktop (> 768px)

## 🔧 Teknologi

- HTML5 semantik + ARIA accessibility
- CSS3 (Variables, Grid, Flexbox, Animations)
- Vanilla JavaScript (ES6+)
- Font Awesome 6 Icons
- Google Fonts (Playfair Display + Barlow)

---
**Raja Laut Seafood Restaurant** © 2024 – Makassar, Sulawesi Selatan 🦀
