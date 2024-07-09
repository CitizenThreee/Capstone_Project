const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//A schema for a content section that is within the tab schema
const contentSchema = new Schema({
    type: { type: String, required: true },
    view: { type: [String] },
    fpost: { type: [String] },
    rpost: { type: [String] },
    isContainer: { type: Boolean, default: false },
    cType: { type: String, default: "Page" },
    authorId: { type: Schema.Types.ObjectId },
    tTitle: { type: String },
    subTitle: { type: String },
    img: { type: String },
    bTitle: { type: String },
    description: { type: String }
})

//The tab data structure. An id is auto generated each time a tab is created.
const tabSchema = new Schema({
    groupId: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, trim: true, required: true },
    type: { type: String, required: true },
    contentSchema: { type: [contentSchema], required: true },
    position: { type: Number, required: true },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("tab", tabSchema);