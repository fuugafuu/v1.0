export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  // ダミーの返答
  const explanation = `${query} についての簡単な説明です。`;

  res.status(200).json({ text: explanation });
}
