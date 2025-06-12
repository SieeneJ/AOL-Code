let map;
let markers = [];
let userLocation = [-6.229501800941559, 106.65217280494123]; // alam sutera
let userMarker;

// Restaurant data
const restaurants = [
    {
        name: "Pagi Sore @ Alam Sutera",
        description: "Restoran Padang terbaik di Alam Sutera",
        address: "Kav., Jl. Jalur Sutera No.20D",
        rating: 4.6,
        distance: "0.7 km",
        lat: -6.229506896620972,
        lng: 106.65816374002272,
        icon: "🍕"
    },
    {
        name: "The Cobbs Bistro",
        description: "Restoran Australia yang berisi Burger dan Fish and Chips",
        address: "JHL Auto, Alam Sutera, Jl. Jalur Sutera Boulevard",
        rating: 4.9,
        distance: "0.9 km",
        lat: -6.226365902033141,
        lng: 106.65504164869711,
        icon: "🍔"
    },
    {
        name: "Jejudon @Saumata Alam Sutera",
        description: "Korean BBQ House",
        address: "Jl. Alam Utama No.Kav.12-16 Lt. 1",
        rating: 4.6,
        distance: "0.5 km",
        lat: -6.229675072958191,
        lng: 106.65447212739613,
        icon: "🍣"
    },
    {
        name: "Fajar & Senja Cafe - Alam Sutera",
        description: "Berbagai macam kopi dan pastry",
        address: "Ruko Victoria Lane, Jl. Lingkar Barat No.1",
        rating: 4.7,
        distance: "0.4 km",
        lat: -6.228651185759702,
        lng: 106.65095843351654,
        icon: "☕"
    },
    {
        name: "McDonald's Downtown Alam Sutera",
        description: "Restoran cepat saji ternama",
        address: "Jl. Jalur Sutera Boulevard",
        rating: 3.7,
        distance: "0.6 km",
        lat: -6.227659293154613,
        lng: 106.65503539119422,
        icon: "🌮"
    }
];

// Leaflet map
function initMap() {
    // OSM tiles
    map = L.map('leaflet-map', {
        zoomControl: false, //for custom zoom controls
        attributionControl: true
    }).setView(userLocation, 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);

    userMarker = L.circleMarker(userLocation, {
        color: '#ffffff',
        fillColor: '#4285F4',
        fillOpacity: 1,
        weight: 2,
        radius: 8
    }).addTo(map).bindPopup('Your Location');

    // restaurant markers
    restaurants.forEach((restaurant, index) => {
        const customIcon = createCustomIcon(restaurant.icon);
        
        const marker = L.marker([restaurant.lat, restaurant.lng], {
            icon: customIcon
        }).addTo(map);

        const popupContent = `
            <div class="custom-popup">
                <h3>${restaurant.name}</h3>
                <p>${restaurant.description}</p>
                <p>📍 ${restaurant.address}</p>
                <div class="popup-meta">
                    <span class="rating">⭐ ${restaurant.rating}</span>
                    <span class="distance">${restaurant.distance}</span>
                </div>
            </div>
        `;

        marker.bindPopup(popupContent);
        markers.push(marker);
    });
}

// custom marker icons
function createCustomIcon(emoji) {
    const iconDiv = document.createElement('div');
    iconDiv.className = 'custom-marker';
    iconDiv.innerHTML = emoji;
    iconDiv.style.fontSize = '16px';

    return L.divIcon({
        html: iconDiv.outerHTML,
        className: 'custom-leaflet-marker',
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, -20]
    });
}

// Map control
function zoomIn() {
    if (map) {
        map.zoomIn();
    }
}

function zoomOut() {
    if (map) {
        map.zoomOut();
    }
}

function centerMap() {
    if (map) {
        map.setView(userLocation, 15);
        }
}

function toggleView(view) {
    const mapView = document.getElementById('map-view');
    const listView = document.getElementById('list-view');
    const mapToggle = document.getElementById('map-toggle');
    const listToggle = document.getElementById('list-toggle');

    if (view === 'map') {
        mapView.style.display = 'block';
        listView.classList.remove('active');
        mapToggle.classList.add('active');
        listToggle.classList.remove('active');
        
        if (map) {
            setTimeout(() => {
                map.invalidateSize();
                map.setView(userLocation, map.getZoom());
            }, 100);
        }
    } else {
        mapView.style.display = 'none';
        listView.classList.add('active');
        mapToggle.classList.remove('active');
        listToggle.classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initMap();

    document.getElementById('map-toggle').addEventListener('click', () => toggleView('map'));
    document.getElementById('list-toggle').addEventListener('click', () => toggleView('list'));

    // Restaurant card click events
    document.querySelectorAll('.restaurant-card').forEach((card, index) => {
        card.addEventListener('click', function() {
            const restaurant = restaurants[index];
            if (restaurant) {
                toggleView('map');
                setTimeout(() => {
                    if (map) {
                        map.setView([restaurant.lat, restaurant.lng], 17);
                        if (markers[index]) {
                            markers[index].openPopup();
                        }
                    }
                }, 200);
            }
        });
    });

    // Search function
    document.getElementById('search-bar').addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const restaurantCards = document.querySelectorAll('.restaurant-card');
        
        restaurantCards.forEach(card => {
            const name = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            
            if (name.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});