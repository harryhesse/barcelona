import mongoose from "mongoose";

const fixtureSchema = new mongoose.Schema({}, { strict: false });
const Fixture = mongoose.model("Fixture", fixtureSchema);

export const fixturesRepository = {
  save: async (data) => {
    const doc = new Fixture(data);
    return doc.save();
  },
  getAll: async () => Fixture.find(),
  findBySeason: async (season) => Fixture.find({ "filters.season": season }),
};
