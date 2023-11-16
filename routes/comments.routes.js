const router = require("express").Router();
const Comment = require("./../models/comment.model");

// Update a comment
// router.put("/:id", (req, res, next) => {
//   Comment.findByIdAndUpdate(req.params.id, req.body, { new: true })
//     .then((updatedComment) => {
//       res.json(updatedComment);
//     })
//     .catch((error) => {
//       next(error);
//     });
// });

//Delete a comment
router.delete("/:id", (req, res, next) => {
  Comment.findByIdAndDelete(req.params.id, { new: true })
    .then(() => {
      res.status(200).json();
    })
    .catch((error) => {
      next(error);
    });
});

//delete all comments of on User
// router.delete("/:id/all", (req, res, next) => {
//   Comment.deleteMany({
//     creator: { $in: [req.params.id] },
//   })
//     .then((deletedComments) => {
//       res.json(deletedComments);
//     })
//     .catch((error) => {
//       next(error);
//     });
// });

module.exports = router;
