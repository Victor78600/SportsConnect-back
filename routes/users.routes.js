const router = require("express").Router();
const User = require("./../models/User.model");
const fileUploader = require("../config/cloudinary.config");
const Activity = require("./../models/activity.model");
const Comment = require("./../models/comment.model");

// find all users.
router.get("/", async (req, res, next) => {
  try {
    const users = await User.find().select("username firstname lastname");
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// find one user.
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const oneUser = await User.findOne({ _id: id });
    res.json(oneUser);
  } catch (error) {
    next(error);
  }
});

// find one user with his username
router.get("/user/:username", async (req, res, next) => {
  const { username } = req.params;
  try {
    const oneUser = await User.findOne({ username: username });
    res.json(oneUser);
  } catch (error) {
    next(error);
  }
});

// Update one user with his picture
router.put("/", fileUploader.single("picture"), async (req, res, next) => {
  try {
    let picture;
    if (req.file) {
      picture = req.file.path;
    }
    // console.log(req.file);
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

//Delete a User with all his activities, comments, if he were participants or Followed by other user
router.delete("/", async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.userId);
    await Activity.updateMany({ $pull: { participants: req.userId } });
    await Comment.deleteMany({
      creator: req.userId,
    });
    await Activity.deleteMany({
      creator: req.userId,
    });
    await User.updateMany({ $pull: { follow: req.userId } });
    res.send("User deleted");
  } catch (error) {
    next(error);
  }
});

// Add an Id to the user follow array
router.put("/:id/follow", (req, res, next) => {
  User.findByIdAndUpdate(
    { _id: [req.userId] },
    { $push: { follow: req.params.id } },
    { new: true }
  )
    .then((updatedUser) => {
      console.log(updatedUser);
      res.json(updatedUser);
    })
    .catch((error) => {
      next(error);
    });
});

// Pull an Id to the user follow array
router.put("/:id/unfollow", (req, res, next) => {
  User.findByIdAndUpdate(
    { _id: [req.userId] },
    { $pull: { follow: req.params.id } },
    { new: true }
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
