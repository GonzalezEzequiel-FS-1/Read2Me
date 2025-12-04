const mongoose = require("mongoose");
const { Schema } = mongoose;

const FriendRequestSchema = new Schema({
  // From user
  fromUID: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  // To User
  toUID: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  // Request Status pending accepted or declined
  status: {
    type: String,
    enum: ["pending", "accepted", "declined"],
    default: "pending",
  },
  // When was it created
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Compound unique index to prevent duplicate requests
FriendRequestSchema.index({ fromUID: 1, toUID: 1 }, { unique: true });

const FriendRequest = mongoose.model("FriendRequest", FriendRequestSchema);

module.exports = FriendRequest;
