const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//A schema for a content section that is within the tab schema
const contentSchema = new Schema({
    type: { type: String, required: true },
    view: { type: [String], default: [] },
    fpost: { type: [String], default: [] },
    rpost: { type: [String], default: [] },
    isContainer: { type: Boolean, default: false },
    cType: { type: String },
    subTitle: { type: Boolean },
    img: { type: Boolean },
    description: { type: Boolean }
})

//The tab data structure. An id is auto generated each time a tab is created.
const tabSchema = new Schema({
    groupId: { type: Schema.Types.ObjectId, required: true, ref: 'group' },
    name: { type: String, trim: true, required: true },
    type: { type: String, required: true },
    view: { type: [String], default: [] },
    fpost: { type: [String], default: [] },
    rpost: { type: [String], default: []},
    contentSchema: { type: [contentSchema], default: [{ type: 'none' }] },
    position: { type: Number, required: true, unique: true },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('tab', tabSchema);