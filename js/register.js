const filterButtons = document.querySelectorAll('.vehicle-filter');
const vehicleCards = document.querySelectorAll('.vehicle-card');
const vehicleResults = document.querySelector('#vehicle-results');
const vehicleDialog = document.querySelector('.vehicle-dialog');
const dialogImage = document.querySelector('#vehicle-dialog-image');
const dialogTitle = document.querySelector('#vehicle-dialog-title');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const selectedCategory = button.dataset.filter;
        let visibleCount = 0;

        filterButtons.forEach(filterButton => {
            filterButton.setAttribute('aria-pressed', String(filterButton === button));
        });

        vehicleCards.forEach(card => {
            const isVisible = selectedCategory === 'all' || card.dataset.category === selectedCategory;
            card.hidden = !isVisible;
            visibleCount += Number(isVisible);
        });

        vehicleResults.textContent = `${visibleCount} ${visibleCount === 1 ? 'vehicle' : 'vehicles'} shown`;
    });
});

document.querySelectorAll('.vehicle-photo-button').forEach(photoButton => {
    photoButton.addEventListener('click', () => {
        const image = photoButton.querySelector('img');
        const title = photoButton.closest('.vehicle-card').querySelector('h3').textContent;

        dialogImage.src = image.src;
        dialogImage.alt = image.alt;
        dialogTitle.textContent = title;
        vehicleDialog.showModal();
    });
});

vehicleDialog.addEventListener('click', event => {
    if (event.target === vehicleDialog) {
        vehicleDialog.close();
    }
});
