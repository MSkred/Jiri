import mongoose from 'mongoose';
var Schema = mongoose.Schema;

// Creation of meeting schema
var meetingSchema = new Schema({
    id: String,
    hour: String,
    user_id: { type: String, ref: 'User' },
    student_id: { type: String, ref: 'Student' },
    event_id: {type: String, ref: 'Event'},
    cote: String,
}, { collection: "Meeting" });

var Meeting = mongoose.model('Meeting', meetingSchema);

export default Meeting;