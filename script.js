// ========================================================
// AURA SALES & INVENTORY MANAGEMENT SCRIPT
// ========================================================

// ✅ UPDATED with your NEW Web App URL
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbykEFuycstwCH-cwUcE_39snY4lUzkTf7gXpNiEvJBdvIrrk2dYZW0Fgg4COG4WKMxETA/exec';

const DEFAULT_CATALOG = [
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

let catalogData = [...DEFAULT_CATALOG];
let salesLog = [];
let currentTab = 'sales';

// DOM Elements
const themeToggleBtn = document.getElementById('themeToggleBtn');
const tabNavSales = document.getElementById('tabNavSales');
const tabNavInventory = document.getElementById('tabNavInventory');

const viewSales = document.getElementById('viewSales');
const viewInventory = document.getElementById('viewInventory');
const viewStats = document.getElementById('viewStats');

const mainActionBtn = document.getElementById('mainActionBtn');
const mainActionText = document.getElementById('mainActionText');

const mobileNavSales = document.getElementById('mobileNavSales');
const mobileNavInventory = document.getElementById('mobileNavInventory');
const mobileNavStats = document.getElementById('mobileNavStats');
const mobileActionBtn = document.getElementById('mobileActionBtn');

const saleModalOverlay = document.getElementById('saleModalOverlay');
const closeSaleModalBtn = document.getElementById('closeSaleModalBtn');
const cancelSaleBtn = document.getElementById('cancelSaleBtn');
const saleForm = document.getElementById('saleForm');

const inventoryModalOverlay = document.getElementById('inventoryModalOverlay');
const closeInventoryModalBtn = document.getElementById('closeInventoryModalBtn');
const cancelInventoryBtn = document.getElementById('cancelInventoryBtn');
const inventoryForm = document.getElementById('inventoryForm');

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

const statRevenue = document.getElementById('statRevenue');
const statSalesCount = document.getElementById('statSalesCount');
const statAvgValue = document.getElementById('statAvgValue');
const statTotalProductsCount = document.getElementById('statTotalProductsCount');

const statInvTotalItems = document.getElementById('statInvTotalItems');
const statInvTotalStock = document.getElementById('statInvTotalStock');
const statInvLowStock = document.getElementById('statInvLowStock');

const statsDashRevenue = document.getElementById('statsDashRevenue');
const statsDashOrders = document.getElementById('statsDashOrders');
const statsDashAvgOrder = document.getElementById('statsDashAvgOrder');
const statsDashStock = document.getElementById('statsDashStock');

const salesTableBody = document.getElementById('salesTableBody');
const inventoryTableBody = document.getElementById('inventoryTableBody');
const salesSearchInput = document.getElementById('salesSearchInput');
const inventorySearchInput = document.getElementById('inventorySearchInput');

// ========================================================
// DATE FORMATTER
// ========================================================
function formatDate(rawDate) {
    if (!rawDate) return new Date().toISOString().split('T')[0];
    const d = new Date(rawDate);
    if (!isNaN(d.getTime())) {
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    return String(rawDate);
}

// ========================================================
// INITIALIZATION
// ========================================================
document.addEventListener('DOMContentLoaded', async () => {
    initTheme();
    if (typeof lucide !== 'undefined') lucide.createIcons();
    switchTab('sales');
    refreshAllUI();

    if (GOOGLE_APPS_SCRIPT_URL && GOOGLE_APPS_SCRIPT_URL !== '') {
        await loadDataFromSheet();
    }
});

// ========================================================
// GOOGLE SHEETS SYNC — FIXED FOR YOUR EXACT JSON
// ========================================================
async function loadDataFromSheet() {
    try {
        console.log("📡 Fetching from Google Sheets...");
        const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
            method: 'GET',
            redirect: 'follow'
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const result = await response.json();
        console.log("📦 Response received:", result.status);

        // -------------------------------------------------
        // Parse Catalog — matches your JSON exactly
        // -------------------------------------------------
        if (Array.isArray(result.catalog) && result.catalog.length > 0) {
            catalogData = result.catalog.map(item => ({
                name: String(item.name || '').trim(),
                website: parseFloat(item.website) || 0,
                meesho: (item.meesho !== null && item.meesho !== undefined && item.meesho !== '') 
                    ? parseFloat(item.meesho) 
                    : null,
                offline: (item.offline !== null && item.offline !== undefined && item.offline !== '') 
                    ? parseFloat(item.offline) 
                    : null,
                stock: parseInt(item.stock) || 0,
                manufactured: parseInt(item.manufactured) || 0
            })).filter(i => i.name);
            console.log(`✅ ${catalogData.length} catalog items loaded.`);
        }

        // -------------------------------------------------
        // Parse Sales — matches your JSON exactly
        // Your sales structure: {sno, product, date, platform, price, mode, notes}
        // -------------------------------------------------
        if (Array.isArray(result.sales) && result.sales.length > 0) {
            salesLog = result.sales
                .filter(item => item && item.product && String(item.product).trim() !== '')
                .map(item => ({
                    product: String(item.product).trim(),
                    platform: String(item.platform || 'General').trim(),
                    price: parseFloat(item.price) || 0,
                    mode: String(item.mode || 'UPI').trim(),
                    date: formatDate(item.date),
                    notes: String(item.notes || '').trim()
                }));
            console.log(`✅ ${salesLog.length} sales loaded:`, salesLog);
        } else {
            console.warn("⚠️ No sales returned from sheet.");
            salesLog = [];
        }

        refreshAllUI();

    } catch (error) {
        console.error("❌ Sync Error:", error);
        refreshAllUI();
    }
}

// ========================================================
// UI REFRESH
// ========================================================
function refreshAllUI() {
    populateProductDropdown();
    renderInventoryTable();
    updateInventoryStats();
    renderSalesTable();
    updateSalesStats();
    updateStatsDashboard();
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

function switchTab(tab) {
    currentTab = tab;
    if (viewSales) viewSales.classList.add('hidden');
    if (viewInventory) viewInventory.classList.add('hidden');
    if (viewStats) viewStats.classList.add('hidden');

    if (tab === 'sales') {
        if (viewSales) viewSales.classList.remove('hidden');
        if (tabNavSales) tabNavSales.className = "flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition tab-active";
        if (tabNavInventory) tabNavInventory.className = "flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 rounded-lg transition";
        if (mainActionText) mainActionText.textContent = "New Sale Entry";
    } else if (tab === 'inventory') {
        if (viewInventory) viewInventory.classList.remove('hidden');
        if (tabNavInventory) tabNavInventory.className = "flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition tab-active";
        if (tabNavSales) tabNavSales.className = "flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 rounded-lg transition";
        if (mainActionText) mainActionText.textContent = "Add Catalog Product";
    } else if (tab === 'stats') {
        if (viewStats) viewStats.classList.remove('hidden');
        updateStatsDashboard();
    }
    updateMobileNavState(tab);
}

function updateMobileNavState(tab) {
    [mobileNavSales, mobileNavInventory, mobileNavStats].forEach(el => {
        if (el) el.classList.remove('active');
    });
    if (tab === 'sales' && mobileNavSales) mobileNavSales.classList.add('active');
    if (tab === 'inventory' && mobileNavInventory) mobileNavInventory.classList.add('active');
    if (tab === 'stats' && mobileNavStats) mobileNavStats.classList.add('active');
}

if (tabNavSales) tabNavSales.addEventListener('click', () => switchTab('sales'));
if (tabNavInventory) tabNavInventory.addEventListener('click', () => switchTab('inventory'));
if (mobileNavSales) mobileNavSales.addEventListener('click', () => switchTab('sales'));
if (mobileNavInventory) mobileNavInventory.addEventListener('click', () => switchTab('inventory'));
if (mobileNavStats) mobileNavStats.addEventListener('click', () => switchTab('stats'));

if (mobileActionBtn) {
    mobileActionBtn.addEventListener('click', () => {
        if (currentTab === 'inventory') inventoryModalOverlay.classList.remove('hidden');
        else saleModalOverlay.classList.remove('hidden');
    });
}
if (mainActionBtn) {
    mainActionBtn.addEventListener('click', () => {
        if (currentTab === 'inventory') inventoryModalOverlay.classList.remove('hidden');
        else saleModalOverlay.classList.remove('hidden');
    });
}

if (closeSaleModalBtn) closeSaleModalBtn.addEventListener('click', () => saleModalOverlay.classList.add('hidden'));
if (cancelSaleBtn) cancelSaleBtn.addEventListener('click', () => saleModalOverlay.classList.add('hidden'));
if (closeInventoryModalBtn) closeInventoryModalBtn.addEventListener('click', () => inventoryModalOverlay.classList.add('hidden'));
if (cancelInventoryBtn) cancelInventoryBtn.addEventListener('click', () => inventoryModalOverlay.classList.add('hidden'));

// ========================================================
// THEME
// ========================================================
function initTheme() {
    const savedTheme = localStorage.getItem('aura_theme');
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
    } else {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
    }
}
if (themeToggleBtn) {
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
}

// ========================================================
// PRODUCT DROPDOWN + AUTO PRICING
// ========================================================
function populateProductDropdown() {
    if (!saleProductSelect) return;
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
        salePriceInput.value = item.website;
    }
}
if (saleProductSelect) saleProductSelect.addEventListener('change', autoFillPrice);
if (salePlatformSelect) salePlatformSelect.addEventListener('change', autoFillPrice);

// ========================================================
// FORM SUBMISSIONS
// ========================================================
if (saleForm) {
    saleForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = document.getElementById('submitSaleBtn');
        submitBtn.disabled = true;

        const newSale = {
            type: 'sale',
            product: saleProductSelect.value,
            platform: salePlatformSelect.value,
            price: parseFloat(salePriceInput.value),
            mode: saleModeSelect.value,
            date: new Date().toISOString().split('T')[0],
            notes: saleNotesInput.value.trim()
        };

        const catalogItem = catalogData.find(i => i.name === newSale.product);
        if (catalogItem && catalogItem.stock > 0) {
            catalogItem.stock -= 1;
            renderInventoryTable();
            updateInventoryStats();
        }

        if (GOOGLE_APPS_SCRIPT_URL) {
            try {
                await fetch(GOOGLE_APPS_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newSale)
                });
            } catch (err) {
                console.error("Error logging sale:", err);
            }
        }

        salesLog.unshift(newSale);
        renderSalesTable();
        updateSalesStats();
        updateStatsDashboard();

        saleForm.reset();
        submitBtn.disabled = false;
        saleModalOverlay.classList.add('hidden');
    });
}

if (inventoryForm) {
    inventoryForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = document.getElementById('submitInventoryBtn');
        submitBtn.disabled = true;

        const newProduct = {
            type: 'inventory',
            name: invProductName.value.trim(),
            website: parseFloat(invPriceWebsite.value) || 0,
            meesho: invPriceMeesho.value ? parseFloat(invPriceMeesho.value) : null,
            offline: invPriceOffline.value ? parseFloat(invPriceOffline.value) : null,
            stock: parseInt(invStock.value) || 0,
            manufactured: parseInt(invManufactured.value) || 0
        };

        const existingIndex = catalogData.findIndex(i => i.name.toLowerCase() === newProduct.name.toLowerCase());
        if (existingIndex >= 0) catalogData[existingIndex] = newProduct;
        else catalogData.push(newProduct);

        if (GOOGLE_APPS_SCRIPT_URL) {
            try {
                await fetch(GOOGLE_APPS_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newProduct)
                });
            } catch (err) {
                console.error("Error updating inventory:", err);
            }
        }

        refreshAllUI();
        inventoryForm.reset();
        submitBtn.disabled = false;
        inventoryModalOverlay.classList.add('hidden');
    });
}

// ========================================================
// RENDER SALES TABLE
// ========================================================
function renderSalesTable() {
    if (!salesTableBody) return;

    if (!Array.isArray(salesLog) || salesLog.length === 0) {
        salesTableBody.innerHTML = `<tr><td colspan="6" class="px-6 py-8 text-center text-slate-400">No sales recorded yet.</td></tr>`;
        return;
    }

    salesTableBody.innerHTML = '';
    const filterText = salesSearchInput ? salesSearchInput.value.toLowerCase().trim() : '';

    salesLog.forEach(item => {
        const product = String(item.product || '').trim();
        const platform = String(item.platform || '').trim();

        if (filterText && !product.toLowerCase().includes(filterText) && !platform.toLowerCase().includes(filterText)) return;

        const row = document.createElement('tr');
        row.className = 'hover:bg-slate-50 dark:hover:bg-slate-800/50 transition';
        row.innerHTML = `
            <td class="px-6 py-4 font-medium text-slate-900 dark:text-white" data-label="Product">${product}</td>
            <td class="px-6 py-4 text-slate-600 dark:text-slate-300" data-label="Platform">${platform}</td>
            <td class="px-6 py-4 font-bold text-slate-900 dark:text-emerald-400" data-label="Amount">₹${Number(item.price).toFixed(2)}</td>
            <td class="px-6 py-4" data-label="Payment"><span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-brand-50 dark:bg-brand-950/50 text-brand-700 dark:text-brand-300">${item.mode}</span></td>
            <td class="px-6 py-4 text-xs text-slate-500 dark:text-slate-400" data-label="Date">${item.date}</td>
            <td class="px-6 py-4 text-xs text-slate-500 dark:text-slate-400" data-label="Notes">${item.notes || '-'}</td>
        `;
        salesTableBody.appendChild(row);
    });
}

// ========================================================
// RENDER INVENTORY TABLE
// ========================================================
function renderInventoryTable() {
    if (!inventoryTableBody) return;
    inventoryTableBody.innerHTML = '';
    const filterText = inventorySearchInput ? inventorySearchInput.value.toLowerCase() : '';

    catalogData.forEach(item => {
        if (filterText && !String(item.name || '').toLowerCase().includes(filterText)) return;

        const row = document.createElement('tr');
        row.className = 'hover:bg-slate-50 dark:hover:bg-slate-800/50 transition';

        const statusBadge = item.stock > 0 
            ? `<span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">In Stock</span>`
            : `<span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400">Out of Stock</span>`;

        row.innerHTML = `
            <td class="px-6 py-4 font-semibold text-slate-900 dark:text-white" data-label="Product">${item.name}</td>
            <td class="px-6 py-4 font-medium text-slate-800 dark:text-slate-200" data-label="Website">₹${item.website || '-'}</td>
            <td class="px-6 py-4 text-slate-600 dark:text-slate-300" data-label="Meesho">${item.meesho ? '₹' + item.meesho : '-'}</td>
            <td class="px-6 py-4 text-slate-600 dark:text-slate-300" data-label="Offline">${item.offline ? '₹' + item.offline : '-'}</td>
            <td class="px-6 py-4 font-bold ${item.stock === 0 ? 'text-rose-500' : 'text-slate-800 dark:text-slate-200'}" data-label="Stock">${item.stock}</td>
            <td class="px-6 py-4 text-slate-500 dark:text-slate-400" data-label="Manufactured">${item.manufactured}</td>
            <td class="px-6 py-4" data-label="Status">${statusBadge}</td>
        `;
        inventoryTableBody.appendChild(row);
    });
}

// ========================================================
// STATS
// ========================================================
function updateSalesStats() {
    const totalRev = salesLog.reduce((acc, curr) => acc + (Number(curr.price) || 0), 0);
    const count = salesLog.length;
    const avg = count > 0 ? totalRev / count : 0;

    if (statRevenue) statRevenue.textContent = `₹${totalRev.toFixed(2)}`;
    if (statSalesCount) statSalesCount.textContent = count.toString();
    if (statAvgValue) statAvgValue.textContent = `₹${avg.toFixed(2)}`;
    if (statTotalProductsCount) statTotalProductsCount.textContent = catalogData.length.toString();
}

function updateInventoryStats() {
    const totalItems = catalogData.length;
    const totalStock = catalogData.reduce((acc, curr) => acc + (curr.stock || 0), 0);
    const lowStock = catalogData.filter(i => (i.stock || 0) <= 0).length;

    if (statInvTotalItems) statInvTotalItems.textContent = totalItems.toString();
    if (statInvTotalStock) statInvTotalStock.textContent = totalStock.toString();
    if (statInvLowStock) statInvLowStock.textContent = lowStock.toString();
}

function updateStatsDashboard() {
    const totalRev = salesLog.reduce((acc, curr) => acc + (Number(curr.price) || 0), 0);
    const count = salesLog.length;
    const avg = count > 0 ? totalRev / count : 0;
    const totalStock = catalogData.reduce((acc, curr) => acc + (curr.stock || 0), 0);

    if (statsDashRevenue) statsDashRevenue.textContent = `₹${totalRev.toFixed(2)}`;
    if (statsDashOrders) statsDashOrders.textContent = count.toString();
    if (statsDashAvgOrder) statsDashAvgOrder.textContent = `₹${avg.toFixed(2)}`;
    if (statsDashStock) statsDashStock.textContent = totalStock.toString();
}

if (salesSearchInput) salesSearchInput.addEventListener('input', renderSalesTable);
if (inventorySearchInput) inventorySearchInput.addEventListener('input', renderInventoryTable);