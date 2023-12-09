export const apiRequest = async (method, endpoint, body = null, params = null) => {
    const url = new URL(`http://localhost:8000/${endpoint}`);
    
    if (params) {
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    }
  
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : null,
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
  
      // Save to local storage
      localStorage.setItem(endpoint, JSON.stringify(data));
  
      return data;
    } catch (error) {
      console.error('Error:', error);
  
      // Get from local storage if API call fails
      const data = localStorage.getItem(endpoint);
      return data ? JSON.parse(data) : null;
    }
  };