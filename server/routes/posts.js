import express from "express";
import { getFeedPosts, getUserPosts, likePost, deletePost, commentPost, deleteComment } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);
router.patch("/:id/comment", verifyToken, commentPost);

/* DELETE */
router.patch("/:id/delete-post", verifyToken, deletePost)
router.patch("/:id/delete-comment", verifyToken, deleteComment)

export default router;
