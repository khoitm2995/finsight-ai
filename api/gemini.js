export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Chưa cấu hình GEMINI_API_KEY trên Vercel' });
  }

  try {
    const { model = 'gemini-3-flash-preview', payload } = req.body || {};
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const googleRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await googleRes.json();
    return res.status(googleRes.status).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Lỗi kết nối Gemini API' });
  }
}