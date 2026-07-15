// Checkout Logic for Kopi Karsa (checkout.js)

// Redirect if cart is empty on load
function verifyCartNotEmpty() {
  const cart = getCart();
  if (cart.length === 0) {
    alert("Keranjang belanja Anda kosong. Anda akan diarahkan ke Katalog untuk berbelanja.");
    window.location.href = "katalog.html";
  }
}

// Render Order Summary in Checkout Page
function renderCheckoutSummary() {
  const summaryList = document.getElementById('checkout-summary-list');
  const subtotalEl = document.getElementById('checkout-subtotal');
  const shippingEl = document.getElementById('checkout-shipping');
  const ppnEl = document.getElementById('checkout-ppn');
  const totalEl = document.getElementById('checkout-total');
  
  if (!summaryList) return;
  
  const cart = getCart();
  summaryList.innerHTML = '';
  
  cart.forEach(item => {
    const itemRow = document.createElement('div');
    itemRow.className = 'summary-item';
    itemRow.style.marginBottom = '12px';
    itemRow.innerHTML = `
      <div>
        <div class="summary-item-name" style="font-weight: 500; color: var(--text-main);">${item.name}</div>
        <div class="summary-item-desc">${item.qty}x @ ${formatCurrency(item.price)}</div>
      </div>
      <div class="summary-item-price">${formatCurrency(item.price * item.qty)}</div>
    `;
    summaryList.appendChild(itemRow);
  });
  
  const totals = calculateTotal(cart);
  if (subtotalEl) subtotalEl.textContent = formatCurrency(totals.subtotal);
  if (ppnEl) ppnEl.textContent = formatCurrency(totals.ppn);
  if (shippingEl) {
    shippingEl.textContent = totals.shipping === 0 ? "Gratis Ongkir" : formatCurrency(totals.shipping);
  }
  if (totalEl) totalEl.textContent = formatCurrency(totals.total);
}

// Form fields validation
function validateCheckoutForm() {
  const nama = document.getElementById('checkout-nama').value.trim();
  const email = document.getElementById('checkout-email').value.trim();
  const phone = document.getElementById('checkout-phone').value.trim();
  const address = document.getElementById('checkout-address').value.trim();
  const courier = document.getElementById('checkout-courier').value;
  const payment = document.getElementById('checkout-payment').value;
  
  if (!nama) {
    showNotification('Nama Lengkap wajib diisi.', 'warning');
    return false;
  }
  if (!email) {
    showNotification('Email wajib diisi.', 'warning');
    return false;
  }
  // Basic email regex
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    showNotification('Format email tidak valid.', 'warning');
    return false;
  }
  if (!phone) {
    showNotification('Nomor Handphone wajib diisi.', 'warning');
    return false;
  }
  // Basic phone regex (digits only, min 9 characters)
  if (!/^\d{9,15}$/.test(phone)) {
    showNotification('Nomor Handphone harus berupa angka (9-15 digit).', 'warning');
    return false;
  }
  if (!address) {
    showNotification('Alamat Lengkap pengiriman wajib diisi.', 'warning');
    return false;
  }
  if (!courier) {
    showNotification('Silakan pilih kurir pengiriman.', 'warning');
    return false;
  }
  if (!payment) {
    showNotification('Silakan pilih metode pembayaran.', 'warning');
    return false;
  }
  
  return { nama, email, phone, address, courier, payment };
}

// Execute payment simulation
function processPayment(formData) {
  const overlay = document.getElementById('payment-modal-overlay');
  const modal = document.getElementById('payment-modal-container');
  
  if (!overlay || !modal) return;
  
  // Lock background scroll
  document.body.style.overflow = 'hidden';
  overlay.classList.add('active');
  
  // Step 1: Connecting phase (Spinner)
  modal.innerHTML = `
    <div class="payment-spinner"></div>
    <h3 style="font-size: 1.4rem; margin-bottom: 12px;">Menghubungkan ke Payment Gateway...</h3>
    <p style="color: var(--text-muted); font-size: 0.95rem;">Mengamankan koneksi pembayaran Anda. Mohon tunggu.</p>
  `;
  
  // Step 2: Show payment details after 2 seconds
  setTimeout(() => {
    const cart = getCart();
    const totals = calculateTotal(cart);
    
    if (formData.payment === 'QRIS') {
      // Simulate QRIS QR code
      modal.innerHTML = `
        <h3 style="font-size: 1.4rem; margin-bottom: 10px; color: var(--color-primary);">Scan QRIS untuk Membayar</h3>
        <p style="color: var(--text-muted); font-size: 0.9rem;">Total Tagihan: <strong style="color: var(--text-main);">${formatCurrency(totals.total)}</strong></p>
        <div class="qris-code-container">
          <!-- Public QR placeholder simulating Midtrans/QRIS dynamic code -->
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=kopikarsa_payment_${totals.total}" alt="QRIS Code Kopi Karsa">
        </div>
        <p style="font-size: 0.9rem; margin-bottom: 20px;"><i class="fas fa-clock" style="color: var(--color-primary); margin-right: 6px;"></i> Menunggu Pembayaran...</p>
        <div class="glass-panel" style="padding: 12px; font-size: 0.82rem; color: var(--text-muted); border-radius: var(--border-radius-sm);">
          Scan QR di atas menggunakan aplikasi m-Banking (BCA, Mandiri) atau E-Wallet (Gopay, OVO, ShopeePay, Dana).
        </div>
        <button class="btn btn-primary" id="btn-simulate-success" style="margin-top: 20px; width: 100%;">
          Simulasikan Pembayaran Sukses
        </button>
      `;
    } else {
      // Simulate Bank Transfer VA
      modal.innerHTML = `
        <h3 style="font-size: 1.4rem; margin-bottom: 10px; color: var(--color-primary);">Selesaikan Transfer Bank</h3>
        <p style="color: var(--text-muted); font-size: 0.9rem;">Total Tagihan: <strong style="color: var(--text-main);">${formatCurrency(totals.total)}</strong></p>
        
        <div class="bank-transfer-details">
          <div class="bank-row">
            <span class="bank-label">Bank:</span>
            <span class="bank-value">MANDIRI VIRTUAL ACCOUNT</span>
          </div>
          <div class="bank-row">
            <span class="bank-label">No. Rekening VA:</span>
            <span class="bank-value" style="color: var(--color-primary); letter-spacing: 1px;">88908 12345 67890</span>
          </div>
          <div class="bank-row">
            <span class="bank-label">Nama Penerima:</span>
            <span class="bank-value">KOPI KARSA ROASTERY</span>
          </div>
        </div>
        
        <p style="font-size: 0.9rem; margin-bottom: 20px;"><i class="fas fa-clock" style="color: var(--color-primary); margin-right: 6px;"></i> Menunggu Transfer Bank...</p>
        <button class="btn btn-primary" id="btn-simulate-success" style="width: 100%;">
          Simulasikan Pembayaran Sukses
        </button>
      `;
    }
    
    // Bind click to manually simulate success, OR auto-success after 5s
    const simSuccessBtn = document.getElementById('btn-simulate-success');
    let autoSuccessTimeout = setTimeout(triggerPaymentSuccess, 5000); // Auto success after 5s
    
    if (simSuccessBtn) {
      simSuccessBtn.addEventListener('click', () => {
        clearTimeout(autoSuccessTimeout);
        triggerPaymentSuccess();
      });
    }
    
  }, 2000);
}

// Show success screen and clear state
function triggerPaymentSuccess() {
  const modal = document.getElementById('payment-modal-container');
  if (!modal) return;
  
  modal.innerHTML = `
    <div class="payment-success-tick">
      <i class="fas fa-check"></i>
    </div>
    <h3 style="font-size: 1.6rem; margin-bottom: 12px; color: #2ecc71;">Pembayaran Berhasil!</h3>
    <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 24px;">
      Terima kasih telah berbelanja di Kopi Karsa. Pesanan Anda telah kami terima dan akan segera dikirim.
    </p>
    <p style="font-size: 0.88rem; color: var(--color-primary); font-weight: 500;">
      Mengalihkan Anda kembali ke Beranda dalam beberapa detik...
    </p>
  `;
  
  // Clear the shopping cart since order completed successfully
  localStorage.removeItem(CART_STORAGE_KEY);
  
  // Redirect to index.html after 3.5 seconds
  setTimeout(() => {
    window.location.href = "index.html";
  }, 3500);
}

// DOM content load init
window.addEventListener('DOMContentLoaded', () => {
  verifyCartNotEmpty();
  renderCheckoutSummary();
  
  const form = document.getElementById('checkout-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = validateCheckoutForm();
      if (formData) {
        processPayment(formData);
      }
    });
  }
});
