const GEMINI_MODEL = 'gemini-3.8-flash'
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`

async function generateContent(contents, generationConfig) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY
  if (!apiKey) {
    throw new Error('Add VITE_GEMINI_API_KEY to your .env.local file to enable Gemini.')
  }

  const response = await fetch(`${GEMINI_ENDPOINT}?key=${encodeURIComponent(apiKey)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents, generationConfig }),
  })

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null)
    const message = errorBody?.error?.message
    throw new Error(message || `Gemini request failed (${response.status}). Check your API key and try again.`)
  }

  const data = await response.json()
  const text = data.candidates?.[0]?.content?.parts
    ?.map((part) => part.text ?? '')
    .join('')
    .trim()

  if (!text) {
    throw new Error('Gemini returned an empty response. Please try again.')
  }
  return text
}

export async function sendChatPrompt(prompt, history) {
  const contents = [
    {
      role: 'user',
      parts: [{ text: 'You are a friendly, concise assistant for Northstar, an IT company offering custom software, cloud and infrastructure, and data and AI services. Answer accurately, and do not invent company-specific details.' }],
    },
    ...history.map((message) => ({
      role: message.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: message.text }],
    })),
    { role: 'user', parts: [{ text: prompt }] },
  ]

  return generateContent(contents)
}

export async function generateFaqs() {
  const text = await generateContent(
    [{
      role: 'user',
      parts: [{
        text: 'Create 5 common questions and helpful concise answers about an IT company that provides custom software, cloud and infrastructure, and data and AI services. Return only a valid JSON array of objects, each with string properties "question" and "answer". Do not use markdown.',
      }],
    }],
    { responseMimeType: 'application/json' },
  )

  let faqs
  try {
    faqs = JSON.parse(text)
  } catch {
    throw new Error('Gemini returned FAQ content in an unexpected format. Showing sample FAQs instead.')
  }

  if (!Array.isArray(faqs) || !faqs.every((faq) =>
    faq && typeof faq.question === 'string' && typeof faq.answer === 'string',
  )) {
    throw new Error('Gemini returned FAQ content in an unexpected format. Showing sample FAQs instead.')
  }

  return faqs
}
