// Coordinates for 200 Canisteo St, Hornell, NY
const centerLat = 42.3242;
const centerLng = -77.6602;
const radius = 48280; // 30 miles in meters

// Initialize the map
const map = L.map("map").setView([centerLat, centerLng], 10);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 18 }).addTo(map);
const radiusCircle = L.circle([centerLat, centerLng], {
  color: "#332014",
  fillColor: "#c49362",
  fillOpacity: 0.5,
  radius: radius,
}).addTo(map);

// PNG elements to display on success
const stampOverlay = document.createElement("img");
stampOverlay.src = "./images/overlay-stamp.png"; // Path to your overlay PNG
stampOverlay.style.position = "absolute";
stampOverlay.style.top = "390px"; // Adjust based on your layout
stampOverlay.style.left = "470px"; // Adjust based on your layout
stampOverlay.style.width = "100px";
stampOverlay.style.display = "none"; // Hidden by default
document.body.appendChild(stampOverlay);

const belowStampOverlay = document.createElement("img");
belowStampOverlay.src = "./images/below-stamp.png"; // Path to your second PNG
belowStampOverlay.style.position = "absolute";
belowStampOverlay.style.top = "500px"; // Adjust based on your layout
belowStampOverlay.style.left = "470px"; // Adjust based on your layout
belowStampOverlay.style.width = "150px";
belowStampOverlay.style.display = "none"; // Hidden by default
document.body.appendChild(belowStampOverlay);

// Autocomplete function
let debounceTimer;
async function autocompleteAddress() {
  const query = document.getElementById("address").value;
  const suggestionsList = document.getElementById("suggestions");

  // Clear previous suggestions
  suggestionsList.innerHTML = "";

  if (query.length < 3) {
    return; // Don't search for very short inputs
  }

  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(async () => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&countrycodes=us&q=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    const filteredResults = data.filter(
      (item) => item.address.state === "New York" || item.address.state === "Pennsylvania"
    );

    filteredResults.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item.display_name;
      li.onclick = () => {
        document.getElementById("address").value = item.display_name;
        suggestionsList.innerHTML = "";
      };
      suggestionsList.appendChild(li);
    });

    if (filteredResults.length === 0) {
      const li = document.createElement("li");
      li.textContent = "No suggestions found for NY or PA.";
      li.style.color = "#332014";
      suggestionsList.appendChild(li);
    }
  }, 300);
}

// Check address within the radius
async function checkAddress() {
  const address = document.getElementById("address").value;

  if (!address) {
    alert("Please enter a valid address.");
    return;
  }

  // Fetch the address coordinates
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&countrycodes=us&q=${encodeURIComponent(address)}`
  );
  const data = await response.json();

  if (data.length === 0) {
    alert("Address not found. Please try again.");
    return;
  }

  // Extract latitude, longitude, and address details
  const { lat, lon, display_name: displayName, address: addr } = data[0];
  if (addr.state !== "New York" && addr.state !== "Pennsylvania") {
    alert("The address is outside of NY or PA.");
    return;
  }

  // Calculate distance
  const distance = map.distance([lat, lon], [centerLat, centerLng]);

  // Update the map
  map.setView([lat, lon], 13); // Zoom in closer to the selected address
  L.marker([lat, lon])
    .addTo(map)
    .bindPopup(displayName)
    .openPopup();

  // Check if within radius
  if (distance <= radius) {
    // Show PNG overlays
    stampOverlay.style.display = "block";
    belowStampOverlay.style.display = "block";

    alert("This address qualifies for free delivery!");
  } else {
    // Hide PNG overlays
    stampOverlay.style.display = "none";
    belowStampOverlay.style.display = "none";

    alert("The address is outside the 30-mile radius.");
  }
}
