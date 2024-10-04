'use server';

export const airtableFetch =
  async <T>(url: RequestInfo | URL, init?: RequestInit) => {
    const base_url = process.env.AIRTABLE_BASE_URL!;
    const key = process.env.AIRTABLE_API_KEY!;

    const { headers } = init || {};

    const newHeaders = new Headers(headers);
    newHeaders.set("Authorization", `Bearer ${key}`);
    newHeaders.set("Content-Type", "application/json");

    const encodedUrl = encodeURIComponent(url.toString());

    const response = await fetch(`${base_url}/${encodedUrl}`, {
      ...init,
      headers: newHeaders,
    });

    if(!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json() as Promise<T>;
  };
