import express from "express";
import {
  addPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/post.js";

const router = express.Router();

// Routes for getting posts
router.get("/", getPosts);
router.get("/:id", getPost);

// Route for adding a post
router.post("/", addPost);

// Route for deleting a post
router.delete("/:id", deletePost);

// Route for updating a post
router.put("/:id", updatePost);

export default router;
