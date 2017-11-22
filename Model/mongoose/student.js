import mongoose from 'mongoose';

var Schema = mongoose.Schema;

// Creation of student schema
var studentSchema = new Schema({
    id: String,
    name: String,
    email: String,
    soft_delete: Boolean,
    projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
    meetings: [{ type: Schema.Types.ObjectId, ref: 'Meeting' }],
}, { collection: "Student" });

var Student = mongoose.model('Student', studentSchema);

export default Student