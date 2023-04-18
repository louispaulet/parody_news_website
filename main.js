let articles = [];

document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('article-dropdown')) {
    initDropdown();
    loadArticles();
  }

  if (document.getElementById('search')) {
    initSearch();
  }

  if (document.getElementById('article-title')) {
    loadArticleContent();
  }
});

function initDropdown() {
  const dropdowns = document.querySelectorAll('.dropdown-trigger');
  const instances = M.Dropdown.init(dropdowns);
}

function loadArticles() {
  fetch('articles.json')
    .then(response => response.json())
    .then(loadedArticles => {
      articles = loadedArticles;
      const articleDropdown = document.getElementById('article-dropdown');

      articles.forEach(article => {
        const listItem = createDropdownListItem(article);
        articleDropdown.appendChild(listItem);
      });
    });
}

function createDropdownListItem(article) {
  const listItem = document.createElement('li');
  const link = document.createElement('a');
  link.href = `article.html?title=${encodeURIComponent(article.title)}`;
  link.innerText = article.title;
  listItem.appendChild(link);

  return listItem;
}

function initSearch() {
  const searchInput = document.getElementById('search');
  const searchResults = document.getElementById('search-results');

  searchInput.addEventListener('input', event => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredArticles = articles.filter(article =>
      article.title.toLowerCase().includes(searchTerm)
    );

    updateSearchResults(searchResults, filteredArticles, searchTerm);
  });
}

function updateSearchResults(searchResults, filteredArticles, searchTerm) {
  searchResults.innerHTML = '';

  filteredArticles.forEach(article => {
    const listItem = createDropdownListItem(article);
    searchResults.appendChild(listItem);
  });

  searchResults.style.display = searchTerm ? 'block' : 'none';
}

function loadArticleContent() {
  const urlParams = new URLSearchParams(window.location.search);
  const articleTitle = urlParams.get('title');

  fetch('articles.json')
    .then(response => response.json())
    .then(articles => {
      const article = articles.find(a => a.title === articleTitle);

      if (article) {
        displayArticle(article);
      } else {
        displayNotFound();
      }
    });
}

function displayArticle(article) {
  document.getElementById('article-title').innerText = article.title;
  document.getElementById('article-author').innerText = article.author;
  document.getElementById('article-date').innerText = article.date;
  document.getElementById('article-content').innerText = article.content;
  document.getElementById('article-cover-picture').src = article.cover_picture;
}

function displayNotFound() {
  document.getElementById('article-title').innerText = 'Article not found';
}
