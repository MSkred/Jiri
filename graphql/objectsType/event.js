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
import { userType } from './user';

export const eventType = new GraphQLObjectType({
    name: 'event',
    description: 'Event',
    fields: () => ({
        name: {
            type: GraphQLString,
            description: 'The name of the event',
        },
        date: {
            type: GraphQLString,
            description: 'The date of the event',
        },
        creator: {
            type: new GraphQLList(userType),
            description: 'The object of the event creator',
        },
    })
});