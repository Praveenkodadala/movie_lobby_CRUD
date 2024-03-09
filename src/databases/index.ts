import config from "config";
import mongoose from "mongoose";

interface DbConfig {
  host: string;
  port: number;
  name: string;
  username?: string;
  password?: string;
}
const dbConfig: DbConfig = config.get<DbConfig>("db");
// console.log("dbConfig", dbConfig);
let dbConnectionUrl: string;

if (dbConfig.username && dbConfig.password) {
  dbConnectionUrl = `mongodb+srv://${dbConfig.username}:${dbConfig.password}@${dbConfig.host}/${dbConfig.name}`;
} else {
  dbConnectionUrl = `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.name}`;
}

export const connectToDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(dbConnectionUrl);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};
