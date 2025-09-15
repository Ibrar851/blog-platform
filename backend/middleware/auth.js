import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Invalid token" });

  try {
    const decoded = jwt.verify(token, "secretKey");
    req.user = decoded; // { id, username }
    next();
  } catch (err) {
    console.error("JWT verify error:", err);
    res.status(401).json({ error: "Unauthorized" });
  }
};

export default auth;
