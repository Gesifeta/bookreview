import express from "express"
import { public_users } from "./routes/general.js"
import session from "express-session"
import { protected_users } from "./routes/protected.js"
import { auth } from "./middleware/authMiddleware.js"

export const app = express();
app.use(express.json());
app.use(session({
    secret: "fingerprint_customer",
    resave: true,
    saveUninitialized: true
}));
app.use("/", public_users);
app.use("/", protected_users);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})