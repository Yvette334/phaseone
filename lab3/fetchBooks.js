// app.js - Combined version
let currentSearch = 'trending';

// API function (from fetchBooks.js)
async function fetchBooks(search = 'classic') {
    const response = await fetch(`https://openlibrary.org/search.json?q=${search}&limit=8`);
    const data = await response.json();
    return data.docs;
}

// Main app functions
async function loadBooks() {
    const books = await fetchBooks(currentSearch);
    showBooks(books);
}

function showBooks(books) {
    const grid = document.getElementById('books-grid');
    grid.innerHTML = '';
    
    if (books.length === 0) {
        grid.innerHTML = '<div class="col-span-full text-center py-12">No books found</div>';
        return;
    }
    
    books.forEach((book, index) => {
        const coverUrl = book.cover_i 
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            : 'images/default-book.jpg';
            
        grid.innerHTML += `
            <div class="overflow-hidden h-full flex flex-col border border-border rounded-lg bg-card hover:shadow-lg">
                <div class="p-0">
                    <div class="relative aspect-[3/4] overflow-hidden bg-muted">
                        <img src="${coverUrl}" alt="${book.title}" class="w-full h-full object-cover">
                        <button class="absolute top-2 left-2 p-2 rounded-full bg-white hover:bg-white hover:scale-110 favorite-btn" data-book-id="api-${index}">
                            <i class="far fa-heart text-gray-600"></i>
                        </button>
                    </div>
                </div>
                <div class="flex-1 p-4">
                    <h3 class="text-lg line-clamp-2 mb-2">${book.title}</h3>
                    <p class="mb-3">${book.author_name?.[0] || 'Unknown Author'}</p>
                </div>
                <div class="p-4 pt-0">
                    <button class="w-full px-4 py-2 border border-border rounded-lg">View Details</button>
                </div>
            </div>
        `;
    });
}

// Search
document.getElementById('Search-btn').addEventListener('click', () => {
    currentSearch = document.getElementById('inputsearch').value || 'books';
    loadBooks();
});

// Start
loadBooks();