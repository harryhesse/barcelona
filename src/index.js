import express from "express";
import { getStandings } from "./scraper.js";

const app = express();

// Health check
app.get("/healthz", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

// Standings endpoint
app.get("/standings", async (req, res) => {
  try {
    const standings = await getStandings();

    res.json({
      status: "updated",
      standings,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Start server locally
// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });

export default app;
