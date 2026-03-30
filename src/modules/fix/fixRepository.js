import mongoose from "mongoose";

const fixSchema = new mongoose.Schema({}, { strict: false });
const Fix = mongoose.model("Fix", fixSchema);

export const fixRepository = {
  save: async (data) => {
    // Use date as unique key to upsert
    return Fix.findOneAndUpdate(
      { date: data.date }, // match by date
      data, // new data
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
  },

  getAll: async () => Fix.find(),
};
