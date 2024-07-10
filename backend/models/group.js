const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//The user data structure. An id is auto generated each time a user is created.
const groupSchema = new Schema({
    parentId: { type: Schema.Types.ObjectId, ref: 'group'},
    name: { type: String, trim: true, required: true },
    banner: { type: String, trim: true },
    description: { type: String, trim: true, required: true },
    location: { type: String, trim: true },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("group", groupSchema);