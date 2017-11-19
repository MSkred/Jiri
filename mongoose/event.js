import mongoose from 'mongoose';
var Schema = mongoose.Schema;

// Creation of event schema
var eventSchema = new Schema({
    id: String,
    name: String,
    date: String,
    creator: Object,
}, { collection: "Event" });

var Event = mongoose.model('Event', eventSchema);

export default Event;