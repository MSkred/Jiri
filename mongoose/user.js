import mongoose from 'mongoose';

var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
    id: Number,
    is_admin: Boolean,
    name: String,
    email: String,
    password: String,
    company: String,
}, { collection: "User" });

var User = mongoose.model('User', userSchema);

export default User
