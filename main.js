document.addEventListener('DOMContentLoaded', function() {
  // Initialize the Materialize dropdown menu
  const dropdowns = document.querySelectorAll('.dropdown-trigger');
  M.Dropdown.init(dropdowns);

  // Fetch articles from the JSON file
  fetch('articles.json')
    .then(response => response.json())
    .then(articles => {
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

      // Check if the search input element exists
      const searchInput = document.getElementById('search');
      if (searchInput) {
        // Add event listener for search input
        searchInput.addEventListener('input', event => {
          const searchTerm = event.target.value.toLowerCase();
          const filteredArticles = articles.filter(article =>
            article.title.toLowerCase().includes(searchTerm)
          );

          // Clear the existing dropdown items
          articleDropdown.innerHTML = '';

          // Add filtered articles to the dropdown
          filteredArticles.forEach(article => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = `article.html?title=${encodeURIComponent(article.title)}`;
            link.innerText = article.title;
            listItem.appendChild(link);
            articleDropdown.appendChild(listItem);
          });
        });
      }
    });

  const urlParams = new URLSearchParams(window.location.search);
  const articleTitle = decodeURIComponent(urlParams.get('title'));

  if (articleTitle) {
    fetch('articles.json')
      .then(response => response.json())
      .then(articles => {
        const article = articles.find(a => a.title === articleTitle);
        const articleTitleElement = document.getElementById('article-title');
          if (article) {
            if (articleTitleElement) {
              articleTitleElement.innerText = article.title;
            }
            document.getElementById('article-author').innerText = article.author;
            document.getElementById('article-date').innerText = article.date;
            document.getElementById('article-content').innerText = article.content;
            document.getElementById('article-cover-picture').src = article.cover_picture;
          } else {
            if (articleTitleElement) {
              articleTitleElement.innerText = 'Article not found';
            }
          }
        });
  }
});
