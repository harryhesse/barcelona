import express from "express";
import { fixService } from "./fixService.js";

const router = express.Router();

router.get("/fetch", async (req, res) => {
  try {
    const saved = await fixService.fetchAndSaveFix();
    res.json({ success: true, data: saved });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const fixs = await fixService.getFix();

    if (!fixs.length) {
      return res.status(404).json({
        success: false,
        error: "No fixtures found",
      });
    }

    res.json({ success: true, data: fixs[fixs.length - 1] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
