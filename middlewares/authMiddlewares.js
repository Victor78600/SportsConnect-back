const jwt = require("jsonwebtoken");
// const User = require("./../models/User.model");

const isAuthenticated = async (req, res, next) => {
  try {
    // console.log(req.headers)
    let token = req.headers.authorization;
    console.log(req.headers.authorization);
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
// async function isAdmin(req, res, next) {
//   try {
//     const currentUser = await User.findById(req.userId);
//     if (currentUser.role === "admin") {
//       return next();
//     } else {
//       return res.status(401).json({ message: "Denied." });
//     }
//   } catch (error) {
//     next(error);
//   }
// }

module.exports = { isAuthenticated }; //isAdmin
