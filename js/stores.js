// Sample store data (replace with actual store data)
const stores = [
    {
        name: "Forest Essentials Store",
        address: "123 Main Street, Mumbai",
        city: "Mumbai",
        state: "Maharashtra",
        coordinates: [19.0760, 72.8777],
        phone: "+91 1234567890",
        email: "store1@forestessentials.com"
    },
    {
        name: "Forest Essentials Store",
        address: "456 Market Street, Delhi",
        city: "Delhi",
        state: "Delhi",
        coordinates: [28.7041, 77.1025],
        phone: "+91 1234567891",
        email: "store2@forestessentials.com"
    },
    // Add more stores as needed
];

// Initialize map
function initMap() {
    const map = L.map('storeMap').setView([20.5937, 78.9629], 5); // India center coordinates
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add markers for all stores
    stores.forEach(store => {
        const marker = L.marker(store.coordinates).addTo(map);
        marker.bindPopup(`
            <h3>${store.name}</h3>
            <p>${store.address}</p>
            <p>${store.city}, ${store.state}</p>
            <p>Phone: ${store.phone}</p>
            <p>Email: ${store.email}</p>
        `);
    });

    return map;
}

// Function to filter stores
function filterStores() {
    const state = document.getElementById('stateFilter').value;
    const city = document.getElementById('cityFilter').value;
    const search = document.getElementById('searchInput').value.toLowerCase();
    
    const filteredStores = stores.filter(store => {
        const matchesSearch = store.name.toLowerCase().includes(search) || 
                            store.city.toLowerCase().includes(search) ||
                            store.state.toLowerCase().includes(search);
        
        const matchesFilters = (!state || store.state === state) &&
                             (!city || store.city === city);
        
        return matchesSearch && matchesFilters;
    });

    // Update store list
    const storeResults = document.getElementById('storeResults');
    storeResults.innerHTML = filteredStores.map(store => `
        <div class="store-item">
            <h3>${store.name}</h3>
            <div class="store-address">
                <p>${store.address}</p>
                <p>${store.city}, ${store.state}</p>
                <p>Phone: ${store.phone}</p>
                <p>Email: ${store.email}</p>
            </div>
        </div>
    `).join('');
}

// Populate state dropdown
function populateStateDropdown() {
    const states = [...new Set(stores.map(store => store.state))];
    const stateSelect = document.getElementById('stateFilter');
    states.forEach(state => {
        const option = document.createElement('option');
        option.value = state;
        option.textContent = state;
        stateSelect.appendChild(option);
    });
}

// Event listeners
window.addEventListener('DOMContentLoaded', () => {
    initMap();
    populateStateDropdown();
    
    // Add event listeners for filtering
    document.getElementById('searchInput').addEventListener('input', filterStores);
    document.getElementById('stateFilter').addEventListener('change', filterStores);
    document.getElementById('cityFilter').addEventListener('change', filterStores);
});
