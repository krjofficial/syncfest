const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const {userSchema} = require("./user")


const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  attendees: [
    {
    username: {
      type: String,
      required: false,
      lowercase: true,
      trim: true,
      unique: false
    },
    email: {
      type: String,
      required: false,
      lowercase: true,
      trim: true,
      unique: false
    }
  }
  ]
}, {timestamps: true});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;

