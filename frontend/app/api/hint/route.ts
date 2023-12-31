import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
 
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
 
export const runtime = 'edge';

export async function POST(req: Request) {
  const { prompt } = await req.json();
 
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: 'user',
        content: `Given the following coding problem, provide a hint to solve the problem:
        ${prompt}
        
        Output:\n`,
      },
    ],
    max_tokens: 200,
  });
 
  const stream = OpenAIStream(response);
 
  return new StreamingTextResponse(stream);
}