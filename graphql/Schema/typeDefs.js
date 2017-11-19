export const typeDefs = `
    type User {
        id: String!
        is_admin: Int
        name: String
        email: String
        password: String
        company: String
    }

    type Student {
        id: String!
        name: String
        email: String
        github: String
        photo: String
    }

    type Event {
        id: String!
        name: String
        Date: String
        creator: User
    }

    type Query {
        users: [User]
        students: [Student]
        user(id: String!): [User]  
    }
`;
