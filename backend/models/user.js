const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//The user data structure. An id is auto generated each time a user is created
const userSchema = new Schema({
    fname: { type: String, trim: true, required: true },
    lname: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true, unique: true },
    pfp: { type: String, trim: true },
    phone: { type: Number, trim: true },
    password: { type: String, trim: true, required: true },
    website: { type: String, trim: true },
    occupation: { type: String, trim: true },
    about: { type: String, trim: true },
    location: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("user", userSchema);