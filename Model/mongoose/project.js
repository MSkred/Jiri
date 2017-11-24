import mongoose from 'mongoose';
var Schema = mongoose.Schema;

// Creation of project schema
var projectSchema = new Schema({
    id: String,
    name: String,
    description: String,
    soft_delete: Boolean,
    implementations: [{ type: Schema.Types.ObjectId, ref: 'Implementation' }],
    weights: [{ type: Schema.Types.ObjectId, ref: 'Weight' }],
}, { collection: "Project" });

var Project = mongoose.model('Project', projectSchema);

export default Project;