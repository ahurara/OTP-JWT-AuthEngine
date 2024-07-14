import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

async function connect() {
  const mongod = await MongoMemoryServer.create();

  //getting mongodb uri
  const getUri = mongod.getUri();
  const db = mongoose.connect(getUri);
  console.log("Database has been connected");

  return db;
}

export default connect;
