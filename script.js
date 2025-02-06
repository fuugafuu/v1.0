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

  // 候補ワード提案
  const suggestions = [
    `${query}とは`,
    `${query}の使い方`,
    `${query}のメリットとデメリット`
  ];

  suggestions.forEach(suggestion => {
    const suggestionElement = document.createElement('div');
    suggestionElement.className = 'suggestion';
    suggestionElement.innerText = suggestion;
    suggestionElement.onclick = async () => {
      resultsDiv.innerHTML = '<p>検索中...</p>';
      const explanation = await generateAIExplanation(suggestion);
      showResults(suggestion, explanation);
    };
    suggestionsDiv.appendChild(suggestionElement);
  });

  // 最初のAI解説生成
  resultsDiv.innerHTML = '<p>検索中...</p>';
  const explanation = await generateAIExplanation(query);
  showResults(query, explanation);
}

async function generateAIExplanation(query) {
  const response = await fetch('/api/serverless-function', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  });

  const data = await response.json();

  if (data.error) {
    return 'AIからの説明を取得できませんでした。';
  }

  return data.text;
}

function showResults(query, explanation) {
  const resultsDiv = document.getElementById('results');

  const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  const wikipediaUrl = `https://ja.wikipedia.org/wiki/${encodeURIComponent(query)}`;
  const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;

  resultsDiv.innerHTML = `
    <h3>AI解説:</h3>
    <p>${explanation}</p>
    <h3>検索結果リンク:</h3>
    <ul>
      <li><a href="${googleUrl}" target="_blank">Googleで検索</a></li>
      <li><a href="${wikipediaUrl}" target="_blank">Wikipediaで調べる</a></li>
      <li><a href="${youtubeUrl}" target="_blank">YouTubeで検索</a></li>
    </ul>
  `;
}
