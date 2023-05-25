import type { APIRoute } from 'astro';
import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from 'eventsource-parser';

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
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  let counter = 0;

  const stream = new ReadableStream({
    async start(controller) {
      function onParse(event: ParsedEvent | ReconnectInterval) {
        if (event.type === 'event') {
          const data = event.data;
          if (data === '[DONE]') {
            controller.close();
            return;
          }
          try {
            const json = JSON.parse(data);
            const text = json.choices[0]?.delta?.content;
            if (!text) return;
            if (counter < 2 && (text.match(/\n/) || []).length) {
              return;
            }
            const queue = encoder.encode(text);
            controller.enqueue(queue);
            counter++;
          } catch (e) {
            controller.error(e);
          }
        }
      }

      const parser = createParser(onParse);
      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });
  return new Response(stream);
};
