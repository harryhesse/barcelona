import mongoose from "mongoose";

const collectionName = "standings";

// blank schema, strict: false
const StandingsSchema = new mongoose.Schema(
  {},
  { strict: false, timestamps: true },
);
const Standings =
  mongoose.models.Standings ||
  mongoose.model("Standings", StandingsSchema, collectionName);

export const standingsRepository = {
  save: async (data) => {
    // use upsert by season + league to avoid duplicates
    return Standings.findOneAndUpdate(
      { season: data.season, league: data.league },
      data,
      { upsert: true, returnDocument: "after" },
    );
  },
  getAll: () => Standings.find(),
};
