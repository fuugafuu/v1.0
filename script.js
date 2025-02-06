document.getElementById('search-button').addEventListener('click', searchFunction);

async function searchFunction() {
  const query = document.getElementById('search-input').value;
  const resultsDiv = document.getElementById('results');
  const suggestionsDiv = document.getElementById('suggestions');
  
  resultsDiv.innerHTML = '';
  suggestionsDiv.innerHTML = '';

  if (query.trim() === '') {
    resultsDiv.innerHTML = '<p>検索ワードを入力してください。</p>';
    return;
  }

  // 候補キーワード提案（OpenAI APIや固定候補で実装）
  const suggestions = [
    `${query} チュートリアル`,
    `${query} 最新情報`,
    `${query} おすすめツール`
  ];
  
  suggestions.forEach(suggestion => {
    const suggestionElement = document.createElement('div');
    suggestionElement.className = 'suggestion';
    suggestionElement.innerText = suggestion;
    suggestionElement.onclick = () => showResults(suggestion);
    suggestionsDiv.appendChild(suggestionElement);
  });

  // 検索結果リンクを表示
  showResults(query);
}

function showResults(query) {
  const resultsDiv = document.getElementById('results');
  const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  const wikipediaUrl = `https://ja.wikipedia.org/wiki/${encodeURIComponent(query)}`;
  const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;

  resultsDiv.innerHTML = `
    <h3>検索結果リンク:</h3>
    <ul>
      <li><a href="${googleUrl}" target="_blank">Googleで検索</a></li>
      <li><a href="${wikipediaUrl}" target="_blank">Wikipediaで調べる</a></li>
      <li><a href="${youtubeUrl}" target="_blank">YouTubeで検索</a></li>
    </ul>
  `;
}
