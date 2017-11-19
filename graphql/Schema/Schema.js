import {typeDefs} from './typeDefs'
import {resolvers} from './resolvers'
import { makeExecutableSchema } from 'graphql-tools';
import getProjection from './getProjection'

export const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

export default schema;