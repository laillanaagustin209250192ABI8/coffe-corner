const products = [
  {
    id: 1,
    name: "Gayo Arabika Premium 250g",
    category: "Biji Kopi",
    price: 95000,
    stock: 15,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop",
    description: "Biji kopi Arabika single origin dari Gayo, Aceh. Memiliki rasa rempah yang kaya, keasaman sedang, dan body yang tebal."
  },
  {
    id: 2,
    name: "Toraja Sapan Single Origin 250g",
    category: "Biji Kopi",
    price: 110000,
    stock: 8,
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=600&auto=format&fit=crop",
    description: "Kopi Arabika dari lereng Gunung Sapan, Toraja. Karakter rasa buah-buahan eksotis (fruity), aroma bunga, dan aftertaste manis madu."
  },
  {
    id: 3,
    name: "Bali Kintamani Honey Process 250g",
    category: "Biji Kopi",
    price: 85000,
    stock: 20,
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=600&auto=format&fit=crop",
    description: "Diproses dengan metode honey, kopi Bali Kintamani ini menyajikan rasa jeruk manis (citrusy) yang segar dengan bodi ringan."
  },
  {
    id: 4,
    name: "Mandheling Lintong Premium 250g",
    category: "Biji Kopi",
    price: 90000,
    stock: 12,
    image: "https://images.unsplash.com/photo-1607681034540-2c46cc71896d?q=80&w=600&auto=format&fit=crop",
    description: "Kopi Arabika Sumatra klasik. Body sangat tebal, notes earthy herbal, cokelat hitam, dengan keasaman rendah."
  },
  {
    id: 5,
    name: "Flores Bajawa Organic 250g",
    category: "Biji Kopi",
    price: 88000,
    stock: 10,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600&auto=format&fit=crop",
    description: "Kopi organik dari Flores Bajawa. Aroma nutty karamel manis yang kuat, cita rasa cokelat, dan bodi sedang."
  },
  {
    id: 6,
    name: "Karsa House Blend Espresso 500g",
    category: "Biji Kopi",
    price: 145000,
    stock: 25,
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=600&auto=format&fit=crop",
    description: "Blend signature kami: 70% Arabika Gayo & 30% Robusta Temanggung. Sempurna untuk espresso, menghasilkan krema tebal dan rasa cokelat kacang yang manis."
  },
  {
    id: 7,
    name: "Karsa Cold Brew Concentrate 500ml",
    category: "Minuman Ready",
    price: 55000,
    stock: 30,
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=600&auto=format&fit=crop",
    description: "Konsentrat cold brew yang diseduh dingin selama 18 jam. Praktis, tinggal campur air atau susu sesuai selera Anda."
  },
  {
    id: 8,
    name: "Manual Brew Dripper V60 Set",
    category: "Alat Kopi",
    price: 175000,
    stock: 5,
    image: "https://images.unsplash.com/photo-1545665277-5937489579f2?q=80&w=600&auto=format&fit=crop",
    description: "Set alat seduh manual V60 berbahan kaca tebal tahan panas, lengkap dengan server 450ml, sendok takar, dan filter kertas isi 40 lembar."
  },
  {
    id: 9,
    name: "Karsa Hand Grinder Stainless",
    category: "Alat Kopi",
    price: 290000,
    stock: 6,
    image: "https://images.unsplash.com/photo-1580933079467-aa257dd42978?q=80&w=600&auto=format&fit=crop",
    description: "Penggiling kopi manual dengan burr keramik presisi dan bodi stainless steel. Setelan kehalusan bisa diatur dari kasar hingga halus."
  }
];

// Export to window object for ease of access in multiple static scripts without ES modules import complexity
window.products = products;
