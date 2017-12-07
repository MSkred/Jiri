
import UserMongo from '../Model/mongoose/user'
import StudentMongo from '../Model/mongoose/student'

export default {
    changeUserName: (root, { _id }, context, options) => {
        UserMongo.findByIdAndUpdate(_id, { $set: { name: 'joe' } }, { new: true }, (err, user) => {
            if (err) return console.log(err);
            console.log(user);
        })
    },
    createUser: (root, params, context, options) => {
        var newUser = new UserMongo(params);

        newUser.save((err, res) => {
            if (err) { console.log("---User creation failed " + err) }
            console.log("+++User creation successfully " + newUser.name)
        })
    },
    createStudent: (root, params, context, options) => {
        var newStudent = new StudentMongo(params);

        newStudent.save((err, res) => {
            if (err) { console.log("---Student creation failed " + err) }
            console.log("+++Student creation successfully " + newStudent.name)
        })
    },  
}