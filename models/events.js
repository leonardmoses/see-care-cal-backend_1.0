const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    participants: {
        type: Array,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },


});



const EventModel = mongoose.model("events", EventSchema)
module.exports = EventModel