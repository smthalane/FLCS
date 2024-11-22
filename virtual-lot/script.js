// Log when the map loads
window.onload = () => {
  console.log("Inventory map loaded successfully.");
};

// Add hover effect logging for the map container
const mapContainer = document.querySelector('.map-container');
mapContainer.addEventListener('mouseenter', () => {
  console.log("Mouse entered the map area.");
});
mapContainer.addEventListener('mouseleave', () => {
  console.log("Mouse left the map area.");
});

// Simulate a click on the button under the overlay when "MENU" is clicked
function simulateClick() {
  // Find the iframe
  const iframe = document.querySelector('iframe');

  // Log the interaction
  console.log('MENU clicked. Attempting to interact with the underlying button.');

  // Attempt to pass focus to the iframe (if permissions allow)
  iframe.contentWindow.postMessage('menuClick', '*');
}

// Listen for message events (if needed for cross-origin communication)
window.addEventListener('message', (event) => {
  console.log('Message received from iframe:', event.data);
});
