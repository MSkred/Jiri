import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLID
} from 'graphql/type';

export const studentType = new GraphQLObjectType({
    name: 'student',
    description: 'Student',
    fields: () => ({
        name: {
            type: GraphQLString,
            description: 'The name of the student',
        },
        email: {
            type: GraphQLString,
            description: 'The email of the student',
        },
        github: {
            type: GraphQLString,
            description: 'The link of the student github',
        },
        photo: {
            type: GraphQLString,
            description: 'The path of the student photo'
        }

    })
});