import UserMongo from '../../mongoose/user'
import StudentMongo from '../../mongoose/student'
import EventMongo from '../../mongoose/event'
import getProjection from './getProjection'
import { find, filter } from 'lodash';

export const resolvers = {
    Query: {
        users: (root, params, context, options) => {
            let projection = getProjection(options);
            
            return UserMongo
                .find(params)
                .select(projection)
                .exec();
        },
        students: (root, params, context, options) => {
            let projection = getProjection(options);

            return StudentMongo
                .find()
                .select(projection)
                .exec();
        },
        user: (root, params, context, options) => {
            let projection = getProjection(options);

            return UserMongo
                .find(params)
                .select(projection)
                .exec();
        }
    },
};
