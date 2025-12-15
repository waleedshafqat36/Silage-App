// lib/mongodbClient.ts
import { MongoClient } from "mongodb";

if (!process.env.MONGO_URI) throw new Error("MONGO_URI is not defined");

const uri = process.env.MONGO_URI;

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    // Attach a catch so a failed connection doesn't cause an unhandledRejection
    global._mongoClientPromise = client.connect().catch((err) => {
      console.error("MongoClient connection failed:", err);
      throw err;
    });
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect().catch((err) => {
    console.error("MongoClient connection failed:", err);
    throw err;
  });
}

export default clientPromise;
