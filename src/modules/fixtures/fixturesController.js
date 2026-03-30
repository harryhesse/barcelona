import express from "express";
import { fixturesService } from "./fixturesService.js";

const router = express.Router();

// Fetch & save Barcelona season fixtures (season is hardcoded)
router.get("/fetch", async (req, res) => {
  try {
    const saved = await fixturesService.fetchAndSaveSeason();
    res.json({ success: true, data: saved });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get all saved fixtures from DB
router.get("/", async (req, res) => {
  try {
    const fixtures = await fixturesService.getAllFixtures();
    res.json({ success: true, data: fixtures });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
