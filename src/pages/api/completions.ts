import type { APIRoute } from 'astro';
import { WebSocketServer } from 'ws';

export const post: APIRoute = async ({ request }) => {
  const baseUrl = 'https://api.openai.com';

  const { apiKey, model, temperature, messages } = await request.json();
  let key = apiKey;

  if (!key) {
    if (!import.meta.env.OPEN_API_KEY) {
      return { body: 'APIKEY 未填写或不存在！' };
    }
    key = import.meta.env.OPEN_API_KEY;
  }
  const res = await fetch(`${baseUrl}/v1/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({ model, temperature, messages, stream: true }),
  });

  if (!res.ok) {
    return new Response(res.body, {
      status: res.status,
    });
  }

  const reader = res.body?.getReader();
  const stream = new ReadableStream({
    start(controller) {
      const push = () => {
        reader?.read().then(({ value, done }) => {
          if (done) {
            controller.close();
            return;
          }
          push();
        });
      };
      push();
    },
  });
  return new Response(stream);
};
