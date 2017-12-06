import fetch from 'node-fetch';
import ApolloClient from 'apollo-client'
import { HttpLink, InMemoryCache } from 'apollo-client-preset'

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
import Implementation from './Model/mongoose/implementation'
import Score from './Model/mongoose/score'
import Weight from './Model/mongoose/weight'

const PORT = 3000;

// Mongoose connect
mongoose.connect('mongodb://localhost:27017/jiri')

var db = mongoose.connection;
db.on('error', () => { console.log('---FAILED to connect to mongoose') })
db.once('open', () => {
    console.log('+++Connected to mongoose')
})

const app = express();

const client = new ApolloClient({
    link: new HttpLink({ uri: 'http://localhost:3000/graphql', fetch}),
    cache: new InMemoryCache()
});

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
        name: 'Myriam Dupont',
        email: 'myriam.dupont@gmail.com',
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
        name: 'Mehdy',
        email: 'mehdy.ouras@outlook.com',
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
        course_name: 'Jury Design Web 2ème',
        academic_year: '2017-2018',
        user_id: 'S9bVR0VU9JAETp37bETvd',
        soft_delete: false,
    })

    event.save((err, result) => {
        if (err) { console.log("---Event save failed " + err) }
        console.log("+++Event saved successfully " + event.course_name)
        res.redirect('/')
    })
})

app.post('/addProject', (req, res) => {
    // Insert into PROJECT Collection
    var project = new Project({
        id: nanoid(),
        name: 'Curiculum vitae',
        description: 'Projet d\'un cv personel',
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
        start_time: '9:45',
        end_time: '10:30',
        evaluation: 10.5,
        soft_delete: false,
        user_id: 'S9bVR0VU9JAETp37bETvd',
        student_id: '2Lt06At2VdZtwCqDoKN8A',
        event_id: 'YGIfEYhQ41T4ExTKowpLc',
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
        comment: 'Skuuuurt skuuuuurt',
        score: 0.9,
        soft_delete: false,
        meeting_id: 'jwIFovxLvMitf~UU373_P',
        implementation_id: 'EbZQMU_YwqUR37JQSfLP6',
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
        url_project: 'http://mehdy-ouras.be/',
        url_github: 'http://github.com',
        soft_delete: false,
        project_id: 'fFMBwr43dJQCCflxJdOWe',
        student_id: '2Lt06At2VdZtwCqDoKN8A',
        event_id: 'YGIfEYhQ41T4ExTKowpLc',
    })

    implementation.save((err, result) => {
        if (err) { console.log("---Implementation save failed " + err) }
        console.log("+++Implementation saved successfully " + implementation.url_project)
        res.redirect('/')
    })
})
app.listen(PORT);