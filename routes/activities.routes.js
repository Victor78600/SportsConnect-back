const router = require("express").Router();
const Activity = require("./../models/activity.model");
const Comment = require("./../models/comment.model");

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

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const oneActivity = await Activity.findOne({ _id: id });
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

router.delete("/:id", (req, res, next) => {
  Activity.findByIdAndDelete(req.params.id)
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
      activity: req.params.id,
    }).populate("activity");
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
    });
    console.log(activities);
    res.json(activities);
  } catch (error) {
    next(error);
  }
});

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
