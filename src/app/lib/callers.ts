import { openDB } from 'idb';
export const apiRequest = async (method, endpoint, body = null, params = null, responseType = 'json', requestBodyType = 'json') => {
  const url = endpoint;
  if (params) {
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  }
  const requestKey = `${method} ${url} ${JSON.stringify(body)}`;
  try {
    const response = await fetch(url, {
        method,
        headers: {
            'Content-Type': requestBodyType === 'json' ? 'application/json' : 'application/x-www-form-urlencoded',
        },
        body: body ? (requestBodyType === 'json' ? JSON.stringify(body) : new URLSearchParams(body)) : null,
    });

    if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status} ${await response.text()}`);
    }

    const data = responseType === 'json' ? await response.json() : await response.text();

    // If the request is successful, delete it from the IndexedDB
    const db = await openDB('api-requests', 1);
    const tx = db.transaction('requests', 'readwrite');
    await tx.store.delete(requestKey);
    await tx.done;

    return data;
} catch (error) {
  if (!navigator.onLine) {
      // If the network is down, save the request to the IndexedDB
      const db = await openDB('api-requests', 1);
      const tx = db.transaction('requests', 'readwrite');
      await tx.store.add({
          method,
          url: url.toString(),
          body,
          params,
          responseType,
          requestBodyType,
      }, requestKey);
      await tx.done;
  }
}
};

// Function to retry the requests when the network is back
export const retryRequests = async () => {
  const db = await openDB('api-requests', 1);
  const requests = await db.getAll('requests');

  for (const request of requests) {
      let attempts = 0;
      const maxAttempts = 3;
      const delay = 1000; // 1 second

      while (attempts < maxAttempts) {
          try {
              await apiRequest(request.method, request.url, request.body, request.params);
              await db.delete('requests', request.id);
              break;
          } catch (error) {
              attempts++;
              await new Promise(resolve => setTimeout(resolve, delay * attempts));
          }
      }
  }
};

// Listen for the online event to retry the requests
if (typeof window !== 'undefined') {
    window.addEventListener('online', retryRequests);
}