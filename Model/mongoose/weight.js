import mongoose from 'mongoose';
var Schema = mongoose.Schema;

// Creation of weight schema
var weightSchema = new Schema({
    id: String,
    value: Number,
    project_id: { type: String, ref: 'Project' },
    event_id: { type: String, ref: 'Event' },
}, { collection: "Weight" });

var Weight = mongoose.model('Weight', projectSchema);

export default Weight;