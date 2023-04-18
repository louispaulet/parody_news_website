document.addEventListener('DOMContentLoaded', function() {
  fetch('article.json')
    .then(response => response.json())
    .then(data => {
      document.getElementById('article-title').innerText = data.title;
      document.getElementById('article-author').innerText = data.author;
      document.getElementById('article-date').innerText = data.date;
      document.getElementById('article-content').innerText = data.content;
      document.getElementById('article-cover-picture').src = data.cover_picture;
    });
});
