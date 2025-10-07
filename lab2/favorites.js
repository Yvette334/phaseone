let favoriteBooks = JSON.parse(localStorage.getItem('favoriteBooks')) || [];

// Update favorites badge count
function updateFavoritesBadge() {
    const badge = document.getElementById('favorites-badge');
    if (badge) {
        badge.textContent = favoriteBooks.length;
    }
}

// Toggle favorite status for a book
function toggleFavorite(bookId, heartIcon) {
    const index = favoriteBooks.indexOf(bookId);
    
    if (index === -1) {
        // Add to favorites
        favoriteBooks.push(bookId);
        heartIcon.classList.remove('far');
        heartIcon.classList.add('fas', 'text-red-500');
    } else {
        // Remove from favorites
        favoriteBooks.splice(index, 1);
        heartIcon.classList.remove('fas', 'text-red-500');
        heartIcon.classList.add('far');
    }
    
    // Save to localStorage
    localStorage.setItem('favoriteBooks', JSON.stringify(favoriteBooks));
    
    // Update badge
    updateFavoritesBadge();
    
    // If we're on the favorites page, refresh the display
    if (window.location.pathname.includes('favorite.html')) {
        displayFavoriteBooks();
    }
}

// Display favorite books on the favorites page
function displayFavoriteBooks() {
    const container = document.getElementById('favorites-container');
    const emptyMessage = document.getElementById('empty-favorites');
    
    if (!container) return;
    
    // Clear container
    container.innerHTML = '';
    
    if (favoriteBooks.length === 0) {
        // Show empty message
        emptyMessage.classList.remove('hidden');
        container.classList.add('hidden');
    } else {
        // Hide empty message
        emptyMessage.classList.add('hidden');
        container.classList.remove('hidden');
        
        // Create book data
        const bookData = {
            '1': { title: 'Jane Eyre', author: 'Charlotte Brontë', image: 'images/1.jpg' },
            '2': { title: 'Don Quixote', author: 'Miguel de Cervantes', image: 'images/2.jpg' },
            '3': { title: 'Don Quixote', author: 'Miguel de Cervantes', image: 'images/2.jpg' },
            '4': { title: 'A Tale of Two Cities', author: 'Charles Dickens', image: 'images/3.jpg' },
            '5': { title: 'Don Quixote', author: 'Miguel de Cervantes', image: 'images/2.jpg' },
            '6': { title: 'Crime and Punishment', author: 'Fyodor Dostoevsky', image: 'images/5.jpg' },
            '7': { title: 'Jane Eyre', author: 'Charlotte Brontë', image: 'images/1.jpg' }
        };
        
        // Display each favorite book
        favoriteBooks.forEach(bookId => {
            const book = bookData[bookId];
            if (book) {
                const bookCard = document.createElement('div');
                bookCard.className = 'h-full flex flex-col border border-border rounded-lg hover:shadow-lg bg-white';
                bookCard.innerHTML = `
                    <div class="p-0">
                        <div class="relative bg-white">
                            <img src="${book.image}" alt="${book.title}" class="w-full h-full object-cover">
                            <button class="absolute top-2 left-2 p-2 rounded-full bg-white hover:bg-white hover:scale-110 favorite-btn" data-book-id="${bookId}">
                                <i class="fas fa-heart text-red-500"></i>
                            </button>
                        </div>
                    </div>
                    <div class="flex-1 p-4">
                        <h3 class="text-lg line-clamp-2 mb-2">${book.title}</h3>
                        <p class="mb-3">${book.author}</p>
                    </div>
                `;
                container.appendChild(bookCard);
            }
        });
        
        // Add event listeners to the favorite buttons on the favorites page
        container.querySelectorAll('.favorite-btn').forEach(button => {
            button.addEventListener('click', function() {
                const bookId = this.getAttribute('data-book-id');
                const heartIcon = this.querySelector('i');
                toggleFavorite(bookId, heartIcon);
            });
        });
    }
}

// Initialize the page
function initFavorites() {
    // Set initial badge count
    updateFavoritesBadge();
    
    // If we're on the favorites page, display the favorite books
    if (window.location.pathname.includes('favorite.html')) {
        displayFavoriteBooks();
    } else {
        // Set initial heart states for existing books on homepage
        favoriteBooks.forEach(bookId => {
            const heartIcon = document.querySelector(`.favorite-btn[data-book-id="${bookId}"] i`);
            if (heartIcon) {
                heartIcon.classList.remove('far');
                heartIcon.classList.add('fas', 'text-red-500');
            }
        });
        
        // Add event listeners to all favorite buttons on homepage
        document.querySelectorAll('.favorite-btn').forEach(button => {
            button.addEventListener('click', function() {
                const bookId = this.getAttribute('data-book-id');
                const heartIcon = this.querySelector('i');
                toggleFavorite(bookId, heartIcon);
            });
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initFavorites);