// Cart helper functions using localStorage
const CART_STORAGE_KEY = 'kopikarsa_cart';

// Get cart from localStorage
function getCart() {
  const cartJson = localStorage.getItem(CART_STORAGE_KEY);
  return cartJson ? JSON.parse(cartJson) : [];
}

// Save cart to localStorage
function saveCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  renderCartBadge();
}

// Calculate total cart items and update badge
function renderCartBadge() {
  const cart = getCart();
  const badge = document.getElementById('cart-badge-count');
  if (badge) {
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    badge.textContent = totalQty;
    // Hide badge if empty
    badge.style.display = totalQty > 0 ? 'inline-block' : 'none';
  }
}

// Add item to cart
function addToCart(productId, qty = 1) {
  const productsList = window.products || [];
  const product = productsList.find(p => p.id === productId);
  
  if (!product) {
    showNotification('Produk tidak ditemukan.', 'error');
    return;
  }
  
  let cart = getCart();
  const existingItemIndex = cart.findIndex(item => item.productId === productId);
  
  // Calculate potential new quantity
  let currentQtyInCart = existingItemIndex > -1 ? cart[existingItemIndex].qty : 0;
  let newQty = currentQtyInCart + qty;
  
  // Check stock
  if (newQty > product.stock) {
    showNotification(`Stok tidak mencukupi. Stok tersedia: ${product.stock}`, 'warning');
    return;
  }
  
  if (existingItemIndex > -1) {
    cart[existingItemIndex].qty = newQty;
  } else {
    cart.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      qty: qty
    });
  }
  
  saveCart(cart);
  renderCartDrawer();
  openCartDrawer();
  showNotification(`${product.name} ditambahkan ke keranjang.`, 'success');
}

// Update quantity directly (e.g. from drawer inputs)
function updateQty(productId, qty) {
  if (qty <= 0) {
    removeFromCart(productId);
    return;
  }
  
  const productsList = window.products || [];
  const product = productsList.find(p => p.id === productId);
  
  if (product && qty > product.stock) {
    showNotification(`Stok terbatas. Hanya tersedia ${product.stock} unit.`, 'warning');
    // Set to max stock
    qty = product.stock;
  }
  
  let cart = getCart();
  const itemIndex = cart.findIndex(item => item.productId === productId);
  
  if (itemIndex > -1) {
    cart[itemIndex].qty = qty;
    saveCart(cart);
    renderCartDrawer();
  }
}

// Remove item from cart
function removeFromCart(productId) {
  let cart = getCart();
  const item = cart.find(item => item.productId === productId);
  cart = cart.filter(item => item.productId !== productId);
  saveCart(cart);
  renderCartDrawer();
  if (item) {
    showNotification(`${item.name} dihapus dari keranjang.`, 'info');
  }
}

// Toggle drawer visual states
function openCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-drawer-overlay');
  if (drawer && overlay) {
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock background scrolling
  }
}

function closeCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-drawer-overlay');
  if (drawer && overlay) {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = ''; // Unlock scrolling
  }
}

// Format number helper (IDR Currency)
function formatCurrency(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

// Calculate cart calculations (subtotal, shipping, tax, total)
function calculateTotal(cart) {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  // Simple flat shipping rate of Rp 15,000, free shipping if order > Rp 250,000
  const shipping = subtotal > 0 && subtotal < 250000 ? 15000 : 0;
  const ppn = Math.round(subtotal * 0.11); // PPN 11%
  const total = subtotal + shipping + ppn;
  
  return { subtotal, shipping, ppn, total };
}

// Render items list inside the drawer
function renderCartDrawer() {
  const cartList = document.getElementById('cart-items-list');
  const subtotalVal = document.getElementById('cart-subtotal-val');
  const shippingVal = document.getElementById('cart-shipping-val');
  const totalVal = document.getElementById('cart-total-val');
  
  if (!cartList) return;
  
  const cart = getCart();
  
  if (cart.length === 0) {
    cartList.innerHTML = `
      <div class="cart-empty-message">
        <i class="fas fa-shopping-basket"></i>
        <p>Keranjang belanja Anda kosong.</p>
        <a href="katalog.html" class="btn btn-outline" style="margin-top: 20px;" onclick="closeCartDrawer()">Mulai Belanja</a>
      </div>
    `;
    if (subtotalVal) subtotalVal.textContent = formatCurrency(0);
    if (shippingVal) shippingVal.textContent = formatCurrency(0);
    if (totalVal) totalVal.textContent = formatCurrency(0);
    
    // Disable checkout button if cart empty
    const checkoutBtn = document.getElementById('btn-drawer-checkout');
    if (checkoutBtn) checkoutBtn.setAttribute('disabled', 'true');
    return;
  }
  
  // Enable checkout button
  const checkoutBtn = document.getElementById('btn-drawer-checkout');
  if (checkoutBtn) checkoutBtn.removeAttribute('disabled');
  
  cartList.innerHTML = '';
  cart.forEach(item => {
    const itemEl = document.createElement('div');
    itemEl.className = 'cart-item';
    itemEl.innerHTML = `
      <div class="cart-item-img">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="cart-item-details">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${formatCurrency(item.price)}</div>
        <div class="cart-item-footer">
          <div class="cart-item-qty-btn-group">
            <button class="cart-item-qty-btn decrease-btn" data-id="${item.productId}">-</button>
            <input type="text" readonly class="cart-item-qty-input" value="${item.qty}">
            <button class="cart-item-qty-btn increase-btn" data-id="${item.productId}">+</button>
          </div>
          <button class="cart-item-remove" data-id="${item.productId}">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
    `;
    cartList.appendChild(itemEl);
  });
  
  // Bind events
  cartList.querySelectorAll('.decrease-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.target.dataset.id);
      const item = cart.find(i => i.productId === id);
      if (item) updateQty(id, item.qty - 1);
    });
  });
  
  cartList.querySelectorAll('.increase-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.target.dataset.id);
      const item = cart.find(i => i.productId === id);
      if (item) updateQty(id, item.qty + 1);
    });
  });
  
  cartList.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const btnEl = e.target.closest('.cart-item-remove');
      const id = parseInt(btnEl.dataset.id);
      removeFromCart(id);
    });
  });
  
  // Calculate pricing summary
  const totals = calculateTotal(cart);
  if (subtotalVal) subtotalVal.textContent = formatCurrency(totals.subtotal);
  if (shippingVal) {
    shippingVal.textContent = totals.shipping === 0 && totals.subtotal > 0 ? "Gratis Ongkir" : formatCurrency(totals.shipping);
  }
  if (totalVal) totalVal.textContent = formatCurrency(totals.total);
}

// Beautiful temporary floating notification banner
function showNotification(message, type = 'success') {
  const container = document.getElementById('notification-container');
  if (!container) {
    const notifyDiv = document.createElement('div');
    notifyDiv.id = 'notification-container';
    notifyDiv.style.position = 'fixed';
    notifyDiv.style.bottom = '30px';
    notifyDiv.style.left = '30px';
    notifyDiv.style.zIndex = '500';
    notifyDiv.style.display = 'flex';
    notifyDiv.style.flexDirection = 'column';
    notifyDiv.style.gap = '10px';
    notifyDiv.style.maxWidth = '380px';
    document.body.appendChild(notifyDiv);
  }
  
  const notification = document.createElement('div');
  notification.className = 'glass-panel';
  notification.style.padding = '14px 20px';
  notification.style.display = 'flex';
  notification.style.alignItems = 'center';
  notification.style.gap = '12px';
  notification.style.transform = 'translateY(100px)';
  notification.style.opacity = '0';
  notification.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
  
  let icon = '<i class="fas fa-check-circle" style="color: #2ecc71;"></i>';
  if (type === 'warning') {
    icon = '<i class="fas fa-exclamation-triangle" style="color: #f1c40f;"></i>';
  } else if (type === 'error') {
    icon = '<i class="fas fa-times-circle" style="color: #e74c3c;"></i>';
  } else if (type === 'info') {
    icon = '<i class="fas fa-info-circle" style="color: #3498db;"></i>';
  }
  
  notification.innerHTML = `
    <span>${icon}</span>
    <span style="font-size: 0.92rem; font-weight: 500;">${message}</span>
  `;
  
  const notifyContainer = document.getElementById('notification-container');
  notifyContainer.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateY(0)';
    notification.style.opacity = '1';
  }, 10);
  
  // Remove after 3.5s
  setTimeout(() => {
    notification.style.transform = 'translateY(-20px)';
    notification.style.opacity = '0';
    setTimeout(() => {
      notification.remove();
    }, 400);
  }, 3500);
}

// Handle Mobile Navigation Toggle
function setupMobileNav() {
  const menuBtn = document.getElementById('menu-toggle-btn');
  const navLinks = document.getElementById('nav-links-menu');
  
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-active');
      const icon = menuBtn.querySelector('i');
      if (icon) {
        if (navLinks.classList.contains('mobile-active')) {
          icon.className = 'fas fa-times';
        } else {
          icon.className = 'fas fa-bars';
        }
      }
    });
  }
}

// Window initialize event
window.addEventListener('DOMContentLoaded', () => {
  renderCartBadge();
  renderCartDrawer();
  setupMobileNav();
  
  // Bind Cart badge button clicks to open drawer
  const cartBadgeBtn = document.getElementById('cart-badge-btn');
  if (cartBadgeBtn) {
    cartBadgeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openCartDrawer();
    });
  }
  
  // Bind overlay click to close drawer
  const overlay = document.getElementById('cart-drawer-overlay');
  if (overlay) {
    overlay.addEventListener('click', closeCartDrawer);
  }
});
