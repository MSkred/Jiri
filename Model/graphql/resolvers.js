// Mongodb Schema
import UserMongo from '../mongoose/user'
import StudentMongo from '../mongoose/student'
import EventMongo from '../mongoose/event'
import ProjectMongo from '../mongoose/project'
import ImplementationMongo from '../mongoose/implementation'
import MeetingMongo from '../mongoose/meeting'
import ScoreMongo from '../mongoose/score'
import WeightMongo from '../mongoose/weight'
// Functions
import getProjection from './functions/getProjection'
import getAll from './functions/getAll'
import { find, filter } from 'lodash';

export const resolvers = {
    Query: {
        users: (root, params, context, options) => {
            return getAll(UserMongo, root, params, context, options)
        },
        students: (root, params, context, options) => {
            return getAll(StudentMongo, root, params, context, options)
        }, 
        events: (root, params, context, options) => {
            return getAll(EventMongo, root, params, context, options)
        },
        projects: (root, params, context, options) => {
            return getAll(ProjectMongo, root, params, context, options)
        },
        implementations: (root, params, context, options) => {
            return getAll(ImplementationMongo, root, params, context, options)
        },
        meetings: (root, params, context, options) => {
            return getAll(MeetingMongo, root, params, context, options)
        },
        scores: (root, params, context, options) => {
            return getAll(ScoreMongo, root, params, context, options)
        },
        weights: (root, params, context, options) => {
            return getAll(WeightMongo, root, params, context, options)
        },
    },
    User: {
        events: (root, params, context, options) => {
            return getAll(EventMongo, root, { user_id: root.id  }, context, options)
        },
        meetings: (root, params, context, options) => {
            return getAll(MeetingMongo, root, { user_id: root.id }, context, options)
        },
    }, 
    Student: {
        implementations: (root, params, context, options) => {
            return getAll(ImplementationMongo, root, { student_id: root.id }, context, options)
        },
        meetings: (root, params, context, options) => {
            return getAll(MeetingMongo, root, { student_id: root.id }, context, options)
        },
    },
    Event: {
        user_id: (root, params, context, options) => {
            return getAll(UserMongo, root, { id: root.user_id }, context, options)
        },
        meetings: (root, params, context, options) => {
            return getAll(MeetingMongo, root, { event_id: root.id }, context, options)
        },
        implementations: (root, params, context, options) => {
            return getAll(ImplementationMongo, root, { implementation_id: root.id }, context, options)
        },
        weights: (root, params, context, options) => {
            return getAll(WeightMongo, root, { weight_id: root.id }, context, options)
        },
    },
    Project: {
        implementations: (root, params, context, options) => {
            return getAll(ImplementationMongo, root, { implementation_id: root.id }, context, options)
        },
        weights: (root, params, context, options) => {
            return getAll(WeightMongo, root, { weight_id: root.id }, context, options)
        },
    },
    Meeting: {
        student_id: (root, params, context, options) => {
            return getAll(StudentMongo, root, { id: root.student_id }, context, options)
        },
        event_id: (root, params, context, options) => {
            return getAll(EventMongo, root, { id: root.event_id }, context, options)
        },
        user_id: (root, params, context, options) => {
            return getAll(UserMongo, root, { id: root.user_id }, context, options)
        },
        scores: (root, params, context, options) => {
            return getAll(ScoreMongo, root, { score_id: root.id }, context, options)
        }
    },
    Score: {
        meeting_id: (root, params, context, options) => {
            return getAll(MeetingMongo, root, { id: root.meeting_id }, context, options)
        },
        implementation_id: (root, params, context, options) => {
            return getAll(ImplementationMongo, root, { id: root.implementation_id }, context, options)
        },
    },
    Implementation: {
        project_id: (root, params, context, options) => {
            return getAll(ProjectMongo, root, { id: root.project_id }, context, options)
        },
        event_id: (root, params, context, options) => {
            return getAll(EventMongo, root, { id: root.event_id }, context, options)
        },
        student_id: (root, params, context, options) => {
            return getAll(StudentMongo, root, { id: root.student_id }, context, options)
        },
        scores: (root, params, context, options) => {
            return getAll(ScoreMongo, root, { score_id: root.id }, context, options)
        }
    },
    Weight: {
        project_id: (root, params, context, options) => {
            return getAll(ProjectMongo, root, { id: root.project_id }, context, options)
        },
        event_id: (root, params, context, options) => {
            return getAll(EventMongo, root, { id: root.event_id }, context, options)
        },
    },
};
