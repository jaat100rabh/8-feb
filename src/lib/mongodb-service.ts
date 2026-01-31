// MongoDB service for saving responses
interface ResponseData {
  response: string;
  timestamp: string;
  type: 'meeting_response' | 'proposal_response' | 'alternative_date';
}

export const saveResponseToMongoDB = async (data: ResponseData) => {
  try {
    // Note: For frontend MongoDB connection, you'll need a backend API
    // This is a placeholder for when you set up your backend
    
    const response = await fetch('/api/mongodb/save-response', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to save to MongoDB');
    }

    const result = await response.json();
    console.log('Response saved to MongoDB successfully:', result);
    return result;
  } catch (error) {
    console.error('MongoDB save error:', error);
    throw error;
  }
};

// For development, we can simulate MongoDB save
export const simulateMongoDBSave = (data: ResponseData) => {
  console.log('🗄️ MongoDB Simulation - Would save:', data);
  console.log('📊 MongoDB URI:', import.meta.env.VITE_MONGODB_URI);
  console.log('🗃️ Database:', import.meta.env.VITE_MONGODB_DATABASE);
  console.log('📁 Collection:', import.meta.env.VITE_MONGODB_COLLECTION);
  return true;
};
