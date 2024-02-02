import mongoose from "mongoose";

let isConnected = false;

type TypeConfig = {
  dbName: string;
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
};

const config: TypeConfig = {
  dbName: "crud-redux-apicall",
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export const DbConnection = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }
  const mongodbUri = process.env.MONGODB_URI;

  if (!mongodbUri) {
    console.error("MONGODB_URI is not defined in environment variables.");
    return;
  }

  try {
    await mongoose.connect(mongodbUri, config);

    isConnected = true;

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
