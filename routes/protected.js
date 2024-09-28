import express from "express";
import { books } from "../data/booksdb.js";
import { users } from "../data/usersdb.js";
import { authenticateUser, userExists } from "../auth/auth.js";
import { generateToken } from "../auth/token.js";

export const protected_users = express.Router();

protected_users.post("/customer/login", (req, res) => {
    console.log(req.body);
    if (!req.body) {
        return res.status(400).json({ message: "Request body is missing" });
    }
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ message: "Request body is missing required fields" });
    }
    const { email, password } = req.body;
    if (userExists(email)) {
        if (authenticateUser(email, password)) {
            console.log(generateToken(email))
            const authToken = generateToken(email);
            req.session.authorization = { authToken, email };

            return res.status(200).json({authToken, message: "Login successful" });
        }
        else {
            return res.status(401).json({ message: "Invalid credentials" });
        }
    }
    return res.status(404).json({ message: "User not found" });
})