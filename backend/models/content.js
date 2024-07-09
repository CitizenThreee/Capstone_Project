const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//The content data structure. An id is auto generated each time a content is created.
const contentSchema = new Schema({
    authorId: { type: Schema.Types.ObjectId, required: true },
    tabId: { type: Schema.Types.ObjectId, required: true },
    groupId: { type: Schema.Types.ObjectId, required: true },
    type: { type: String, required: true },
    title: { type: String, required: true },
    subTitle: { type: String },
    image: { type: String },
    level: { type: String },
    size: { type: String },
    tags: { type: [String] },
    description: { type: String },
    modified_at: { type: Date, default: Date.now },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("content", contentSchema);