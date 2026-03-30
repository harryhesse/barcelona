import express from "express";
import { compsService } from "./compsService.js";

const router = express.Router();

// Fetch from API and save
router.get("/fetch", async (req, res) => {
  try {
    const saved = await compsService.fetchAndSaveComps();
    res.json({ success: true, data: saved });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get all comps
router.get("/", async (req, res) => {
  try {
    const comps = await compsService.getAllComps();
    res.json({ success: true, data: comps });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get one comp by internal Mongo _id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const comp = await compsService.getCompById(id); // expects Mongo _id

    if (!comp) {
      return res.status(404).json({
        success: false,
        error: "Competition not found",
      });
    }

    res.json({ success: true, data: comp });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
