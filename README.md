# 🎬 Movie Search App

Sebuah aplikasi web pencari film real-time yang memungkinkan pengguna mencari informasi film menggunakan **OMDB API**. Dibangun dengan **HTML, CSS, dan JavaScript** murni, serta dilengkapi dengan fitur **autocomplete pencarian**, **filter genre populer**, **detail lengkap film** (sinopsis, rating, cast, dll), dan **trailer otomatis dari YouTube**.

---

## ✨ Fitur Utama

- **🔍 Pencarian Film Real-time** — Cari film berdasarkan judul dengan hasil instan.
- **📝 Autocomplete** — Saran judul film saat mengetik.
- **🎭 Filter Genre Populer** — Tampilkan film-film berdasarkan kategori genre favorit.
- **📄 Detail Lengkap Film** — Sinopsis, rating, cast, tahun rilis, dan informasi lainnya.
- **▶️ Trailer Otomatis** — Terintegrasi dengan pencarian YouTube untuk menampilkan trailer film.
- **🔄 Loading State & Error Handling** — Memberikan umpan balik yang baik saat proses loading atau terjadi error.
- **📱 Responsif** — Tampilan optimal di desktop, tablet, dan mobile.

---

## ⚙️ Teknologi yang Digunakan

- **HTML5, CSS3, JavaScript (Vanilla JS)** — Struktur, gaya, dan fungsionalitas aplikasi.
- **OMDB API** — Sumber data film real-time (sinopsis, rating, poster, dll).
- **Vercel Serverless Functions** — Menyembunyikan API key untuk keamanan.
- **YouTube API (pencarian otomatis)** — Menampilkan trailer film.

---

## 🚀 Cara Menjalankan Proyek

### Prasyarat
- **Node.js** (jika ingin menjalankan serverless function secara lokal)
- **OMDB API Key** — Dapatkan di [omdbapi.com/apikey.aspx](https://www.omdbapi.com/apikey.aspx)

### Langkah-langkah

1. **Clone repositori ini**
   ```bash
   git clone https://github.com/jejen-dev/movie-search.git
   cd movie-search
Buat file environment variables

Buat file .env di root proyek dan isi dengan OMDB API key Anda:

env
OMDB_API_KEY=your_api_key_here
Jalankan serverless function secara lokal (opsional)

bash
npm install -g vercel
vercel dev
Buka file index.html langsung di browser atau gunakan Live Server.

Catatan: Untuk keamanan, API key tidak boleh disimpan di frontend. Proyek ini menggunakan Vercel Serverless Functions sebagai proxy, jadi saat dijalankan secara lokal tanpa serverless function, pastikan untuk mengganti endpoint API dengan proxy lokal atau langsung menggunakan OMDB API dengan key (hanya untuk development).

📁 Struktur Proyek
text
movie-search/
├── index.html          # Halaman utama aplikasi
├── script.js           # Logika JavaScript (pencarian, autocomplete, API calls)
├── style.css           # Styling dan responsive design
├── api/                # Serverless functions (Vercel)
│   └── movies.js       # Proxy endpoint untuk menyembunyikan API key
├── design/             # Aset desain (thumbnail, dll)
├── thumbnail.jpg       # Thumbnail untuk sosial media
└── README.md           # Dokumentasi proyek (file ini)
📚 Apa yang Saya Pelajari
Selama mengerjakan proyek ini, saya mempelajari beberapa hal penting:

Async/Await dan Promise Handling — Mengelola fetch data dari API dengan baik.

Keamanan API Key — Menyembunyikan API key menggunakan serverless functions (Vercel) sehingga tidak terekspos di frontend.

Autocomplete Search — Membuat fitur saran judul film saat user mengetik.

Filter Genre — Menampilkan film-film populer berdasarkan genre.

Integrasi YouTube — Mencari dan menampilkan trailer film secara otomatis.

Error Handling & Loading State — Memberikan pengalaman pengguna yang lebih baik.

📄 Lisensi
Proyek ini bersifat open-source dan dapat digunakan untuk keperluan belajar maupun pengembangan lebih lanjut.
