const router = require("express").Router();
const Activity = require("./../models/activity.model");
const Comment = require("./../models/comment.model");
const User = require("./../models/User.model");
// find all activities.
// router.get("/", async (req, res, next) => {
//   try {
//     console.log(1);
//     const activities = await Activity.find();
//     res.json(activities);
//   } catch (error) {
//     next(error);
//   }
// });

router.get("/friends", async (req, res, next) => {
  const id = req.userId;
  try {
    const myUser = await User.findOne({ _id: id });
    const activitiesOfFriends = await Activity.find({
      $or: [
        { participants: { $in: myUser.follow } },
        { creator: { $in: myUser.follow } },
      ],
    }).populate("creator participants");
    res.json(activitiesOfFriends);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const oneActivity = await Activity.findOne({ _id: id }).populate(
      "participants creator"
    );
    res.json(oneActivity);
  } catch (error) {
    next(error);
  }
});

// router.get("/:id", async (req, res, next) => {
//   const id = req.params.id;
//   try {
//     const oneActivity = await Comment.find({ activity: id }).populate(
//       "activity"
//     );
//     res.json(oneActivity);
//     console.log(oneActivity);
//   } catch (error) {
//     next(error);
//   }
// });

router.put("/:id", async (req, res, next) => {
  Activity.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedActivity) => {
      res.json(updatedActivity);
    })
    .catch((error) => {
      next(error);
    });
});

router.delete("/:id", async (req, res, next) => {
  Activity.findByIdAndDelete(req.params.id, { new: true })
    .then(() => {
      res.status(200).json();
    })
    .catch((error) => {
      next(error);
    });
});

router.post("/", (req, res, next) => {
  const oneActivity = { ...req.body };
  Activity.create(oneActivity)
    .then((createdActivity) => {
      res.json(createdActivity);
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/:id/comments", async (req, res, next) => {
  try {
    const comments = await Comment.find({
      activity: { $in: [req.params.id] },
    }).populate("creator");
    console.log(comments);
    res.json(comments);
  } catch (error) {
    next(error);
  }
});

router.get("/:id/user", async (req, res, next) => {
  try {
    const activities = await Activity.find({
      $or: [
        { participants: { $in: [req.params.id] } },
        { creator: req.params.id },
      ],
    }).populate("participants creator");
    console.log(activities);
    res.json(activities);
  } catch (error) {
    next(error);
  }
});

// delete all activities of one user
router.delete("/:id/all", (req, res, next) => {
  Activity.deleteMany({
    creator: { $in: [req.params.id] },
  })
    .then((deletedActivities) => {
      res.json(deletedActivities);
    })
    .catch((error) => {
      next(error);
    });
});

//Pull from all array of participants
router.put("/:id/participants", (req, res, next) => {
  Activity.updateMany({ $pull: { participants: req.params.id } })
    .then((updatedUser) => {
      console.log(updatedUser);
      res.json(updatedUser);
    })
    .catch((error) => {
      next(error);
    });
});

// router.get("/:id/followed-user", async (req, res, next) => {
//   try {
//     console.log(req);
//     const activities = await Activity.find({
//       $or: [
//         { participants: { $in: [req.user.follow] } },
//         { creator: req.params.id },
//       ],
//     });
//     console.log(activities);
//     res.json(activities);
//   } catch (error) {
//     next(error);
//   }
// });

router.post("/:id/comments", async (req, res, next) => {
  try {
    const creatorId = req.body.creator;
    const { id } = req.params;
    const content = req.body.content;
    console.log(req.body);
    const newContent = await Comment.create({
      activity: id,
      creator: creatorId,
      content: content,
    });
    res.status(201).json(newContent);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
