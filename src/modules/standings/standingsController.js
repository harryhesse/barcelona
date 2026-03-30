import express from "express";
import { standingsService } from "./standingsService.js";

const router = express.Router();

// Fetch latest standings from API and save
router.get("/fetch", async (req, res) => {
  try {
    const saved = await standingsService.fetchAndSave();
    res.json({ success: true, data: saved });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get standings from DB
router.get("/", async (req, res) => {
  try {
    const standings = await standingsService.getAll();
    res.json({ success: true, data: standings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
