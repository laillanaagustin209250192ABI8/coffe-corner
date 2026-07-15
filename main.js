// Main Controller for Shop Catalog Page (katalog.html)

// Current catalog state
let activeFilters = {
  search: '',
  categories: [],
  maxPrice: 300000, // Max initial range
  sortBy: 'default'
};

// Modal product quantity state
let currentModalProductId = null;
let currentModalQty = 1;

// Initialize Catalog
function initCatalog() {
  const productGrid = document.getElementById('catalog-product-grid');
  if (!productGrid) return; // Exit if not on catalog page

  setupFilterListeners();
  parseUrlParams();
  applyFiltersAndRender();
}

// Parse Category URL query parameters if present (e.g. from footer links)
function parseUrlParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');
  if (categoryParam) {
    activeFilters.categories = [categoryParam];
    // Sync UI checkboxes
    const checkboxes = document.querySelectorAll('.category-checkbox-input');
    checkboxes.forEach(cb => {
      if (cb.value === categoryParam) {
        cb.checked = true;
      }
    });
  }
}

// Bind event handlers for filters, search, and sorting
function setupFilterListeners() {
  // Text Search
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      activeFilters.search = e.target.value.toLowerCase().trim();
      applyFiltersAndRender();
    });
  }

  // Category Checkboxes
  const checkboxes = document.querySelectorAll('.category-checkbox-input');
  checkboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      activeFilters.categories = Array.from(checkboxes)
        .filter(c => c.checked)
        .map(c => c.value);
      applyFiltersAndRender();
    });
  });

  // Price Slider Range
  const priceSlider = document.getElementById('price-range-slider');
  const priceLabel = document.getElementById('price-range-label');
  if (priceSlider && priceLabel) {
    // Set max price limit from data if needed, default 300,000 IDR
    priceSlider.addEventListener('input', (e) => {
      activeFilters.maxPrice = parseInt(e.target.value);
      priceLabel.textContent = formatCurrency(activeFilters.maxPrice);
      applyFiltersAndRender();
    });
  }

  // Sort Dropdown
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      activeFilters.sortBy = e.target.value;
      applyFiltersAndRender();
    });
  }
}

// Filter and Sort Logic
function applyFiltersAndRender() {
  const productsList = window.products || [];
  
  // 1. Filter
  let filtered = productsList.filter(product => {
    // Search filter
    const matchesSearch = product.name.toLowerCase().includes(activeFilters.search) || 
                          product.description.toLowerCase().includes(activeFilters.search);
    
    // Category filter
    const matchesCategory = activeFilters.categories.length === 0 || 
                            activeFilters.categories.includes(product.category);
    
    // Price filter
    const matchesPrice = product.price <= activeFilters.maxPrice;
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // 2. Sort
  if (activeFilters.sortBy === 'price-low-high') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (activeFilters.sortBy === 'price-high-low') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (activeFilters.sortBy === 'name-asc') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (activeFilters.sortBy === 'name-desc') {
    filtered.sort((a, b) => b.name.localeCompare(a.name));
  }

  // 3. Render grid
  renderCatalogGrid(filtered);
}

// Render dynamic catalog items into DOM
function renderCatalogGrid(list) {
  const grid = document.getElementById('catalog-product-grid');
  const countEl = document.getElementById('catalog-results-count');
  
  if (!grid) return;
  
  if (countEl) {
    countEl.textContent = `Menampilkan ${list.length} produk`;
  }
  
  if (list.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
        <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 20px; color: rgba(255,255,255,0.08);"></i>
        <h3>Produk tidak ditemukan</h3>
        <p>Silakan sesuaikan filter pencarian atau rentang harga Anda.</p>
      </div>
    `;
    return;
  }
  
  grid.innerHTML = '';
  list.forEach(prod => {
    const card = document.createElement('div');
    card.className = 'product-card glass-panel glass-panel-hover';
    card.innerHTML = `
      <div class="product-image-wrapper" onclick="openProductDetailModal(${prod.id})" style="cursor: pointer;">
        <span class="product-category-tag">${prod.category}</span>
        <img src="${prod.image}" alt="${prod.name}" loading="lazy">
      </div>
      <div class="product-info">
        <h3 class="product-title" onclick="openProductDetailModal(${prod.id})" style="cursor: pointer;">${prod.name}</h3>
        <p class="product-desc">${prod.description}</p>
        <div class="product-stock ${prod.stock <= 8 ? 'low-stock' : ''}">
          Stok tersedia: <strong>${prod.stock}</strong>
        </div>
        <div class="product-footer">
          <div class="product-price">${formatCurrency(prod.price)}</div>
          <button class="btn btn-primary btn-add-cart" onclick="addToCart(${prod.id}, 1)">
            <i class="fas fa-cart-plus"></i> Beli
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Product Detail Modal management
function openProductDetailModal(productId) {
  const modal = document.getElementById('product-detail-modal');
  const productsList = window.products || [];
  const product = productsList.find(p => p.id === productId);
  
  if (!product || !modal) return;
  
  currentModalProductId = productId;
  currentModalQty = 1;
  
  // Fill modal content
  document.getElementById('modal-product-img').src = product.image;
  document.getElementById('modal-product-img').alt = product.name;
  document.getElementById('modal-product-category').textContent = product.category;
  document.getElementById('modal-product-title').textContent = product.name;
  document.getElementById('modal-product-price').textContent = formatCurrency(product.price);
  document.getElementById('modal-product-desc').textContent = product.description;
  document.getElementById('modal-qty-input').value = currentModalQty;
  
  const stockText = document.getElementById('modal-product-stock');
  if (stockText) {
    stockText.textContent = product.stock;
    stockText.className = product.stock <= 8 ? 'low-stock' : '';
  }
  
  // Open modal
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProductDetailModal() {
  const modal = document.getElementById('product-detail-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Modal Qty bindings
function setupModalEvents() {
  const modal = document.getElementById('product-detail-modal');
  if (!modal) return;
  
  const closeBtn = document.getElementById('modal-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeProductDetailModal);
  }
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeProductDetailModal();
  });
  
  // Qty Buttons
  const decreaseBtn = document.getElementById('modal-qty-decrease');
  const increaseBtn = document.getElementById('modal-qty-increase');
  const qtyInput = document.getElementById('modal-qty-input');
  
  if (decreaseBtn && increaseBtn && qtyInput) {
    decreaseBtn.addEventListener('click', () => {
      if (currentModalQty > 1) {
        currentModalQty--;
        qtyInput.value = currentModalQty;
      }
    });
    
    increaseBtn.addEventListener('click', () => {
      const productsList = window.products || [];
      const product = productsList.find(p => p.id === currentModalProductId);
      if (product && currentModalQty < product.stock) {
        currentModalQty++;
        qtyInput.value = currentModalQty;
      } else if (product) {
        showNotification(`Stok terbatas. Hanya tersedia ${product.stock} unit.`, 'warning');
      }
    });
  }
  
  // Add to Cart from Modal
  const modalAddBtn = document.getElementById('modal-add-to-cart-btn');
  if (modalAddBtn) {
    modalAddBtn.addEventListener('click', () => {
      if (currentModalProductId !== null) {
        addToCart(currentModalProductId, currentModalQty);
        closeProductDetailModal();
      }
    });
  }
}

// Window initialize
window.addEventListener('DOMContentLoaded', () => {
  initCatalog();
  setupModalEvents();
});
