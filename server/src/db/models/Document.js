const mongoose = require("mongoose");
const { Schema } = mongoose;

const DocumentSchema = new Schema({
  // Stored Document Name
  documentName: {
    type: String,
    // Normalize the names
    set: (value) => {
      if (!value) return value;
      let trimmed = value.trim();
      trimmed = trimmed.replace(/\.[^/.]+$/, "");
      return trimmed.toLowerCase();
    },
  },
  // Single owner
  ownerUID: {
    type: String,
    required: true,
  },
  // List of users it is shared with
  sharedUIDs: [
    {
      type: String, // also store Firebase UIDs
    },
  ],
});

const Document = mongoose.model("Document", DocumentSchema);

module.exports = Document;
