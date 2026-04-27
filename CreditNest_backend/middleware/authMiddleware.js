const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
 try{
const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ 
      message: "Unauthorized" 
    });
  }

  if (!authHeader){
    return res.status(401).json({
      message: "Access Denied. No Token provided"
    })
  }

const token = authHeader.startsWith("Bearer ")
  ? authHeader.split(" ")[1] 
  : authHeader;

const decoded = jwt.verify(token, process.env.JWT_SECRET);

req.user = { id: decoded.userId };

next();
 } catch (error) {
  console.error("Auth Middleware error:", err);
  return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;