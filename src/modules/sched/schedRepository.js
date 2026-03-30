import mongoose from "mongoose";

const schedSchema = new mongoose.Schema({}, { strict: false });
const Sched = mongoose.model("Sched", schedSchema);

export const schedRepository = {
  save: async (data) => {
    // Use the date as the unique key to upsert
    return Sched.findOneAndUpdate(
      { date: data.date }, // filter: match by date
      data, // update with new data
      { upsert: true, new: true, setDefaultsOnInsert: true }, // options
    );
  },

  getAll: async () => Sched.find(),
};
