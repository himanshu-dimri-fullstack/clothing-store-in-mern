import jwt from "jsonwebtoken"

export const auth = (req, res, next) => {
    // let token = req.header("Authorisation");

    let token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "No token, Access denied" })
    }
    // token = token.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Token is not valid" });
    }
}
