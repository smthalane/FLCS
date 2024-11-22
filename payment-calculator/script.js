document.getElementById('calculate').addEventListener('click', function () {
  // Retrieve input values
  const baseCost = parseFloat(document.getElementById('buildingCost').value) || 0;
  const options = parseFloat(document.getElementById('options').value) || 0;
  const discount = parseFloat(document.getElementById('discount').value) || 0;

  // Validate inputs
  if (baseCost < 0 || options < 0 || discount < 0) {
    alert('Please enter positive values only.');
    return;
  }

  // Calculate total cost after applying discount
  const totalCost = baseCost + options - discount;

  if (totalCost < 0) {
    alert('Total cost cannot be negative. Check your discount value.');
    document.getElementById('totalCost').value = '';
    return;
  }

  // Update the Total Cost field
  document.getElementById('totalCost').value = totalCost.toFixed(2);

  // Calculate monthly payments
  document.getElementById('monthly36').value = (totalCost / 21.6).toFixed(2);
  document.getElementById('monthly48').value = (totalCost / 24).toFixed(2);
  document.getElementById('monthly60').value = (totalCost / 27).toFixed(2);
});
