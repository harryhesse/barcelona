import express from "express";
import { schedService } from "./schedService.js";

const router = express.Router();

// Fetch today's fixtures from API and save/overwrite schedule
router.get("/fetch", async (req, res) => {
  try {
    const saved = await schedService.fetchAndSaveSched();
    res.json({ success: true, data: saved });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get today's schedule (or the latest schedule)
router.get("/", async (req, res) => {
  try {
    const scheds = await schedService.getSched();

    if (!scheds || scheds.length === 0) {
      return res.status(404).json({
        success: false,
        error: "No schedule found",
      });
    }

    // Return the latest schedule (assuming one per day)
    const latestSched = scheds[scheds.length - 1];

    res.json({ success: true, data: latestSched });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
