const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserSchema = new Schema({
  // User's Email
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  //User's UID
  uid: {
    type: String,
  },
  // User's files schema reference
  userFiles: [
    {
      type: Schema.Types.ObjectId,
      ref: "Document",
    },
  ],
  // Profile visibility
  public: {
    type: Boolean,
    default: false,
  },
  // Friends List
  contactList: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  // Date and time created
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
