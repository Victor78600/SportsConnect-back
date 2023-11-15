const router = require("express").Router();
const User = require("./../models/User.model");
const fileUploader = require("../config/cloudinary.config");

// find all users.
router.get("/", async (req, res, next) => {
  try {
    const users = await User.find().select("username firstname lastname");
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

router.get("/user/:username", async (req, res, next) => {
  const { username } = req.params;
  try {
    const oneUser = await User.findOne({ username: username });
    res.json(oneUser);
  } catch (error) {
    next(error);
  }
});

// router.put("/", fileUploader.single("picture"),(req, res, next) => {
//   User.findByIdAndUpdate(req.userId, req.body, { new: true })
//     .then((updatedUser) => {
//       res.json(updatedUser);
//     })
//     .catch((error) => {
//       next(error);
//     });
// });

router.put("/", fileUploader.single("picture"), async (req, res, next) => {
  try {
    let picture;
    if (req.file) {
      picture = req.file.path;
    }
    console.log(req.file);
    const updateFields = { ...req.body };
    if (picture) {
      updateFields.picture = picture;
    }
    const UpdatedUser = await User.findByIdAndUpdate(req.userId, updateFields, {
      new: true,
    });
    res.status(200).json(UpdatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error while updating the profile" });
    next(error);
  }
});

router.delete("/", (req, res, next) => {
  User.findByIdAndDelete(req.userId)
    .then(() => {
      res.status(200).json();
    })
    .catch((error) => {
      next(error);
    });
});

router.put("/:id/follow", (req, res, next) => {
  User.findByIdAndUpdate(
    { _id: [req.userId] },
    { $push: { follow: req.params.id } }
  )
    .then((updatedUser) => {
      console.log(updatedUser);
      res.json(updatedUser);
    })
    .catch((error) => {
      next(error);
    });
});

router.put("/:id/unfollow", (req, res, next) => {
  User.findByIdAndUpdate(
    { _id: [req.userId] },
    { $pull: { follow: req.params.id } }
  )
    .then((updatedUser) => {
      console.log(updatedUser);
      res.json(updatedUser);
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
