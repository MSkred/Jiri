import mongoose from 'mongoose';
var Schema = mongoose.Schema;

// Creation of event schema
var eventSchema = new Schema({
    id: String,
    name: String,
    date: String,
    user_id: { type: String, ref: 'User' },
    meetings: [{ type: Schema.Types.ObjectId, ref: 'Meeting' }],
}, { collection: "Event" });

var Event = mongoose.model('Event', eventSchema);

export default Event;