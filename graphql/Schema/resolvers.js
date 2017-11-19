import UserMongo from '../../mongoose/user'
import StudentMongo from '../../mongoose/student'

export const resolvers = {
    Query: {
        user: () => (root, params, context, options) => {
            let projections = getProjection(options);
            
            return UserMongo
                .find()
                .select(projection)
                .exec();
        },
        student: () => (root, params, context, options) => {
            let projections = getProjection(options);

            return StudentMongo
                .find()
                .select(projection)
                .exec();
        },
    }
};
