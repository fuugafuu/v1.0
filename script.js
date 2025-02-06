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

  // 候補キーワード提案
  const suggestions = [
    `${query}とは`,
    `${query}の使い方`,
    `${query}のメリットとデメリット`
  ];

  suggestions.forEach(suggestion => {
    const suggestionElement = document.createElement('div');
    suggestionElement.className = 'suggestion';
    suggestionElement.innerText = suggestion;
    suggestionElement.onclick = () => showResults(suggestion);
    suggestionsDiv.appendChild(suggestionElement);
  });

  // AI解説生成（OpenAI API使用）
  const explanation = await generateAIExplanation(query);

  // 検索結果リンクを表示
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

async function generateAIExplanation(query) {
  const apiKey = 'YOUR_OPENAI_API_KEY';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  // ここに取得したAPIキーを入れてください
  const apiUrl = 'https://api.openai.com/v1/completions';

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'text-davinci-003',  // モデルは必要に応じて変更可能（GPT-4も選べます）
      prompt: `${query}について簡単に説明してください。`,
      max_tokens: 200,
      temperature: 0.7
    })
  });

  const data = await response.json();
  return data.choices[0].text.trim();
}
