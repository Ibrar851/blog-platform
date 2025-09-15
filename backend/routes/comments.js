import express from "express";
import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Add comment to a post
router.post("/:postId", auth, async (req, res) => {
  try {
    console.log("Decoded user from JWT:", req.user);

    const { postId } = req.params;
    const { text } = req.body;

    // check post exists
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    // ✅ field name match with schema: postId
    const newComment = new Comment({
      postId: postId,
      text,
      author: req.user.username || req.user.id,
    });

    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    console.error("❌ Add comment error:", err);
    res.status(500).json({ error: "Failed to post comment" });
  }
});

// Get all comments for a post
router.get("/:postId", async (req, res) => {
  try {
    const { postId } = req.params;

    // ✅ filter by postId (not post)
    const comments = await Comment.find({ postId }).sort({ createdAt: -1 });

    res.json(comments);
  } catch (err) {
    console.error("❌ Fetch comments error:", err);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

export default router;
