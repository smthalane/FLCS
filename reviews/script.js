// Define reviews and their corresponding colors
const reviews = [
    {
        name: "Cindy K.",
        body: "When deciding whether to agree to a collaboration, I ask myself, 'Do I ever want to see them again?'...",
        color: "#F9E8C9" // Light cream
    },
    {
        name: "Paul L.",
        body: "The good thing about looking through the viewfinder of a film camera is it really helps you look and see...",
        color: "#332014" // Dark brown
    },
    {
        name: "Jacob H.",
        body: "The good thing about looking through the viewfinder of a film camera is it really helps you focus on things...",
        color: "#C49362" // Warm beige
    }
];

// Select the Swiper wrapper
const swiperWrapper = document.querySelector('.swiper-wrapper');

// Dynamically create cards
reviews.forEach((review) => {
    const card = document.createElement('div');
    card.classList.add('swiper-slide');
    card.style.backgroundColor = review.color;

    card.innerHTML = `
        <div class="review-card">
            <div class="reviewer-name">${review.name}</div>
            <div class="review-body">${review.body}</div>
            <div class="stamp"></div>
        </div>
    `;

    swiperWrapper.appendChild(card);
});

// Initialize Swiper.js
const swiper = new Swiper('.swiper-container', {
    effect: 'cards', // Swipe effect
    grabCursor: true,
    loop: true,
});
