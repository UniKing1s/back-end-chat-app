import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    displayName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    photoURL: {
      type: String,
      required: false,
    },
    uid: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { versionKey: false }
);
export const user = mongoose.model("user", userSchema);
