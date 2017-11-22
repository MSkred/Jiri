import mongoose from 'mongoose';
var Schema = mongoose.Schema;

// Creation of score schema
var scoreSchema = new Schema({
    id: String,
    comment: String,
    score: Number,
    soft_delete: Boolean,
    meeting_ig: { type: String, ref: 'Meeting' },
    implementation_id: { type: String, ref: 'Implementation' },
}, { collection: "Score" });

var Score = mongoose.model('Score', scoreSchema);

export default Score;