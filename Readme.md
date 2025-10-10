# 📚 Book Explorer

A modern, responsive web application for discovering and managing your favorite books using the Open Library API.

## 🏗️ Project Structure

```
phaseone/
├── lab1/                   # Lab 1: Foundation & UI
│   └── index.html          # Main homepage with book search
├── lab2/                   # Lab 2: Favorites Management
│   ├── favorite.html       # Favorites display page
│   └── favorites.js        # Favorites functionality
└── lab3/                   # Lab 3: API Integration
    └── fetchBooks.js       # Open Library API integration
```

## ✨ Features

- **🔍 Real-time Search**: Find books using Open Library API
- **❤️ Favorites System**: Add/remove books with heart icons
- **💾 Local Storage**: Your favorites save automatically
- **📱 Mobile-Friendly**: Responsive design works on all devices
- **🎨 Modern UI**: Clean interface with Tailwind CSS
- **⚡ Fast Loading**: No backend required - pure frontend

## 🚀 Quick Start
### Option 2: Run Locally
1. Clone this repository
2. Open in your web browser
3. That's it! No installation needed

## 💡 How to Use

### Searching for Books
1. Type any book title in the search bar
2. Click "Search" or press Enter
3. Browse real book results from the Open Library

### Managing Favorites
- Click the ♡ heart icon on any book to add to favorites
- The heart turns red ❤️ when favorited
- View all favorites: [Favorites Page]
- Click again to remove from favorites

## 🛠️ Built With

- **HTML5** - Page structure
- **CSS3** - Styling with Tailwind CSS
- **JavaScript** - Interactive functionality
- **Open Library API** - Real book data
- **Font Awesome** - Beautiful icons
- **GitHub Pages** - Free hosting

## 📖 What I Learned

This project helped me master:
- **Async JavaScript** with API calls
- **DOM Manipulation** for dynamic content
- **Local Storage** for data persistence
- **Event Handling** for user interactions
- **Responsive Design** principles
- **Git & GitHub** for version control

## 🔧 Technical Details

### API Integration
```javascript
// Fetches books from Open Library
async function fetchBooks(search) {
  const response = await fetch(`https://openlibrary.org/search.json?q=${search}&limit=8`);
  return response.json();
}
```

### Favorites System
- Uses browser localStorage
- Persists between sessions
- Real-time UI updates
- Cross-page synchronization

## 🌟 Project Highlights

- **No Backend Required** - Pure frontend application
- **Fast Deployment** - Hosted on GitHub Pages
- **Zero Dependencies** - No npm packages needed
- **Cross-Browser** - Works on all modern browsers

## 📱 Browser Support

- ✅ Chrome
- ✅ Firefox
- ✅ Safari
- ✅ Edge

## 🤝 Contributing

Feel free to:
- Report bugs
- Suggest features
- Fork and enhance
- Share with others
- 
## 🙏 Acknowledgments

- [Open Library](https://openlibrary.org/) for free book data
- [Tailwind CSS](https://tailwindcss.com/) for amazing styling
- [GitHub](https://github.com/) for free hosting

git clone https://github.com/Yvette334/phaseone.git
