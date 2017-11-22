import mongoose from 'mongoose';
var Schema = mongoose.Schema;

// Creation of meeting schema
var meetingSchema = new Schema({
    id: String,
    start_time: String,
    end_time: String,
    evaluation: Number,
    soft_delete: Boolean,
    user_id: { type: String, ref: 'User' },
    student_id: { type: String, ref: 'Student' },
    event_id: { type: String, ref: 'Event' },
    scores: { type: Schema.Types.ObjectId, ref: 'Score' },
}, { collection: "Meeting" });

var Meeting = mongoose.model('Meeting', meetingSchema);

export default Meeting;