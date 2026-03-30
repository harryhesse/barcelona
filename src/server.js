import dotenv from "dotenv";
dotenv.config();

import express from "express";

import { connectDB } from "./config/mongoose.js";

import compsRouter from "./modules/comps/compsController.js";
import schedRouter from "./modules/sched/schedController.js";
import fixRouter from "./modules/fix/fixController.js";

const app = express();
app.use(express.json());

// Health check
app.get("/healthz", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

// Mount module
app.use("/api/comps", compsRouter);
app.use("/api/sched", schedRouter);
app.use("/api/fix", fixRouter);

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

export default app;
