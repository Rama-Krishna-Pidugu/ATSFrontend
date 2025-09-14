export const createFetchWithAuth = (getAuthHeaders: () => Promise<Record<string, string>>) => {
  return async (url: string, options: RequestInit = {}) => {
    const headers = await getAuthHeaders();
    
    return fetch(url, {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
      credentials: 'include',
    });
  };
}; 