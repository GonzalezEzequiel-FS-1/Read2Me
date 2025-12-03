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

module.exports = { createUser, getUser, editUser, deleteUser, deleteAllUsers };
