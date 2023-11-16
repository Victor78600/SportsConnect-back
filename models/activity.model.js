const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activitySchema = new Schema(
  {
    sports: {
      type: String,
      enum: [
        "Football",
        "Basketball",
        "Tennis",
        "Golf",
        "Cricket",
        "Badminton",
        "Athletics",
        "Swimming",
        "Volleyball",
        "Rugby",
        "Table Tennis",
        "Baseball",
        "Boxing",
        "Cycling",
        "Mixed Martial Arts",
        "Climbing",
        "Gymnastics",
        "Ice Hockey",
        "Skiing",
        "Snowboarding",
        "American Football",
        "Running",
        "Sailing",
        "Equestrian Sports",
        "Water Sports",
        "Karate",
        "Taekwondo",
      ],
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
    creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;
