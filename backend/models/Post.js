import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String }, // 👈 uploaded image ka filename save hoga
    author: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
