import mongoose from 'mongoose';
var Schema = mongoose.Schema;

// Creation of implementation schema
var implementationSchema = new Schema({
    id: String,
    url_project: String,
    url_github: String,
    soft_delete: Boolean,
    project_id: { type: String, ref: 'Project' },
    student_id: { type: String, ref: 'Student' },
    event_id: { type: String, ref: 'Event' },
    scores: [{ type: Schema.Types.ObjectId, ref: 'Score' }],
}, { collection: "Implementation" });

var Implementation = mongoose.model('Implementation', implementationSchema);

export default Implementation;