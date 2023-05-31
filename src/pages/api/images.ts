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

  try {
    const res = await fetch(`${BASE_URL}/v1/images/generations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({ prompt, n, size }),
    });
    console.log(55555, res);

    const data = await res.json();
    const { data: images = [], error } = data;

    if (error?.message) {
      throw new Error(error.message);
    }

    return new Response(
      JSON.stringify({
        data: images?.map((img) => img.url) || [],
      }),
      { status: 200 }
    );
  } catch (e) {
    console.log('Error', e);
    return new Response(JSON.stringify({ msg: e?.message || e?.stack || e }), {
      status: 500,
    });
  }
};
