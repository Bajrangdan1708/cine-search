import axios from 'axios';

const GEMINI_KEY = import.meta.env.VITE_GEMINI_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`;

export async function getMoodMovie(moodText) {
  if (!GEMINI_KEY) {
    throw new Error('Gemini API key is not configured.');
  }

  const { data } = await axios.post(
    `${GEMINI_URL}?key=${GEMINI_KEY}`,
    {
      contents: [
        {
          parts: [
            {
              text: `Suggest ONE movie based on this mood: "${moodText}". Return ONLY the movie title as a plaintext string. No quotes, no explanation, no punctuation. Just the title.`,
            },
          ],
        },
      ],
    }
  );

  const title = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  if (!title) throw new Error('No movie suggestion received from the AI.');
  return title;
}

