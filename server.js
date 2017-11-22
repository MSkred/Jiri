import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import mongoose from 'mongoose'
import nanoid from 'nanoid'

import graphQLSchema from './Model/graphql/Schema'
import User from './Model/mongoose/user'
import Student from './Model/mongoose/student'
import Event from './Model/mongoose/event'
import Project from './Model/mongoose/project'
import Meeting from './Model/mongoose/meeting'

const PORT = 3000;

// Mongoose connect
mongoose.connect('mongodb://localhost:27017/jiri')

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
        is_admin: true,
        name: 'Dominique Vilain',
        email: 'domi.vilain@gmail.com',
        password: 'root',
        company: 'HEPL',
        soft_delete: false,
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
        soft_delete: false,
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
        name: 'Jury Design Web 3ème',
        academic_year: '2017-2018',
        user_id: '1',
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
        description: 'Projet pour l\'ASBL Saint-LéonArt',
        weight: 0.3,
        soft_delete: false,
    })

    project.save((err, result) => {
        if (err) { console.log("---Project save failed " + err) }
        console.log("+++Project saved successfully " + project.name)
        res.redirect('/')
    })
})

app.post('/addMeeting', (req, res) => {
    // Insert into MEETING Collection
    var meeting = new Meeting({
        id: nanoid(),
        start_time: '8:45',
        end_time: '9:30',
        evaluation: 14.5,
        soft_delete: false,
        user_id: '1',
        student_id: '2',
        event_id: '3',
    })

    meeting.save((err, result) => {
        if (err) { console.log("---Meeting save failed " + err) }
        console.log("+++Meeting saved successfully " + meeting.evaluation)
        res.redirect('/')
    })
})

app.post('/addScore', (req, res) => {
    // Insert into SCORE Collection
    var score = new Score({
        id: nanoid(),
        comment: 'Très bon élèves le meilleurs de tous !',
        score: 18.6,
        soft_delete: false,
        meeting_id: '10',
        implementation_id: '11',
    })

    score.save((err, result) => {
        if (err) { console.log("---Score save failed " + err) }
        console.log("+++Score saved successfully " + score.score)
        res.redirect('/')
    })
})

app.post('/addImplementation', (req, res) => {
    // Insert into IMPLEMENTATION Collection
    var implementation = new Implementation({
        id: nanoid(),
        url_project: 'http://maxime-scibetta.be',
        url_github: 'http://github.com',
        soft_delete: false,
        project_id: '541',
        student_id: '5785',
        event_id: '878768',
    })

    implementation.save((err, result) => {
        if (err) { console.log("---Implementation save failed " + err) }
        console.log("+++Implementation saved successfully " + implementation.score)
        res.redirect('/')
    })
})
app.listen(PORT);