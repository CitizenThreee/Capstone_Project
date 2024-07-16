const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//The content data structure. An id is auto generated each time a content is created.
const contentSchema = new Schema({
    authorId: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
    parentId: { type: Schema.Types.ObjectId, required: true },
    groupId: { type: Schema.Types.ObjectId, required: true, ref: 'group' },
    type: { type: String, required: true },
    title: { type: String },
    subtitle: { type: String },
    image: { type: String },
    level: { type: String },
    size: { type: String },
    tags: { type: [String] },
    description: { type: String },
    position: { type: Number },
    status: { type: String, default: "pending", required: true },
    modified_at: { type: Date, default: Date.now },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("content", contentSchema);