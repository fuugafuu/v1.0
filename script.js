async function fetchSuggestions() {
  const query = document.getElementById('search-input').value;
  const suggestionsDiv = document.getElementById('suggestions');
  suggestionsDiv.innerHTML = '';

  if (query.trim() === '') return;

  const response = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'text-davinci-003',
      prompt: `ユーザーが「${query}」と入力しました。検索候補を3つ提案してください。`,
      max_tokens: 50
    })
  });

  const data = await response.json();
  const suggestions = data.choices[0].text.trim().split('\n');

  suggestions.forEach(suggestion => {
    const suggestionElement = document.createElement('div');
    suggestionElement.className = 'suggestion';
    suggestionElement.innerText = suggestion;
    suggestionElement.onclick = () => showResults(suggestion);
    suggestionsDiv.appendChild(suggestionElement);
  });
}

function showResults(query) {
  const resultsDiv = document.getElementById('results');
  const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
  const amazonUrl = `https://www.amazon.co.jp/s?k=${encodeURIComponent(query)}`;
  
  resultsDiv.innerHTML = `
    <h3>検索結果リンク:</h3>
    <ul>
      <li><a href="${googleUrl}" target="_blank">Googleで検索</a></li>
      <li><a href="${youtubeUrl}" target="_blank">YouTubeで検索</a></li>
      <li><a href="${amazonUrl}" target="_blank">Amazonで検索</a></li>
    </ul>
  `;
}
