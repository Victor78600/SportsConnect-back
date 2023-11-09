const router = require("express").Router();
const Comment = require("./../models/comment.model");

router.put("/:id", (req, res, next) => {
  Comment.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedComment) => {
      res.json(updatedComment);
    })
    .catch((error) => {
      next(error);
    });
});

router.delete("/:id", (req, res, next) => {
  Comment.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).json();
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
