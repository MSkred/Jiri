import UserMongo from '../../mongoose/user'
import StudentMongo from '../../mongoose/student'
import EventMongo from '../../mongoose/event'
import ProjectMongo from '../../mongoose/project'
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
    },
    Event: {
        user_id: (root, params, context, options) => {
            return getAll(UserMongo, root, { id: root.user_id }, context, options)
        },
    },
    Project: {
        student_id: (root, params, context, options) => {
            return getAll(StudentMongo, root, { id: root.student_id }, context, options)
        },
        event_id: (root, params, context, options) => {
            return getAll(EventMongo, root, { id: root.event_id }, context, options)
        },
    }
};
