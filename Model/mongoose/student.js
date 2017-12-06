import mongoose from 'mongoose';

var Schema = mongoose.Schema;

// Creation of student schema
var studentSchema = new Schema({
    id: String,
    name: String,
    email: String,
    soft_delete: Boolean,
    implementations: [{ type: Schema.Types.ObjectId, ref: 'Implementation' }],
    meetings: [{ type: Schema.Types.ObjectId, ref: 'Meeting' }],
    weights: [{ type: Schema.Types.ObjectId, ref: 'Weight' }],
}, { collection: "Student" });

var Student = mongoose.model('Student', studentSchema);

export default Student