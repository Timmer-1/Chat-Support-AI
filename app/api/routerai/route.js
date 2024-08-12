// pages/api/openai.js
import OpenAI from 'openai';

const openai = new OpenAI({baseURL: "https://openrouter.ai/api/v1", apiKey: process.env.NEXT_PUBLIC_ROUTER_API_KEY, dangerouslyAllowBrowser: true});

export async function POST(req) {
  try {
    const { question } = await req.json();

    const response = await openai.chat.completions.create({
      messages: [{ role: "system", content: question }],
      model: "meta-llama/llama-3.1-8b-instruct:free",
    })
    return new Response(JSON.stringify({ text: response.choices[0].message.content}), {
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