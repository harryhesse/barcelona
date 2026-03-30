import mongoose from "mongoose";

const collectionName = "players";

// blank schema
const PlayerSchema = new mongoose.Schema(
  {},
  { strict: false, timestamps: true },
);
const Player =
  mongoose.models.Player ||
  mongoose.model("Player", PlayerSchema, collectionName);

export const playersRepository = {
  saveMany: async (players) => {
    return Promise.all(
      players.map((p) =>
        Player.findOneAndUpdate({ id: p.id }, p, { upsert: true, new: true }),
      ),
    );
  },
  getAll: () => Player.find(),
};
