import express from "express"

import { books } from "../data/booksdb.js";
import { users } from "../data/usersdb.js";
import { userExists,authenticateUser } from "../auth/auth.js";
import { generateToken, verifyToken } from "../auth/token.js";

export const public_users = express.Router();


public_users.post("/customer/register", (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: "Request body is missing" });
  }
  if (!req.body.username || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: "Request body is missing required fields" });
  }
  try {
    const { username, email, password } = req.body;
    if (userExists(email)) {
      return res.status(400).json({ message: "User already exists" });
    }
    users.push({ username, email, password });
    return res.status(201).json({ message: "User created successfully" });

  } catch (error) {
    return error;

  }
})

public_users.post("/customer/login", (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: "Request body is missing" });
  }
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: "Request body is missing required fields" });
  }
  const { email, password } = req.body;
  if (userExists(email)) {
    if (authenticateUser(email, password)) {
      const authToken = generateToken(password);
      req.session.authorization = { authToken, email };
      return res.status(200).json({ authToken, message: "Login successful" });
    }
    else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  }
  return res.status(404).json({ message: "User not found" });
})
// Get the book list available in the shop
public_users.get('/', function (req, res) {
  let data = Object.keys(books).map(key => {
    return books[key]
  })

  return res.status(300).json({ data });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {

  let isbn = req.params.isbn;
  const data = Object.values(books).filter(book => book.ISBN === isbn)
  return res.status(200).json(data);
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  let author = req.params.author;
  const data = Object.values(books).filter(book => book.author === author)
  return res.status(200).json(data);
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  let title = req.params.title;
  const data = Object.values(books).filter(book => book.title === title)
  return res.status(200).json(data);
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const data = Object.values(books).filter(book => book.ISBN === isbn).map(book => book.reviews)
  return res.status(300).json(...data);
});
