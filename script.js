function searchFunction() {
  const query = document.getElementById('search-input').value;
  const resultsDiv = document.getElementById('results');

  if (query.trim() === '') {
    resultsDiv.innerHTML = '<p>検索ワードを入力してください。</p>';
    return;
  }

  const dummyData = {
    "HTML": "HTML（HyperText Markup Language）は、ウェブページを構築するためのマークアップ言語です。",
    "CSS": "CSS（Cascading Style Sheets）は、HTML要素のデザインやレイアウトを定義するための言語です。",
    "JavaScript": "JavaScriptは、ウェブページに動的な機能を追加するためのプログラミング言語です。",
    "API": "API（Application Programming Interface）は、アプリケーションが相互に通信するためのインターフェースです。"
  };

  const result = dummyData[query] || '検索結果が見つかりませんでした。別の方式を試してください。';
  resultsDiv.innerHTML = `<p><strong>${query}</strong>: ${result}</p>`;
}
