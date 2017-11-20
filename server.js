import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import mongoose from 'mongoose'
import nanoid from 'nanoid'

import graphQLSchema from './graphql/Schema/Schema'
import User from './mongoose/user'
import Student from './mongoose/student'
import Event from './mongoose/event'
import Project from './mongoose/project'

const PORT = 3000;

// Mongoose connect
mongoose.connect('mongodb://localhost:27017/local')

var db = mongoose.connection;
db.on('error', () => { console.log('---FAILED to connect to mongoose') })
db.once('open', () => {
    console.log('+++Connected to mongoose')
})

const app = express();

// bodyParser is needed just for POST.
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: graphQLSchema }));
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })); // if you want GraphiQL enabled

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/addUser', (req, res) => {
    // Insert into USER Collection
    var user = new User({
        id: nanoid(),
        is_admin: 1,
        name: 'Dominique Vilain',
        email: 'domi.vilain@gmail.com',
        password: 'root',
        company: 'HEPL',
    })

    user.save((err, result) => {
        if (err) { console.log("---User save failed " + err) }
        console.log("+++User saved successfully " + user.name)
        res.redirect('/')
        
    })
})

app.post('/addStudent', (req, res) => {
    // Insert into STUDENT Collection
    var student = new Student({
        id: nanoid(),
        name: 'Maxime',
        email: 'maxime.scibetta@outlook.com',
        github: 'http://github.com/MaximeScibetta',
        photo: 'assets/img/student/maxime.jpg',
    })

    student.save((err, result) => {
        if (err) { console.log("---Student save failed " + err) }
        console.log("+++Student saved successfully " + student.name)
        res.redirect('/')
    })
})

app.post('/addEvent', (req, res) => {
    // Insert into EVENT Collection
    var event = new Event({
        id: nanoid(),
        name: 'Jury de 3ème année',
        date: 'Le 23 juin 2017',
        user_id: 'I5Yvv2SvHWwTAv7gNUOyX',
    })

    event.save((err, result) => {
        if (err) { console.log("---Event save failed " + err) }
        console.log("+++Event saved successfully " + event.name)
        res.redirect('/')
    })
})

app.post('/addProject', (req, res) => {
    // Insert into PROJECT Collection
    var project = new Project({
        id: nanoid(),
        name: 'Saint-Léon\'Art',
        url_github: 'http://github.com',
        url_project: 'http//maxime-scibetta.be',
        event_id: 'v6yJRlbzX2dZJ5Pw6VG6Z',
        student_id: 'ZBsAXjZvShzdu9ojjjc69',
    })

    project.save((err, result) => {
        if (err) { console.log("---Project save failed " + err) }
        console.log("+++Project saved successfully " + project.name)
        res.redirect('/')
    })
})
app.listen(PORT);