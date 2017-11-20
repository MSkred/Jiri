import getProjection from './getProjection'

export default function (schema, root, params, context, options) {
    let projection = getProjection(options);
    let items = schema
        .find(params)
        .select(projection)
        .exec();

    return items;
}