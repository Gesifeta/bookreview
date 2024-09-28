import { verifyToken } from '../auth/token.js';

export const auth = (req, res, next) => {

    if (req.session.authorization) {
        const token = req.session.authorization['authToken'];
        if (verifyToken(token)) {
            next();
        }
        else {
            res.status(403).json({ message: "Unauthorized" })
        }
    }
    else {
        res.status(403).json({ message: "You are not logged in." })
    }

}
