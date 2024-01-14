import { db } from "../db.js";
import jwt from "jsonwebtoken";

const getPostsQuery = (req, res, next) => {
  const query = req.query.cat
    ? "SELECT * FROM posts WHERE cat=?"
    : "SELECT * FROM posts";
  db.query(query, [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err);
    req.posts = data;
    next();
  });
};

export const getPosts = [getPostsQuery, (req, res) => res.status(200).json(req.posts)];

const getPostQuery = (req, res, next) => {
  const query =
    "SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userImg, `cat`,`date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ?";
  db.query(query, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    req.post = data[0];
    next();
  });
};

export const getPost = [getPostQuery, (req, res) => res.status(200).json(req.post)];

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    req.userInfo = userInfo;
    next();
  });
};

const addPostQuery = (req, res) => {
  const query =
    "INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`,`uid`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.img,
    req.body.cat,
    req.body.date,
    req.userInfo.id,
  ];
  db.query(query, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Post has been created.");
  });
};

export const addPost = [verifyToken, addPostQuery];

const deletePostQuery = (req, res) => {
  const postId = req.params.id;
  const query = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";
  db.query(query, [postId, req.userInfo.id], (err, data) => {
    if (err) return res.status(403).json("You can delete only your post!");
    return res.json("Post has been deleted!");
  });
};

export const deletePost = [verifyToken, deletePostQuery];

const updatePostQuery = (req, res) => {
  const postId = req.params.id;
  const query =
    "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id` = ? AND `uid` = ?";
  const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];
  db.query(query, [...values, postId, req.userInfo.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Post has been updated.");
  });
};

export const updatePost = [verifyToken, updatePostQuery];
