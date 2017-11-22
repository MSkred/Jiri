import mongoose from 'mongoose';
var Schema = mongoose.Schema;

// Creation of event schema
var eventSchema = new Schema({
    id: String,
    course_name: String,
    academic_year: String,
    soft_delete: Boolean,
    user_id: { type: String, ref: 'User' },
    meetings: [{ type: Schema.Types.ObjectId, ref: 'Meeting' }],
}, { collection: "Event" });

var Event = mongoose.model('Event', eventSchema);

export default Event;