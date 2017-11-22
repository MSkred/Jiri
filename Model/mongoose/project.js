import mongoose from 'mongoose';
var Schema = mongoose.Schema;

// Creation of project schema
var projectSchema = new Schema({
    id: String,
    name: String,
    description: String,
    weight: Number,
    soft_delete: Boolean,
    implementations: { type: String, ref: 'Implementation' },
}, { collection: "Project" });

var Project = mongoose.model('Project', projectSchema);

export default Project;