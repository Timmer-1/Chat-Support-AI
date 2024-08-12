import { GoogleGenerativeAI } from "@google/generative-ai";

const api_key = process.env.NEXT_PUBLIC_GEM_API_KEY;
const genAI = new GoogleGenerativeAI(api_key);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req) {
  try {
    const { question } = await req.json();

    const result = await model.generateContent(question);
    const response = await result.response;
    const response_text = response.text();

    return new Response(JSON.stringify({ text: response_text }), {
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