import mongoose from "mongoose";

const compSchema = new mongoose.Schema({}, { strict: false });
const Comp = mongoose.model("Comp", compSchema);

export const compRepository = {
  save: async (data) => {
    return Comp.findOneAndUpdate(
      { id: data.id }, // 👈 use API id as unique key
      { $set: data }, // 👈 overwrite fields
      { upsert: true, new: true },
    );
  },

  getAll: async () => Comp.find(),

  getById: async (id) => Comp.findOne({ id }),
};
