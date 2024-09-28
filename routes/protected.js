import express from "express";
import { books } from "../data/booksdb.js";
import { users } from "../data/usersdb.js";
import { authenticateUser, userExists, bookExists } from "../auth/auth.js";
import { generateToken } from "../auth/token.js";

export const protected_users = express.Router();

//add book review
protected_users.post("/customer/review/:isbn", (req, res) => {
    const { isbn } = req.params;
    if (!req.body) {
        return res.status(400).json({ message: "Request body is missing" });
    }
    if (!req.body.id || !req.body.name || !req.body.review || !
        req.body.rating) {
        return res.status(400).json({ message: "Request body is missing required fields" });
    }
    const { id, name, review, rating } = req.body;

    if (bookExists(isbn)) {
        Object.values(books).map((book) => {
            if (book.ISBN=== isbn) {
                if (book.reviews.some((review) => review.name === name)){
                     return res.status(400).json({ message: "Review already exists" });
                }
                book.reviews.push({ id, name, review, rating });
                return res.status(200).json({ message: "Review added successfully", book: book });
            }
        }
        )
    }else    return res.status(404).json({ message: "Book not found" });
})
//delete review from book

protected_users.delete("/customer/review/isbn/:isbn", (req, res) => {
    const { isbn } = req.params;
    const {name}=req.body
    const user  = req.user;
    console.log(user)
    if (bookExists(isbn)) {
        Object.values(books).map((book) => {
            if (book.ISBN === isbn) {
                if (book.reviews.some((review) => review.name === "gemechu")) {
                    book.reviews = book.reviews.filter((review) => review.name !== name);
                    return res.status(200).json({ message: "Review deleted successfully", book: book });
                } else {
                    return res.status(403).json({ message: "You have not reviewed any book yet" });
                }
            }
        }
        )
    } else return res.status(404).json({ message: "Book not found" });
})