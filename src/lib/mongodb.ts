// MongoDB service for saving responses
interface ResponseData {
  response: string;
  timestamp: string;
  type: 'meeting_response' | 'proposal_response' | 'alternative_date';
}

export const saveResponseToMongoDB = async (data: ResponseData) => {
  try {
    // This is a placeholder for MongoDB integration
    // You'll need to set up a backend service to actually connect to MongoDB
    
    // Example of what the API call would look like:
    const response = await fetch('/api/save-response', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to save response');
    }

    return await response.json();
  } catch (error) {
    console.error('MongoDB save error:', error);
    throw error;
  }
};

// For development, we can save to localStorage as a fallback
export const saveToLocalStorage = (data: ResponseData) => {
  try {
    const existingResponses = JSON.parse(localStorage.getItem('valentine_responses') || '[]');
    existingResponses.push(data);
    localStorage.setItem('valentine_responses', JSON.stringify(existingResponses));
    return true;
  } catch (error) {
    console.error('LocalStorage save error:', error);
    return false;
  }
};

// Get all responses from localStorage
export const getResponsesFromLocalStorage = () => {
  try {
    return JSON.parse(localStorage.getItem('valentine_responses') || '[]');
  } catch (error) {
    console.error('LocalStorage get error:', error);
    return [];
  }
};
