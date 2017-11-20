import mongoose from 'mongoose';
var Schema = mongoose.Schema;

// Creation of event schema
var eventSchema = new Schema({
    id: String,
    name: String,
    date: String,
    user_id: { type: String, ref: 'User' },
}, { collection: "Event" });

var Event = mongoose.model('Event', eventSchema);

export default Event;