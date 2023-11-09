const router = require("express").Router();
const User = require("./../models/User.model");

// find all users.
router.get("/", async (req, res, next) => {
  try {
    const users = await User.find().select("username");
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const oneUser = await User.findOne({ _id: id });
    res.json(oneUser);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((error) => {
      next(error);
    });
});

router.delete("/:id", (req, res, next) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).json();
    })
    .catch((error) => {
      next(error);
    });
});

// router.post("/", (req, res, next) => {
//   const oneUser = { ...req.body };
//   User.create(oneUser)
//     .then((createdUser) => {
//       res.json(createdUser);
//     })
//     .catch((error) => {
//       next(error);
//     });
// });

module.exports = router;
