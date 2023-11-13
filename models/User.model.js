const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      default:
        "https://res.cloudinary.com/dvubyaiw2/image/upload/v1699786794/SportsConnect-gallery/ddjfjhlg1a7xrb8w3vrk",
    },
    username: {
      type: String,
      required: [true, "Username is required."],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    age: Number,
    city: String,
    follow: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
