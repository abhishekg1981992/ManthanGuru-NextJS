const API_BASE = "https://mg-mobile-admin-production.up.railway.app";
const TIMEOUT_MS = 15000;

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("admin_token");
}

class ApiRequestError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {};

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (
    !(options.body instanceof FormData) &&
    options.body &&
    typeof options.body === "string"
  ) {
    headers["Content-Type"] = "application/json";
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: { ...headers, ...options.headers },
      signal: controller.signal,
    });

    if (!res.ok) {
      let msg = `Request failed with status ${res.status}`;
      try {
        const body = await res.json();
        if (body.message) msg = body.message;
        if (body.error) msg = body.error;
      } catch {}
      throw new ApiRequestError(msg, res.status);
    }

    const contentType = res.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      return res.json();
    }
    return res.blob() as unknown as T;
  } catch (err) {
    if (err instanceof ApiRequestError) throw err;
    if ((err as Error).name === "AbortError") {
      throw new ApiRequestError("Request timed out", 408);
    }
    throw new ApiRequestError((err as Error).message || "Network error", 0);
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function healthCheck(): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(`${API_BASE}/health`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return res.ok;
  } catch {
    return false;
  }
}

export const api = {
  get: <T>(endpoint: string) => request<T>(endpoint),

  post: <T>(endpoint: string, body?: unknown) =>
    request<T>(endpoint, {
      method: "POST",
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),

  put: <T>(endpoint: string, body?: unknown) =>
    request<T>(endpoint, {
      method: "PUT",
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),

  delete: <T>(endpoint: string) =>
    request<T>(endpoint, { method: "DELETE" }),
};
