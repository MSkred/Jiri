import UserMongo from '../../mongoose/user'
import StudentMongo from '../../mongoose/student'
import EventMongo from '../../mongoose/event'
import ProjectMongo from '../../mongoose/project'
import MeetingMongo from '../../mongoose/meeting'
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
        meetings: (root, params, context, options) => {
            return getAll(MeetingMongo, root, params, context, options)
        }
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
        projects: (root, params, context, options) => {
            return getAll(ProjectMongo, root, { student_id: root.id }, context, options)
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
    },
    Project: {
        student_id: (root, params, context, options) => {
            return getAll(StudentMongo, root, { id: root.student_id }, context, options)
        },
        event_id: (root, params, context, options) => {
            return getAll(EventMongo, root, { id: root.event_id }, context, options)
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
    }
};
