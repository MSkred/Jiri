export const typeDefs = `
    type User {
        id: String!
        is_admin: Int
        name: String
        email: String
        password: String
        company: String
        events: [Event]
    }

    type Student {
        id: String!
        name: String
        email: String
        github: String
        photo: String
        projects: [Project]
    }

    type Event {
        id: String!
        name: String
        date: String
        user_id: [User]
    }

    type Project {
        id: String!
        name: String
        url_github: String
        url_project: String
        event_id: [Event]
        student_id: [Student]
    }

    type Query {
        users: [User]
        students: [Student]
        events: [Event]
        projects: [Project]
        user(id: String): [User]  
        projects(student_id: String): [Project]
    }
`;
