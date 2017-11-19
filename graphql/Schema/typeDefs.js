export const typeDefs = `
    type User {
        id: Int!
        is_admin: Int
        name: String
        email: String
        password: String
        company: String
    }

    type Student {
        id: Int!
        name: String
        email: String
        github: String
        photo: String
    }

    type Query {
        user: [User]
        student: [Student]
    }
`;
