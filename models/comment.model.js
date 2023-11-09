const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const commentSchema = new Schema(
  {
    activity: { type: Schema.Types.ObjectId, ref: "Activity", required: true },
    creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
