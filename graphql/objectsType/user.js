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

export const userType = new GraphQLObjectType({
    name: 'user',
    description: 'User',
    fields: () => ({
        is_admin: {
            type: (GraphQLBoolean),
            description: 'Is the user an admin',
        },
        name: {
            type: GraphQLString,
            description: 'The name of the user',
        },
        email: {
            type: GraphQLString,
            description: 'The email of the user',
        },
        password: {
            type: GraphQLString,
            description: 'The password of the user',
        },
        company: {
            type: GraphQLString,
            description: 'The company of the user',
        },
    })
});

// const userType = `
//     type User {
//         id: Number
//         is_admin: String
//         name: String
//         email: String
//         password: String
//         company: String
//     }
// `;
// export default userType;