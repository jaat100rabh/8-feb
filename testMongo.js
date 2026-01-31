import { MongoClient } from 'mongodb';
import { config } from 'dotenv';

// Load environment variables
config();

const uri = process.env.VITE_MONGODB_URI;
const dbName = process.env.VITE_MONGODB_DATABASE;
const collectionName = process.env.VITE_MONGODB_COLLECTION;

console.log('🔗 Testing MongoDB Connection...');
console.log('📍 URI:', uri ? 'URI found' : 'URI not found');
console.log('🗄️ Database:', dbName);
console.log('📁 Collection:', collectionName);

if (!uri) {
  console.error('❌ MongoDB URI not found in .env file');
  process.exit(1);
}

async function testMongoConnection() {
  const client = new MongoClient(uri);
  
  try {
    console.log('🔄 Connecting to MongoDB...');
    await client.connect();
    console.log('✅ Connected to MongoDB successfully!');
    
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    
    // Test insert
    const testDocument = {
      response: 'test_connection',
      timestamp: new Date().toISOString(),
      type: 'test',
      test: true
    };
    
    console.log('📝 Inserting test document...');
    const result = await collection.insertOne(testDocument);
    console.log('✅ Test document inserted with ID:', result.insertedId);
    
    // Test read
    console.log('📖 Reading test document...');
    const documents = await collection.find({ test: true }).toArray();
    console.log('✅ Found', documents.length, 'test documents');
    
    // Clean up test document
    console.log('🧹 Cleaning up test document...');
    await collection.deleteOne({ _id: result.insertedId });
    console.log('✅ Test document cleaned up');
    
    console.log('🎉 MongoDB connection test completed successfully!');
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.error('🔍 Full error:', error);
  } finally {
    await client.close();
    console.log('🔌 Connection closed');
  }
}

testMongoConnection();
