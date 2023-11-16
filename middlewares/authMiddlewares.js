const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  try {
    // console.log(req.headers)
    let token = req.headers.authorization;
    console.log(req.headers);
    if (!token) {
      return res.status(401).json({ message: "No token found in the headers" });
    }
    token = token.replace("Bearer ", "");

    // console.log(token)

    const payload = jwt.verify(token, process.env.TOKEN_SECRET, {
      algorithms: ["HS256"],
    });

    //! This line make everything works!
    req.userId = payload._id;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { isAuthenticated }; //isAdmin
