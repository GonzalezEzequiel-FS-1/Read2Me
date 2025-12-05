const FriendRequest = require("../db/models/Request");
const User = require("../db/models/User");

// Function to create a user
const createUser = async (req, res) => {
  // Take the email and UID from the body of the request
  const { email, uid } = req.body;

  // If the data is not complete return a 400 error and show the received data
  if (!email || !uid) {
    return res.status(400).json({
      success: false,
      message: "Incomplete data received",
      email,
      uid,
    });
  }
  // If the uid and email are found, continue with the function
  try {
    // Create a new user with the uid and email
    const newUser = await User.create({
      email,
      uid,
    });

    // Once the user is creaed respoond with a 200 ok status
    return res.status(200).json({
      success: true,
      user: {
        email: newUser.email,
        uid: newUser.uid,
      },
    });

    // Catch any errors
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// Function to return a specific user's profile
const getUser = async (req, res) => {
  // Take the uid from the body of the request
  const { uid } = req.body;

  // If the data is not complete return a 400 error and show the received data
  if (!uid) {
    return res.status(400).json({
      success: false,
      message: "No uid received",
      uid,
    });
  }
  try {
    // Once the data is received find the user utilizing the uid
    const fetchedUser = await User.findOne({ uid: uid });

    // Once the user is created return a 200 ok message
    return res.status(200).json({
      success: true,
      fetchedUser,
    });
    // Catch any errors
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// Function to edit a user
const editUser = async (req, res) => {
  // Get the uid from the query
  const { uid } = req.query;

  // Get the data to update from the body
  const updates = req.body;

  // If the data is not complete return a 400 error and show the received data
  if (!uid || !updates) {
    return res.status(400).json({
      success: false,
      message: "Incomplete data received",
      uid,
      updates,
    });
  }

  try {
    // Use the UID to update the user's profile
    const editedUser = await User.findOneAndUpdate(
      { uid: uid },
      { $set: updates },
      { new: true }
    );

    // Return a 400 error if the user is not found
    if (!editedUser) {
      return res.status(404).json({
        success: false,
        error: "User not found.",
      });
    }

    // Once the user's profile is updated return a 200 ok response
    return res.status(200).json({
      success: true,
      editedUser,
    });

    // Catch any thrown errors
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// Function to delete a user
const deleteUser = async (req, res) => {
  // Get uid from the query parameters
  const { uid } = req.query;

  // If uid is not found return an 400 error
  if (!uid) {
    return res.status(404).json({
      success: false,
      error: "No UID provided",
    });
  }
  try {
    // Once we confirm that the uid exist query the DB to delete the user with the matching uid
    const userTodelete = await User.findOneAndDelete({ uid: uid });

    // If the user is not found return a 404 not found error
    if (!userTodelete) {
      return res.status(404).json({
        success: false,
        error: "User not found.",
      });
    }

    // Assign a variable to keep track of the deleted count
    const deletedCount = userTodelete.deletedCount;

    // Assign a variable to the uid of the deleted user
    const deletedUserUID = userTodelete.uid;

    // Return a 200 ok response once complete and return the deleted count and its uid
    return res.status(200).json({
      success: true,
      deletedUserUID,
      deletedCount,
    });

    // Return any errors
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// Delete all users from Database
const deleteAllUsers = async (req, res) => {
  try {
    // Utilize deleteMany with no parameters to delete all users
    const deletedUsers = await User.deleteMany();

    // Assign a variable to the deleted count
    const deletedCount = deletedUsers.deletedCount;

    // Return a 200 ok error when complete
    return res.status(200).json({
      success: true,
      deletedCount,
    });
    // Catch any errors
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

/*
const addContact = async (req, res) => {
  const userUID = req.body.userUID; // make sure this matches what you send from frontend
  const contactUID = req.body.contactUID;

  if (!userUID || !contactUID) {
    return res.status(400).json({
      success: false,
      error: "Incomplete data sent",
      userUID,
      contactUID,
    });
  }

  try {
    // Find the contact user first to get their _id
    const contactUser = await User.findOne({ uid: contactUID });
    if (!contactUser) {
      return res.status(404).json({
        success: false,
        error: "Contact user not found",
      });
    }

    // Add contact's _id to user's contactList (avoiding duplicates)
    const updatedUser = await User.findOneAndUpdate(
      { uid: userUID },
      { $addToSet: { contactList: contactUser._id } }, // $addToSet prevents duplicates
      { new: true } // return the updated document
    ).populate("contactList", "uid email"); // optional: populate for frontend

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Contact added successfully",
      contactList: updatedUser.contactList,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
*/

//  Function to send a friend request
const sendFriendRequest = async (req, res) => {
  // Get the user's uid and the requested profile's uid from the body
  const { fromUID, toUID } = req.body;

  // If any of the two uids are not found return a 400 error
  if (!fromUID || !toUID) {
    return res.status(400).json({
      success: false,
      message: "Incomplete data sent",
    });
  }

  try {
    // Find both users in the database
    const fromUser = await User.findOne({ uid: fromUID });
    const toUser = await User.findOne({ uid: toUID });

    // If any of the users are not found return a 404 error
    if (!fromUser || !toUser) {
      return res.status(404).json({
        success: false,
        message: "Users not found",
        from: fromUser,
        to: toUser,
      });
    }

    // Check for existing request (unique index will also enforce this)
    const existingRequest = await FriendRequest.findOne({
      fromUID: fromUser._id,
      toUID: toUser._id,
    });

    // Check if a request between these users already exists
    if (existingRequest) {
      return res.status(400).json({
        success: false,
        message: "Friend request already sent",
      });
    }

    // if all checks pass, add a friend request item to the FriendRequest Table
    const friendRequest = new FriendRequest({
      fromUID: fromUser._id,
      toUID: toUser._id,
    });

    // once created save the new friend request
    await friendRequest.save();

    // Finnaly return a 200 ok response
    return res.status(200).json({
      success: true,
      message: "Friend request sent",
      request: friendRequest,
    });

    // Catch any errors
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Function to respond to friend request
const respondFriendRequest = async (req, res) => {
  // Get theRequestID and the action from the DB, Remember the action might be either pending, accepted or declined
  const { requestID, action } = req.body;

  // If the data is incomplete return a 400 response
  if (!requestID || !["accepted", "declined", "pending"].includes(action)) {
    return res.status(400).json({
      success: false,
      message: "Invalid request data",
    });
  }

  try {
    // Search the FriendRequest Table with requestID and populate to and from linked to the request
    const request = await FriendRequest.findById(requestID).populate(
      "fromUID toUID"
    );
    if (!request) {
      return res
        .status(404)
        .json({ success: false, message: "Friend request not found" });
    }

    // Link the request.status to the action
    request.status = action;

    // Save the document
    await request.save();

    // If accepted, add each other to contactList
    if (action === "accepted") {
      // Query both users from the database
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
