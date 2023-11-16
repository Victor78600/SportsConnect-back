const router = require("express").Router();
const { isAuthenticated } = require("./../middlewares/authMiddlewares");
// const User = require("./../models/User.model");

/**
 * ! All routes are prefixed by /api
 */

// router.get("/", (req, res) => {
//   res.json("Hello World!");
//   console.log(1);
// });

router.use("/auth", require("./auth.routes"));

router.use(isAuthenticated);
router.use("/users", require("./users.routes"));
router.use("/activities", require("./activities.routes"));
router.use("/comments", require("./comments.routes"));

module.exports = router;
