async function getExplanation(query) {
  try {
    const response = await fetch('/api/generate-explanation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query })
    });

    if (!response.ok) {
      throw new Error(`APIエラー: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data.explanation;
  } catch (error) {
    console.error('エラー詳細:', error);
    return 'エラーが発生しました。もう一度お試しください。';
  }
}
