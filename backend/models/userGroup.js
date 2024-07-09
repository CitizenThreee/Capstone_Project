const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//The user data structure. An id is auto generated each time a user is created.
const userGroupSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    groupId: { type: Schema.Types.ObjectId, required: true },
    roles: { type: [String] },
    showAbout: { Type: Boolean, default: true },
    showPhone: { Type: Boolean, default: true },
    showEmail: { Type: Boolean, default: true },
    showWebsite: { Type: Boolean, default: true },
    showOccupation: { Type: Boolean, default: true },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("userGroup", userGroupSchema);