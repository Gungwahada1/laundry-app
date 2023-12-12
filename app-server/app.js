import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Import Route
import routes from "./routes/index.js";
// Import Database Connection
import db from "./config/Database.js";

dotenv.config();

const app = express();
const PORT = process.env.APP_PORT || 8080;

app.use(cors());
app.use(express.json());

app.use(routes);

app.listen(PORT, () => {
  console.log("Laundry App Up and Running!");
});

try {
  await db.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
