import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    fromUid: {
      type: String,
      required: true,
    },
    toUid: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      require: false,
    },
  },
  { versionKey: false }
);
export const message = mongoose.model("message", messageSchema);
