# Tugas Besar KAIT II — E-Commerce "Kopi Karsa" (Glassmorphism)

Repository ini berisi prototype website e-commerce fungsional client-side **"Kopi Karsa"** yang menyajikan kopi specialty Indonesia dengan strategi bisnis modern. Dikembangkan murni menggunakan HTML5, CSS3, dan Vanilla JavaScript (ES6+), serta media penyimpanan `localStorage` untuk manajemen keranjang belanja (*cart*).

* **Live Demo URL:** `https://username.github.io/nama-repo/` (Silakan ganti dengan link live deployment Anda)
* **Status Proyek:** Prototype Mandiri (Murni Client-Side)

---

# Dokumentasi Bisnis Wajib (Business Overview)

Sebagai bagian dari Tugas Besar program studi **Administrasi Bisnis (Semester Genap 2025/2026)**, berikut adalah rancangan analisis strategis bisnis untuk **Kopi Karsa**:

## 1. Nama Bisnis, Deskripsi, & Value Proposition

* **Nama Bisnis:** Kopi Karsa (Artisanal Coffee & Specialty Roastery)
* **Deskripsi:** Toko e-commerce khusus yang memasok biji kopi specialty Indonesia kualitas tinggi (*Single Origin*), minuman siap saji (*Ready-to-Drink* seperti Cold Brew), dan peralatan seduh manual (*Manual Brew Gear*). Kopi Karsa mengusung konsep ramah lingkungan dan kerja sama adil (*fair trade*) langsung dengan petani lokal di berbagai daerah penghasil kopi Indonesia.
* **Value Proposition:** 
  > *"Menyajikan cita rasa autentik kopi specialty nusantara berkualitas tinggi hasil kurasi kurator bersertifikasi Q-Grader, dipanggang segar secara lokal, dengan komitmen harga adil yang langsung menyejahterakan petani lokal."*

## 2. Target Market & Segmentasi Pelanggan

Kami membagi segmentasi pelanggan Kopi Karsa menggunakan pendekatan sosiografis dan demografis:

* **Segmentasi Demografis:** Pria dan wanita usia 20–45 tahun (Generasi Milenial dan Gen Z), profesional muda, mahasiswa, pekerja kreatif, serta pemilik kedai kopi skala kecil-menengah.
* **Segmentasi Geografis:** Masyarakat perkotaan (*urban/suburban*) di Indonesia, khususnya di kota-kota besar (Jabodetabek, Bandung, Surabaya, Yogyakarta, Medan).
* **Segmentasi Psikografis & Perilaku:**
  * **The Coffee Enthusiast (Home Brewers):** Pecinta kopi yang menyeduh sendiri di rumah dan sangat peduli dengan asal-usul biji kopi, proses pengolahan pasca-panen (*honey, washed, natural*), dan profil panggangan (*light, medium*).
  * **The Busy Professionals:** Pekerja aktif yang membutuhkan kenyamanan kopi instan berkualitas tinggi (seperti produk Cold Brew kami) yang segar dan siap konsumsi di sela waktu bekerja.
  * **The Gifting/Lifestyle Shoppers:** Pelanggan yang membeli produk kopi atau peralatan berkualitas tinggi sebagai hadiah premium atau untuk menunjang gaya hidup sosialnya.

## 3. Analisis Pasar Singkat & Kompetitor

* **Analisis Pasar:** Tren konsumsi kopi specialty domestik terus meningkat pesat seiring dengan berkembangnya budaya minum kopi (*coffee culture*) di kalangan anak muda Indonesia. Pelanggan kini tidak hanya mencari kafein, melainkan *sensory experience* dan kisah keberlanjutan di balik kopi tersebut.
* **Analisis Kompetitor:**
  * **Kompetitor Langsung:** *Anomali Coffee* & *Tanamera Coffee*. Mereka memiliki jaringan fisik besar dan branding kuat di tingkat nasional.
  * **Keunggulan Kompetitif Kopi Karsa:** Kami menawarkan kedekatan personal, transparansi asal-usul pasokan (mencantumkan profil petani), kustomisasi pemesanan (biji utuh atau gilingan kustom gratis), dan platform website yang responsif dengan estetika visual *premium glassmorphism* yang memudahkan navigasi tanpa hambatan loading lambat.

## 4. Strategi Manajemen Produk & Katalog

Manajemen katalog produk kami rancang menjadi tiga kategori utama untuk menjangkau berbagai kebutuhan:
1. **Biji Kopi (Specialty Beans):** Fokus utama, disajikan dalam kemasan pouch 250g atau 500g dengan katup satu arah (*one-way degas valve*). Contoh: Gayo Arabika, Toraja Sapan, Bali Kintamani.
2. **Minuman Ready (Ready to Drink):** Fokus pada kepraktisan dengan kemasan botol kaca gelap agar daya tahan rasa terjaga. Contoh: Cold Brew Concentrate 500ml.
3. **Alat Kopi (Coffee Gear):** Sebagai pelengkap bernilai tambah (*cross-selling*). Contoh: Manual Grinder, V60 Glass Dripper.

Tiap data produk diintegrasikan dalam file terpusat [products.js](file:///d:/kait/js/products.js) dengan detail spesifikasi stok, harga, dan deskripsi detail guna memudahkan sinkronisasi inventori sistem checkout.

## 5. Model Bisnis & Revenue Stream

Kopi Karsa beroperasi dengan model bisnis **D2C (Direct-to-Consumer) E-Commerce**:
* **Direct Sales (Aliran Pendapatan Utama):** Penjualan retail produk kopi kemasan langsung ke konsumen melalui portal e-commerce statis ini.
* **B2B Partnership / Bulk Order:** Layanan penjualan biji kopi grosir (*roast beans*) ke kedai kopi lokal kecil yang belum memiliki roaster sendiri dengan minimal pembelian tertentu.
* **Bundling Gifts / Hampers:** Paket hadiah musiman (misalnya hampers Lebaran/Natal) yang menggabungkan kopi dengan cangkir keramik kustom atau dripper.

## 6. Strategi Harga, Promosi, & Diskon

* **Strategi Harga (Pricing Strategy):** Menggunakan *Value-Based Pricing* dikombinasikan dengan *Cost-Plus Pricing*. Produk dihargai premium tetapi tetap kompetitif dibanding kompetitor besar (kisaran Rp 85.000 - Rp 145.000 per 250g kopi specialty).
* **Strategi Promosi:**
  * **Free Shipping (Ongkir Gratis):** Insentif belanja besar dengan membebaskan biaya kirim jika pesanan melebihi Rp 250.000.
  * **First Buyer Discount:** Promosi kode kupon diskon khusus untuk pembelian pertama di luar sistem (diinfokan di banner promosi).
  * **E-Newsletter:** Mengirimkan panduan menyeduh kopi gratis kepada pelanggan yang mendaftarkan email di website untuk membangun kesetiaan pelanggan (*retention*).

## 7. Proses Checkout & Simulasi Payment Gateway

* **Proses Checkout:** Kami mendesain alur checkout satu halaman (*one-page checkout*) yang bersih di [checkout.html](file:///d:/kait/checkout.html) demi meminimalisasi tingkat keranjang belanja yang ditinggalkan (*cart abandonment rate*).
* **Justifikasi Simulasi Payment Gateway:**
  * Dalam prototype ini, kami menerapkan simulasi pemrosesan pembayaran real-time menggunakan **QRIS (Quick Response Code Indonesian Standard)** dan **Virtual Account Mandiri**. 
  * Alasan memilih QRIS: Metode pembayaran digital paling populer dan masif digunakan oleh segmen milenial & Gen Z di Indonesia karena kemudahan transaksi cashless.
  * Alasan memilih Virtual Account: Pilihan andalan untuk pembeli yang lebih menyukai transfer antar-bank dengan verifikasi otomatis instan.
  * Simulasi visual dirancang menggunakan overlay loading screen dan transisi sukses otomatis untuk meniru integrasi asli API Midtrans atau Xendit secara presisi tanpa mengenakan biaya transaksi nyata dalam tahap pengujian akademik.

## 8. Rencana SEO, Keamanan, & Pemeliharaan

* **Rencana SEO (Search Engine Optimization):**
  * Memanfaatkan tag meta deskripsi, kata kunci (*keywords*), dan struktur heading semantik HTML5 (`h1`, `h2`, `h3`) di setiap halaman untuk pengenalan mesin pencari Google yang optimal.
  * Optimalisasi kecepatan akses dengan mengompresi gambar dan memuat gambar katalog secara lambat (*lazy loading* dengan `loading="lazy"`).
* **Keamanan:** Karena bersifat *serverless* dan statis, risiko kebocoran database SQL atau injeksi skrip pada server tereliminasi 100%. Data transaksi sensitif pelanggan tidak disimpan di server mana pun.
* **Pemeliharaan:** Memperbarui data katalog kopi musiman pada file [products.js](file:///d:/kait/js/products.js) jika terjadi pergantian musim panen dari perkebunan mitra tani.

## 9. Rencana Pemanfaatan Data Analytics

Meskipun berjalan tanpa backend, kami merencanakan integrasi analitik client-side:
* **Google Analytics Integration:** Menggunakan pelacak analitik statis (*tagging*) untuk memonitor perilaku pengguna (*User Flow*), halaman mana yang paling sering dikunjungi (Katalog vs Beranda), dan menghitung tingkat konversi pembelian.
* **LocalStorage Tracking:** Memanfaatkan data dari `localStorage` secara agregat di masa depan untuk menyimpan barang pilihan favorit (*wishlist*) dan preferensi pencarian kategori kopi terpopuler oleh pengguna guna menyajikan rekomendasi personal secara lokal.

## 10. Justifikasi Pemilihan Pure Vanilla CSS dibanding Tailwind CSS

Proyek ini sengaja dibangun murni menggunakan **Vanilla CSS3** dengan pendekatan kustomisasi penuh, dengan alasan:
1. **Akurasi Glassmorphism:** Efek glassmorphism yang premium membutuhkan perpaduan detail antara `backdrop-filter`, `border` semi-transparan, `radial-gradient` bercahaya, dan bayangan berlapis. CSS Murni mempermudah penataan kode yang bersih tanpa menumpuk puluhan utility class pada tag HTML yang menurunkan keterbacaan kode (*code readability*).
2. **Ketiadaan Build Step:** Pemanfaatan framework modern seperti Tailwind membutuhkan setup Node.js/PostCSS dan build compiler agar file CSS tidak membengkak. Karena target proyek ini dilaunching langsung secara statis di GitHub Pages, penggunaan Vanilla CSS menjaga proses development tetap ringkas, cepat, dan 100% mandiri (*self-contained*).
3. **Kinerja Maksimal:** Memuat kode CSS kustom murni berukuran kecil memastikan waktu respon pemuatan halaman di browser mendekati instan, yang berdampak positif bagi skor performa Core Web Vitals dan SEO situs.

---

# Dokumentasi Teknis Pengembangan

## Struktur Folder Proyek
```
project-root/ (d:\kait\)
├── index.html          # Landing Page Utama
├── katalog.html        # Katalog Produk & Filter
├── checkout.html       # Formulir Pembelian & Ringkasan Order
├── css/
│   └── style.css       # Core Style & Desain Glassmorphism
├── js/
│   ├── products.js     # Data Produk Kopi (Hardcoded Array)
│   ├── cart.js         # Logika Keranjang Belanja (localStorage)
│   ├── checkout.js     # Validasi Form & Simulasi Pembayaran
│   └── main.js         # Controller Katalog & Modal Detail
├── assets/
│   └── images/
│       └── coffee_hero.png  # Hero Image Latar Belakang (Generated)
└── README.md           # Dokumentasi Bisnis & Teknis
```

## Cara Menjalankan Proyek secara Lokal
1. Pastikan seluruh folder di atas tersimpan dalam struktur yang benar.
2. Anda tidak memerlukan instalasi server apa pun. Cukup klik ganda file `index.html` pada browser modern pilihan Anda (Chrome, Edge, Firefox, Safari).
3. Untuk pengalaman pengembangan optimal, gunakan ekstensi **Live Server** di VS Code untuk melihat perubahan secara real-time.

## Validasi Fitur yang Berhasil Diuji
* [x] **Filter Kategori & Pencarian:** Melakukan pemfilteran real-time berdasarkan input teks dan centang kategori kopi tanpa refresh halaman.
* [x] **Harga Slider:** Membatasi produk yang tampil berdasarkan batas harga yang digeser pada price slider.
* [x] **Persistensi Keranjang Belanja:** Menambah barang, me-refresh browser, dan memverifikasi item keranjang tetap utuh tersimpan di `localStorage`.
* [x] **Validasi Formulir:** Mencoba mengklik "Bayar Sekarang" dengan input nama kosong atau format email keliru untuk memicu pemberitahuan error.
* [x] **Simulasi Gerbang Pembayaran:** Menjalankan pemesanan hingga popup QRIS/Virtual Account loading selesai dan dialihkan secara otomatis ke Beranda setelah transaksi disimulasikan berhasil.
