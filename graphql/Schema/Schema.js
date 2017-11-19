import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLBoolean
} from 'graphql/type';

import UserMongo from '../../mongoose/user'
import {userType} from '../objectsType/user'

import StudentMongo from '../../mongoose/student'
import { studentType } from '../objectsType/student'



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


var schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            user: {
                type: new GraphQLList(userType),
                resolve: (root, { }, source, fieldASTs) => {
                    var projections = getProjection(fieldASTs);
                    var foundItems = new Promise((resolve, reject) => {
                        UserMongo.find({}, projections, (err, users) => {
                            err ? reject(err) : resolve(users)
                        })
                    })

                    return foundItems
                }
            },
            student: {
                type: new GraphQLList(studentType),
                resolve: (root, { }, source, fieldASTs) => {
                    var projections = getProjection(fieldASTs);
                    var foundItems = new Promise((resolve, reject) => {
                        StudentMongo.find({}, projections, (err, students) => {
                            err ? reject(err) : resolve(students)
                        })
                    })

                    return foundItems
                }
            }
        }
    })

});

export default schema;