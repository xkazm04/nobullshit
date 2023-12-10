import mongoose, { Schema } from "mongoose";

let isConnected = false;

const connectToDb = async () => {
  if (isConnected) {
    console.log('Using existing database connection');
    return;
  }

  const dbUri = process.env.MONGODB_URI || "mongodb://localhost:27017/nobullshit";

  try {
    const db = await mongoose.connect(dbUri);
    isConnected = db.connections[0].readyState;
    console.log('Database connected');
  } catch (error) {
    console.error('Database connection error:', error);
    isConnected = false;
  }
};

mongoose.Promise = global.Promise;

const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export { User, connectToDb };