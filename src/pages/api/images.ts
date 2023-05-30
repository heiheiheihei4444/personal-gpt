import { BASE_URL } from '@contants';
import type { APIRoute } from 'astro';

export const post: APIRoute = async ({ request }) => {
  const { apiKey, prompt, size, n } = await request.json();
  let key = apiKey;

  if (!key) {
    if (!import.meta.env.OPEN_API_KEY) {
      return { body: 'APIKEY 未填写或不存在！' };
    }
    key = import.meta.env.OPEN_API_KEY;
  }

  const res = await fetch(`${BASE_URL}/v1/images/generations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({ prompt, response_format: 'url', n }),
  }).catch((err) => {
    return { body: err };
  });

  if (!res.ok) {
    return new Response(res.body, {
      status: 500,
    });
  }

  return new Response(res.body);
};
