// Select elements
const filterButtons = document.querySelectorAll('.filter-bar button');
const vehicleCards = document.querySelectorAll('.vehicle-card');
const searchInput = document.getElementById('searchInput');
const categorySelect = document.getElementById('categorySelect');
const cheapOnly = document.getElementById('cheapOnly');

// Create "no results" message dynamically
const noResults = document.createElement('p');
noResults.id = 'no-results';
noResults.setAttribute('role', 'status');
noResults.setAttribute('aria-live', 'polite');
noResults.textContent = 'No matching results found.';
document.querySelector('.vehicles-page').appendChild(noResults);

// Unified filtering function
function applyFilters() {
  const activeButton = document.querySelector('.filter-bar button.active');
  const categoryFilter = activeButton ? activeButton.getAttribute('data-filter').toLowerCase() : 'all';
  const searchQuery = searchInput ? searchInput.value.toLowerCase() : '';
  const selectedCategory = categorySelect ? categorySelect.value.toLowerCase() : 'all';
  const priceLimit = 400;
  let visibleCount = 0;

  vehicleCards.forEach(card => {
    const cardCategory = card.dataset.category.toLowerCase();
    const title = card.querySelector('h2').textContent.toLowerCase();
    const type = card.querySelector('.type').textContent.toLowerCase();
    const priceText = card.querySelector('.price').textContent;
    const priceValue = parseInt(priceText.replace(/[^0-9]/g, ''), 10);

    let matchesButton = (categoryFilter === 'all' || cardCategory.includes(categoryFilter));
    let matchesDropdown = (selectedCategory === 'all' || cardCategory.includes(selectedCategory));
    let matchesSearch = (title.includes(searchQuery) || type.includes(searchQuery));
    let matchesPrice = (!cheapOnly.checked || priceValue <= priceLimit);

    if (matchesButton && matchesDropdown && matchesSearch && matchesPrice) {
      card.style.display = 'block';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  noResults.style.display = visibleCount === 0 ? 'block' : 'none';
}

// Event listeners
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => {
      btn.classList.remove('active');
      btn.setAttribute('aria-pressed', 'false');
    });
    button.classList.add('active');
    button.setAttribute('aria-pressed', 'true');
    applyFilters();
  });
});

if (searchInput) searchInput.addEventListener('input', applyFilters);
if (categorySelect) categorySelect.addEventListener('change', applyFilters);
if (cheapOnly) cheapOnly.addEventListener('change', applyFilters);
