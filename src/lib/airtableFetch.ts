export const airtableFetch =
  async <T>(url: RequestInfo | URL, init?: RequestInit) => {
    const base_url = process.env.AIRTABLE_BASE_URL;
    const key = process.env.AIRTABLE_API_KEY;

    if (!base_url || !key) {
      throw new Error("Missing base_url or key");
    }

    const { headers } = init || {};

    const newHeaders = new Headers(headers);
    newHeaders.set("Authorization", `Bearer ${key}`);
    newHeaders.set("Content-Type", "application/json");

    // const encodedUrl = encodeURIComponent(url.toString());
    // console.log(`fetching ${base_url}/${url}`);

    const response = await fetch(`${base_url}/${url}`, {
      ...init,
      headers: newHeaders,
    });

    if(!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json() as Promise<T>;
  };
