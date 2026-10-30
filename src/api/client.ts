const TOKEN_KEY = 'imlight_jwt';

export function getStoredToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
}

export function setStoredToken(token: string | null): void {
    if(token)
        localStorage.setItem(TOKEN_KEY, token);
    else
        localStorage.removeItem(TOKEN_KEY);
}

export async function apiFetch<T>(
    path: string,
    options: RequestInit = {}
): Promise<T> {
    const token = getStoredToken();
    const headers = new Headers(options.headers || {});

    if (!headers.has('Content-Type') && options.body) {
        headers.set('Content-Type', 'application/json');
    }

    if(token) {
        headers.set('Authorization', `Bearer ${token}`);
    }

     const response = await fetch(path, {
        ...options,
        headers,
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        const errorMessage =
        (data && typeof data.error === 'string' && data.error) ||
        `Request failed (${response.status})`;

        throw new Error(errorMessage);
    }

    return data as T;
}