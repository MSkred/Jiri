import {typeDefs} from './typeDefs'
import {resolvers} from './resolvers'
import { makeExecutableSchema } from 'graphql-tools';

export const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

/**
 * generate projection object for mongoose
 * @param  {Object} fieldASTs
 * @return {Project}
 */
export function getProjection(fieldASTs) {
    return fieldASTs.fieldNodes[0].selectionSet.selections.reduce((projections, selection) => {
        projections[selection.name.value] = true;
        return projections;
    }, {});
}


export default schema;