const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//The user data structure. An id is auto generated each time a user is created.
const userGroupSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
    groupId: { type: Schema.Types.ObjectId, required: true, ref: 'group' },
    roles: { type: [String], default: [] },
    showAbout: { type: Boolean, default: true },
    showPhone: { type: Boolean, default: true },
    showEmail: { type: Boolean, default: true },
    showWebsite: { type: Boolean, default: true },
    showOccupation: { type: Boolean, default: true },
    status: { type: String, default: 'pending'},
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("userGroup", userGroupSchema);