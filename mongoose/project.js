import mongoose from 'mongoose';
var Schema = mongoose.Schema;

// Creation of event schema
var projectSchema = new Schema({
    id: String,
    name: String,
    url_github: String,
    url_project: String,
    event_id: { type: String, ref: 'Event' },
    student_id: { type: String, ref: 'Student' },
}, { collection: "Project" });

var Project = mongoose.model('Project', projectSchema);

export default Project;