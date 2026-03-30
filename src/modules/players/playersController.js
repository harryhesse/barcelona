import express from "express";
import { playersService } from "./playersService.js";

const router = express.Router();

// Fetch all players from API and save to MongoDB
router.get("/fetch", async (req, res) => {
  try {
    const saved = await playersService.fetchAndSaveAll();
    res.json({ success: true, count: saved.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get all players already saved in MongoDB
router.get("/", async (req, res) => {
  try {
    const players = await playersService.getAll();
    res.json({ success: true, data: players });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
