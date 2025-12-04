const FriendRequest = require("../db/models/Request");
const User = require("../db/models/User");

const createUser = async (req, res) => {
  const { email, uid } = req.body;

  try {
    const newUser = await User.create({
      email,
      uid,
    });

    return res.status(200).json({
      success: true,
      user: {
        email: newUser.email,
        uid: newUser.uid,
      },
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

const getUser = async (req, res) => {
  const { uid } = req.body;

  try {
    const fetchedUser = await User.findOne({ uid: uid });

    return res.status(200).json({
      success: true,
      fetchedUser,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

const editUser = async (req, res) => {
  const { uid } = req.query;
  const updates = req.body;

  try {
    const editedUser = await User.findOneAndUpdate(
      { uid: uid },
      { $set: updates },
      { new: true }
    );

    if (!editedUser) {
      return res.status(404).json({
        success: false,
        error: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      editedUser,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

const deleteUser = async (req, res) => {
  const { uid } = req.query;
  if (!uid) {
    return res.status(404).json({
      success: false,
      error: "No UID provided",
    });
  }
  try {
    const userTodelete = await User.findOneAndDelete({ uid: uid });
    if (!userTodelete) {
      return res.status(404).json({
        success: false,
        error: "User not found.",
      });
    }
    const deletedCount = userTodelete.deletedCount;
    const deletedUserUID = userTodelete.uid;
    return res.status(200).json({
      success: true,
      deletedUserUID,
      deletedCount,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
const deleteAllUsers = async (req, res) => {
  try {
    const deletedUsers = await User.deleteMany();
    const deletedCount = deletedUsers.deletedCount;
    return res.status(200).json({
      success: true,
      deletedCount,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
// const addContact = async (req, res) => {
//   const userUID = req.body.userUID; // make sure this matches what you send from frontend
//   const contactUID = req.body.contactUID;

//   if (!userUID || !contactUID) {
//     return res.status(400).json({
//       success: false,
//       error: "Incomplete data sent",
//       userUID,
//       contactUID,
//     });
//   }

//   try {
//     // Find the contact user first to get their _id
//     const contactUser = await User.findOne({ uid: contactUID });
//     if (!contactUser) {
//       return res.status(404).json({
//         success: false,
//         error: "Contact user not found",
//       });
//     }

//     // Add contact's _id to user's contactList (avoiding duplicates)
//     const updatedUser = await User.findOneAndUpdate(
//       { uid: userUID },
//       { $addToSet: { contactList: contactUser._id } }, // $addToSet prevents duplicates
//       { new: true } // return the updated document
//     ).populate("contactList", "uid email"); // optional: populate for frontend

//     if (!updatedUser) {
//       return res.status(404).json({
//         success: false,
//         error: "User not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Contact added successfully",
//       contactList: updatedUser.contactList,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       error: err.message,
//     });
//   }
// };

const sendFriendRequest = async (req, res) => {
  const { fromUID, toUID } = req.body;

  if (!fromUID || !toUID) {
    return res.status(400).json({
      success: false,
      message: "Incomplete data sent",
    });
  }

  try {
    const fromUser = await User.findOne({ uid: fromUID });
    const toUser = await User.findOne({ uid: toUID });

    if (!fromUser || !toUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check for existing request (unique index will also enforce this)
    const existingRequest = await FriendRequest.findOne({
      fromUID: fromUser._id,
      toUID: toUser._id,
    });
    if (existingRequest) {
      return res.status(400).json({
        success: false,
        message: "Friend request already sent",
      });
    }

    const friendRequest = new FriendRequest({
      fromUID: fromUser._id,
      toUID: toUser._id,
    });

    await friendRequest.save();

    return res.status(200).json({
      success: true,
      message: "Friend request sent",
      request: friendRequest,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const respondFriendRequest = async (req, res) => {
  const { requestID, action } = req.body; // action = 'accepted' | 'declined'

  if (!requestID || !["accepted", "declined"].includes(action)) {
    return res.status(400).json({
      success: false,
      message: "Invalid request data",
    });
  }

  try {
    const request = await FriendRequest.findById(requestID).populate(
      "fromUID toUID"
    );
    if (!request) {
      return res
        .status(404)
        .json({ success: false, message: "Friend request not found" });
    }

    request.status = action;
    await request.save();

    // If accepted, add each other to contactList
    if (action === "accepted") {
      const fromUser = await User.findById(request.fromUID._id);
      const toUser = await User.findById(request.toUID._id);

      if (!fromUser.contactList.includes(toUser._id)) {
        fromUser.contactList.push(toUser._id);
        await fromUser.save();
      }

      if (!toUser.contactList.includes(fromUser._id)) {
        toUser.contactList.push(fromUser._id);
        await toUser.save();
      }
    }

    return res.status(200).json({
      success: true,
      message: `Friend request ${action}`,
      request,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const toggleProfileVisibility = async (req, res) => {
  const userUID = req.body.userUID; // UID of the user to update
  const makePublic = req.body.public; // true or false

  if (!userUID || typeof makePublic !== "boolean") {
    return res.status(400).json({
      success: false,
      error: "Incomplete or invalid data sent",
    });
  }

  try {
    const updatedUser = await User.findOneAndUpdate(
      { uid: userUID },
      { public: makePublic },
      { new: true } // return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: `Profile is now ${makePublic ? "public" : "private"}`,
      public: updatedUser.public,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

module.exports = {
  createUser,
  getUser,
  editUser,
  deleteUser,
  deleteAllUsers,
  sendFriendRequest,
  respondFriendRequest,
  toggleProfileVisibility,
};
