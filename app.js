// Imports
import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";

import connection from "./data/connection.js";
import itemRoutes from "./routes/item.js";
import costumeRoutes from "./routes/costume.js";
import locationRoutes from "./routes/location.js";
import serverRoutes from "./routes/server.js";

// Config
dotenv.config({ path: "process.env" });

const urlencodedConfig = {
  extended: true,
  inflate: true,
  limit: "1MB",
  parameterLimit: 5000,
  type: "application/x-www-form-urlencoded",
};

const corsConfig = {
  origin: process.env.CLIENT_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

const limiter = {
  windowMs: 15 * 60 * 1000,
  limit: 10000,
  message: "Çok fazla istek gönderildi, lütfen daha sonra tekrar deneyin!",
};

// App
const app = express();
app.disable("x-powered-by");

// Database Connection
connection();

// Middlewares
app.use(express.urlencoded(urlencodedConfig));
app.use(express.json({ limit: "1MB" }));
app.use(helmet());
app.use(cors(corsConfig));
app.use(rateLimit(limiter));

// Routes
app.use("/api", itemRoutes);
app.use("/api", costumeRoutes);
app.use("/api", locationRoutes);
app.use("/api", serverRoutes);

// Error Management
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Sunucu hatası meydana geldi!" });
});

// Start Server
app.listen(process.env.PORT, () => {
  console.log(`Sunucu ${process.env.PORT} portunda başlatıldı.`);
});
