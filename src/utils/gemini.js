import axios from 'axios';

const DEFAULT_KEY = atob(
  'QVEuQWI4Uk42SzBTMy1EQ053eDQ5a2R0REtKcm9LRERDQmdwbnZJUjNuaENtbU1uZmNHWmc='
);
const GEMINI_KEY = import.meta.env.VITE_GEMINI_KEY || DEFAULT_KEY;
const GEMINI_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent';

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

  const parts = data?.candidates?.[0]?.content?.parts || [];
  const textPart = parts.find((p) => p.text && !p.thought);
  const rawTitle = textPart ? textPart.text : parts[0]?.text;
  const title = rawTitle ? rawTitle.trim().replace(/^["']|["']$/g, '') : null;

  if (!title) throw new Error('No movie suggestion received from the AI.');
  return title;
}
