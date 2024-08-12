// pages/api/openai.js
import OpenAI from 'openai';

const openai = new OpenAI({apiKey: process.env.NEXT_PUBLIC_OPEN_API_KEY, dangerouslyAllowBrowser: true});

export async function POST(req) {
  try {
    const { question } = await req.json();

    const response = await openai.chat.completions.create({
      messages: [{ role: "system", content: question }],
      model: "gpt-4o-mini",
    })
    return new Response(JSON.stringify({ text: response.choices[0].message.content }), {
        headers: { 'Content-Type': 'application/json' },
      });
  } catch (error) {
    // Handle errors and send error response
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}