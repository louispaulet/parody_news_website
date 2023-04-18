let articles = [];

document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('article-dropdown')) {
    // Initialize the Materialize dropdown menu
    const dropdowns = document.querySelectorAll('.dropdown-trigger');
    const instances = M.Dropdown.init(dropdowns);

    // Fetch articles from the JSON file
    fetch('articles.json')
      .then(response => response.json())
      .then(loadedArticles => {
        articles = loadedArticles;
        const articleDropdown = document.getElementById('article-dropdown');

        articles.forEach(article => {
          // Create a dropdown item for each article
          const listItem = document.createElement('li');
          const link = document.createElement('a');
          link.href = `article.html?title=${encodeURIComponent(article.title)}`;
          link.innerText = article.title;
          listItem.appendChild(link);
          articleDropdown.appendChild(listItem);
        });
      });
  }

  if (document.getElementById('search')) {
    const searchInput = document.getElementById('search');
    const searchResults = document.getElementById('search-results');

    searchInput.addEventListener('input', event => {
      const searchTerm = event.target.value.toLowerCase();
      const filteredArticles = articles.filter(article =>
        article.title.toLowerCase().includes(searchTerm)
      );

      // Clear the existing search results
      searchResults.innerHTML = '';

      // Add filtered articles to the search results
      filteredArticles.forEach(article => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = `article.html?title=${encodeURIComponent(article.title)}`;
        link.innerText = article.title;
        listItem.appendChild(link);
        searchResults.appendChild(listItem);
      });

      // Show or hide the search results
      searchResults.style.display = searchTerm ? 'block' : 'none';
    });
  }

  if (document.getElementById('article-title')) {
    // Get the article title from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const articleTitle = urlParams.get('title');

    // Fetch articles from the JSON file
    fetch('articles.json')
      .then(response => response.json())
      .then(articles => {
        // Find the requested article
        const article = articles.find(a => a.title === articleTitle);

        if (article) {
          // Update the article's content
          document.getElementById('article-title').innerText = article.title;
          document.getElementById('article-author').innerText = article.author;
          document.getElementById('article-date').innerText = article.date;
          document.getElementById('article-content').innerText = article.content;
          document.getElementById('article-cover-picture').src = article.cover_picture;
        } else {
          document.getElementById('article-title').innerText = 'Article not found';
        }
      });
  }
});
