import { MongoClient } from "mongodb";

const URI = process.env.MONGO_URI;
const options = {};

// Ensure MONGO_URI is provided
if (!URI) {
    throw new Error("Please add your Mongo URI to your .env.local file");
}

// Declare a cached client and clientPromise to reuse during development
let client;
let clientPromise;

if (process.env.NODE_ENV !== "production") {
    // Use a global variable to store the client in development
    if (!global._mongoClientPromise) {
        client = new MongoClient(URI, options);
        global._mongoClientPromise = client.connect().catch(err => {
            console.error("MongoDB connection failed:", err);
            throw err; // Rethrow to propagate the error
        });
    }
    clientPromise = global._mongoClientPromise;
} else {
    // In production, always create a new client instance
    client = new MongoClient(URI, options);
    clientPromise = client.connect().catch(err => {
        console.error("MongoDB connection failed:", err);
        throw err; // Rethrow to propagate the error
    });
}

export default clientPromise;
