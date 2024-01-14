import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const checkUserExistence = (req, res, next) => {
  const query = "SELECT * FROM users WHERE email = ? OR username = ?";
  db.query(query, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");
    next();
  });
};

const createUser = (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  const query = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";
  const values = [req.body.username, req.body.email, hash];
  db.query(query, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("User has been created.");
  });
};

export const register = [checkUserExistence, createUser];

const checkUser = (req, res, next) => {
  const query = "SELECT * FROM users WHERE username = ?";
  db.query(query, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");
    req.user = data[0];
    next();
  });
};

const verifyPassword = (req, res, next) => {
  const isPasswordCorrect = bcrypt.compareSync(req.body.password, req.user.password);
  if (!isPasswordCorrect) return res.status(400).json("Wrong username or password!");
  next();
};

const generateToken = (req, res) => {
  const token = jwt.sign({ id: req.user.id }, "jwtkey");
  const { password, ...other } = req.user;
  res.cookie("access_token", token, { httpOnly: true }).status(200).json(other);
};

export const login = [checkUser, verifyPassword, generateToken];

export const logout = (req, res) => {
  res.clearCookie("access_token",{
    sameSite:"none",
    secure:true
  }).status(200).json("User has been logged out.")
};
