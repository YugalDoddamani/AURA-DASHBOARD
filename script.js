// ========================================================
// AURA SALES & INVENTORY MANAGEMENT SCRIPT
// ========================================================

// PASTE YOUR DEPLOYED GOOGLE APPS SCRIPT WEB APP URL HERE:
const GOOGLE_APPS_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL';

// --------------------------------------------------------
// Initial Catalog & Pricing Data (Pre-loaded from Sheet2)
// --------------------------------------------------------
let catalogData = [
    { name: "Azure Tide", website: 65, meesho: null, offline: 65, stock: 1, manufactured: 1 },
    { name: "Noir Tide", website: 65, meesho: null, offline: 65, stock: 1, manufactured: 1 },
    { name: "Cherry red charm bracelet", website: 70, meesho: 60, offline: 80, stock: 0, manufactured: 1 },
    { name: "Green floral crackle bead bracelet", website: 70, meesho: null, offline: 70, stock: 3, manufactured: 3 },
    { name: "White clover crackle bead bracelet", website: 70, meesho: null, offline: 70, stock: 1, manufactured: 2 },
    { name: "Daisy pink crackle bead bracelet", website: 70, meesho: 49, offline: 80, stock: 3, manufactured: 3 },
    { name: "Aura morning dew phone charm", website: 65, meesho: null, offline: 65, stock: 1, manufactured: 1 },
    { name: "Aura Purple Petal phone Charm", website: 65, meesho: null, offline: 65, stock: 1, manufactured: 1 },
    { name: "Sky silk butterfly charm", website: 65, meesho: null, offline: 65, stock: 3, manufactured: 3 },
    { name: "Aura dreamy beaded phone charm", website: 65, meesho: null, offline: 65, stock: 3, manufactured: 3 },
    { name: "Aura Lavender Butterfly Beaded Phone Charm", website: 70, meesho: null, offline: 70, stock: 3, manufactured: 3 },
    { name: "Aura Ocean Butterfly Charm", website: 70, meesho: null, offline: 70, stock: 3, manufactured: 3 },
    { name: "Kawaii Pink Beaded Phone Charm", website: 65, meesho: null, offline: 65, stock: 3, manufactured: 3 },
    { name: "Aura blue heart initial phone charm", website: 65, meesho: null, offline: 65, stock: 3, manufactured: 3 },
    { name: "Little Butterfly Anklet", website: 55, meesho: null, offline: 55, stock: 2, manufactured: 2 },
    { name: "Lilly Panda Phone Charm", website: 70, meesho: null, offline: 70, stock: 2, manufactured: 2 },
    { name: "Soraphine Phone Charm", website: 75, meesho: null, offline: 75, stock: 2, manufactured: 2 },
    { name: "Infinite Bonds Tread Bracelet", website: 45, meesho: null, offline: 45, stock: 2, manufactured: 2 },
    { name: "Ivoree Seed Bead Bracelet", website: 40, meesho: null, offline: 40, stock: 2, manufactured: 2 },
    { name: "Orryn Seed Bead Bracelet", website: 40, meesho: null, offline: 40, stock: 2, manufactured: 2 },
    { name: "Noirea Seed Bead bracelet", website: 40, meesho: null, offline: 40, stock: 2, manufactured: 2 },
    { name: "Dazelle yellow phone charm", website: 70, meesho: null, offline: 70, stock: 2, manufactured: 2 },
    { name: "Black Clover Crackle Bracelet", website: 70, meesho: null, offline: 70, stock: 2, manufactured: 2 },
    { name: "Maple leaf pink crystal bracelet", website: 70, meesho: null, offline: 70, stock: 2, manufactured: 2 },
    { name: "Evil Eye Butterfly with Blue Crystal Bracelet", website: 70, meesho: null, offline: 70, stock: 2, manufactured: 2 },
    { name: "Maple leaf red pearl bracelet", website: 70, meesho: null, offline: 70, stock: 2, manufactured: 2 },
    { name: "Bunny White Crystal Bracelet", website: 70, meesho: null, offline: 70, stock: 2, manufactured: 2 },
    { name: "Black Bow Tie Bracelet", website: 70, meesho: null, offline: 70, stock: 2, manufactured: 2 },
    { name: "Green Crackle Bead Bracelet with Cherry Charm", website: 70, meesho: null, offline: 70, stock: 2, manufactured: 2 },
    { name: "Trendy lilac crackle bead bracelet with daisy charm", website: 70, meesho: 60, offline: 50, stock: 3, manufactured: 3 }
];

let salesLog = [];
let currentTab = 'sales'; // 'sales' or 'inventory'

// DOM Elements
const themeToggleBtn = document.getElementById('themeToggleBtn');
const tabNavSales = document.getElementById('tabNavSales');
const tabNavInventory = document.getElementById('tabNavInventory');

const viewSales = document.getElementById('viewSales');
const viewInventory = document.getElementById('viewInventory');

const mainActionBtn = document.getElementById('mainActionBtn');
const mainActionText = document.getElementById('mainActionText');

// Modals
const saleModalOverlay = document.getElementById('saleModalOverlay');
const closeSaleModalBtn = document.getElementById('closeSaleModalBtn');
const cancelSaleBtn = document.getElementById('cancelSaleBtn');
const saleForm = document.getElementById('saleForm');

const inventoryModalOverlay = document.getElementById('inventoryModalOverlay');
const closeInventoryModalBtn = document.getElementById('closeInventoryModalBtn');
const cancelInventoryBtn = document.getElementById('cancelInventoryBtn');
const inventoryForm = document.getElementById('inventoryForm');

// Form inputs
const saleProductSelect = document.getElementById('saleProductSelect');
const salePlatformSelect = document.getElementById('salePlatformSelect');
const salePriceInput = document.getElementById('salePriceInput');
const saleModeSelect = document.getElementById('saleModeSelect');
const saleNotesInput = document.getElementById('saleNotesInput');

const invProductName = document.getElementById('invProductName');
const invPriceWebsite = document.getElementById('invPriceWebsite');
const invPriceMeesho = document.getElementById('invPriceMeesho');
const invPriceOffline = document.getElementById('invPriceOffline');
const invStock = document.getElementById('invStock');
const invManufactured = document.getElementById('invManufactured');

// Stats Elements
const statRevenue = document.getElementById('statRevenue');
const statSalesCount = document.getElementById('statSalesCount');
const statAvgValue = document.getElementById('statAvgValue');
const statTotalProductsCount = document.getElementById('statTotalProductsCount');

const statInvTotalItems = document.getElementById('statInvTotalItems');
const statInvTotalStock = document.getElementById('statInvTotalStock');
const statInvLowStock = document.getElementById('statInvLowStock');

// Tables
const salesTableBody = document.getElementById('salesTableBody');
const emptySalesRow = document.getElementById('emptySalesRow');
const inventoryTableBody = document.getElementById('inventoryTableBody');

// Search Inputs
const salesSearchInput = document.getElementById('salesSearchInput');
const inventorySearchInput = document.getElementById('inventorySearchInput');

// --------------------------------------------------------
// Initialize App
// --------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    populateProductDropdown();
    renderInventoryTable();
    updateInventoryStats();
    lucide.createIcons();
    
    // Set default tab state
    switchTab('sales');
});

// --------------------------------------------------------
// Theme Switcher (Light / Dark)
// --------------------------------------------------------
function initTheme() {
    const savedTheme = localStorage.getItem('aura_theme');
    // Default to light mode unless the user has explicitly saved 'dark'
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
    } else {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
    }
}

themeToggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.classList.contains('dark');
    if (isDark) {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
        localStorage.setItem('aura_theme', 'light');
    } else {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
        localStorage.setItem('aura_theme', 'dark');
    }
});

// --------------------------------------------------------
// Tab Navigation Switcher
// --------------------------------------------------------
function switchTab(tab) {
    currentTab = tab;
    if (tab === 'sales') {
        viewSales.classList.remove('hidden');
        viewInventory.classList.add('hidden');

        tabNavSales.className = "flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition tab-active";
        tabNavInventory.className = "flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 rounded-lg transition";

        mainActionText.textContent = "New Sale Entry";
    } else {
        viewSales.classList.add('hidden');
        viewInventory.classList.remove('hidden');

        tabNavInventory.className = "flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition tab-active";
        tabNavSales.className = "flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 rounded-lg transition";

        mainActionText.textContent = "Add Catalog Product";
    }
}

tabNavSales.addEventListener('click', () => switchTab('sales'));
tabNavInventory.addEventListener('click', () => switchTab('inventory'));

// Action Button Click routing
mainActionBtn.addEventListener('click', () => {
    if (currentTab === 'sales') {
        saleModalOverlay.classList.remove('hidden');
    } else {
        inventoryModalOverlay.classList.remove('hidden');
    }
});

// Modal Closures
closeSaleModalBtn.addEventListener('click', () => saleModalOverlay.classList.add('hidden'));
cancelSaleBtn.addEventListener('click', () => saleModalOverlay.classList.add('hidden'));

closeInventoryModalBtn.addEventListener('click', () => inventoryModalOverlay.classList.add('hidden'));
cancelInventoryBtn.addEventListener('click', () => inventoryModalOverlay.classList.add('hidden'));

// --------------------------------------------------------
// Populate Product Dropdowns & Auto-Pricing
// --------------------------------------------------------
function populateProductDropdown() {
    saleProductSelect.innerHTML = `<option value="" disabled selected>Select a Product...</option>`;
    catalogData.forEach(item => {
        const option = document.createElement('option');
        option.value = item.name;
        option.textContent = item.name;
        saleProductSelect.appendChild(option);
    });
}

function autoFillPrice() {
    const selectedProd = saleProductSelect.value;
    const selectedPlat = salePlatformSelect.value;

    if (!selectedProd || !selectedPlat) return;

    const item = catalogData.find(i => i.name === selectedProd);
    if (!item) return;

    if (selectedPlat === 'Meesho') {
        salePriceInput.value = item.meesho !== null ? item.meesho : item.website;
    } else if (selectedPlat === 'Offline') {
        salePriceInput.value = item.offline !== null ? item.offline : item.website;
    } else {
        salePriceInput.value = item.website; // Default Website/Instagram/WhatsApp
    }
}

saleProductSelect.addEventListener('change', autoFillPrice);
salePlatformSelect.addEventListener('change', autoFillPrice);

// --------------------------------------------------------
// Submit Sale Form
// --------------------------------------------------------
saleForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = document.getElementById('submitSaleBtn');
    submitBtn.disabled = true;
    submitBtn.classList.add('opacity-50', 'cursor-not-allowed');

    const newSale = {
        type: 'sale',
        product: saleProductSelect.value,
        platform: salePlatformSelect.value,
        price: parseFloat(salePriceInput.value),
        mode: saleModeSelect.value,
        date: new Date().toISOString().split('T')[0],
        notes: saleNotesInput.value.trim()
    };

    // Deduct stock locally
    const catalogItem = catalogData.find(i => i.name === newSale.product);
    if (catalogItem && catalogItem.stock > 0) {
        catalogItem.stock -= 1;
        renderInventoryTable();
        updateInventoryStats();
    }

    // Post to Google Apps Script
    if (GOOGLE_APPS_SCRIPT_URL !== 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL') {
        try {
            await fetch(GOOGLE_APPS_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newSale)
            });
        } catch (err) {
            console.error("Error logging sale to Google Sheets:", err);
        }
    }

    // Update Sales UI
    salesLog.unshift(newSale);
    renderSalesTable();
    updateSalesStats();

    // Reset Form & Close Modal
    saleForm.reset();
    salePriceInput.value = '';
    submitBtn.disabled = false;
    submitBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    saleModalOverlay.classList.add('hidden');
});

// Render Sales Table
function renderSalesTable() {
    if (salesLog.length === 0) return;

    if (emptySalesRow) emptySalesRow.remove();
    salesTableBody.innerHTML = '';

    const filterText = salesSearchInput.value.toLowerCase();

    salesLog.forEach(item => {
        if (filterText && !item.product.toLowerCase().includes(filterText) && !item.platform.toLowerCase().includes(filterText)) {
            return;
        }

        const row = document.createElement('tr');
        row.className = 'hover:bg-slate-50 dark:hover:bg-slate-800/50 transition';
        row.innerHTML = `
            <td class="px-6 py-4 font-medium text-slate-900 dark:text-white">${item.product}</td>
            <td class="px-6 py-4 text-slate-600 dark:text-slate-300">${item.platform}</td>
            <td class="px-6 py-4 font-bold text-slate-900 dark:text-emerald-400">₹${item.price.toFixed(2)}</td>
            <td class="px-6 py-4"><span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-brand-50 dark:bg-brand-950/50 text-brand-700 dark:text-brand-300">${item.mode}</span></td>
            <td class="px-6 py-4 text-xs text-slate-500 dark:text-slate-400">${item.date}</td>
            <td class="px-6 py-4 text-xs text-slate-500 dark:text-slate-400">${item.notes || '-'}</td>
        `;
        salesTableBody.appendChild(row);
    });
}

function updateSalesStats() {
    const totalRev = salesLog.reduce((acc, curr) => acc + curr.price, 0);
    const count = salesLog.length;
    const avg = count > 0 ? totalRev / count : 0;

    statRevenue.textContent = `₹${totalRev.toFixed(2)}`;
    statSalesCount.textContent = count.toString();
    statAvgValue.textContent = `₹${avg.toFixed(2)}`;
    statTotalProductsCount.textContent = catalogData.length.toString();
}

salesSearchInput.addEventListener('input', renderSalesTable);

// --------------------------------------------------------
// Submit Inventory / Add Catalog Product
// --------------------------------------------------------
inventoryForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = document.getElementById('submitInventoryBtn');
    submitBtn.disabled = true;
    submitBtn.classList.add('opacity-50', 'cursor-not-allowed');

    const newProduct = {
        type: 'inventory',
        name: invProductName.value.trim(),
        website: parseFloat(invPriceWebsite.value) || 0,
        meesho: invPriceMeesho.value ? parseFloat(invPriceMeesho.value) : null,
        offline: invPriceOffline.value ? parseFloat(invPriceOffline.value) : null,
        stock: parseInt(invStock.value) || 0,
        manufactured: parseInt(invManufactured.value) || 0
    };

    // Check if exists or push
    const existingIndex = catalogData.findIndex(i => i.name.toLowerCase() === newProduct.name.toLowerCase());
    if (existingIndex >= 0) {
        catalogData[existingIndex] = newProduct;
    } else {
        catalogData.push(newProduct);
    }

    // Sync to Google Apps Script
    if (GOOGLE_APPS_SCRIPT_URL !== 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL') {
        try {
            await fetch(GOOGLE_APPS_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProduct)
            });
        } catch (err) {
            console.error("Error updating inventory in Google Sheets:", err);
        }
    }

    // Refresh UI
    populateProductDropdown();
    renderInventoryTable();
    updateInventoryStats();

    inventoryForm.reset();
    submitBtn.disabled = false;
    submitBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    inventoryModalOverlay.classList.add('hidden');
});

// Render Inventory Catalog Table
function renderInventoryTable() {
    inventoryTableBody.innerHTML = '';
    const filterText = inventorySearchInput.value.toLowerCase();

    catalogData.forEach(item => {
        if (filterText && !item.name.toLowerCase().includes(filterText)) {
            return;
        }

        const row = document.createElement('tr');
        row.className = 'hover:bg-slate-50 dark:hover:bg-slate-800/50 transition';

        const statusBadge = item.stock > 0 
            ? `<span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">In Stock</span>`
            : `<span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400">Out of Stock</span>`;

        row.innerHTML = `
            <td class="px-6 py-4 font-semibold text-slate-900 dark:text-white">${item.name}</td>
            <td class="px-6 py-4 font-medium text-slate-800 dark:text-slate-200">₹${item.website || '-'}</td>
            <td class="px-6 py-4 text-slate-600 dark:text-slate-300">${item.meesho ? '₹' + item.meesho : '-'}</td>
            <td class="px-6 py-4 text-slate-600 dark:text-slate-300">${item.offline ? '₹' + item.offline : '-'}</td>
            <td class="px-6 py-4 font-bold ${item.stock === 0 ? 'text-rose-500' : 'text-slate-800 dark:text-slate-200'}">${item.stock}</td>
            <td class="px-6 py-4 text-slate-500 dark:text-slate-400">${item.manufactured}</td>
            <td class="px-6 py-4">${statusBadge}</td>
        `;
        inventoryTableBody.appendChild(row);
    });
}

function updateInventoryStats() {
    const totalItems = catalogData.length;
    const totalStock = catalogData.reduce((acc, curr) => acc + (curr.stock || 0), 0);
    const lowStock = catalogData.filter(i => (i.stock || 0) <= 0).length;

    statInvTotalItems.textContent = totalItems.toString();
    statInvTotalStock.textContent = totalStock.toString();
    statInvLowStock.textContent = lowStock.toString();
    statTotalProductsCount.textContent = totalItems.toString();
}

inventorySearchInput.addEventListener('input', renderInventoryTable);