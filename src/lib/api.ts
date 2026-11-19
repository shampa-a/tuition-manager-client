const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface ApiOptions {
  method?: string;
  body?: unknown;
  token?: string;
}

export async function apiRequest<T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (options.token) {
    headers.Authorization = `Bearer ${options.token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    method: options.method || "GET",
    headers,
    body: options.body
      ? JSON.stringify(options.body)
      : undefined,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data as T;
}