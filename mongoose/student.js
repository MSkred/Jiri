import mongoose from 'mongoose';

var Schema = mongoose.Schema;

// Creation of student schema
var studentSchema = new Schema({
    name: String,
    email: String,
    github: String,
    photo: String,
}, { collection: "Student" } );

var Student = mongoose.model('Student', studentSchema);

export default Student