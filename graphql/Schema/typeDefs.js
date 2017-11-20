export const typeDefs = `
    type User {
        id: String!
        is_admin: Int
        name: String
        email: String
        password: String
        company: String
        events: [Event]
        meetings: [Meeting]
    }

    type Student {
        id: String!
        name: String
        email: String
        github: String
        photo: String
        projects: [Project]
        meetings: [Meeting]
    }

    type Event {
        id: String!
        name: String
        date: String
        user_id: [User]
        meetings: [Meeting]
    }

    type Project {
        id: String!
        name: String
        url_github: String
        url_project: String
        event_id: [Event]
        student_id: [Student]
    }

    type Meeting {
        id: String!
        hour: String
        user_id: [User]
        student_id: [Student]
        event_id: [Event]
        cote: String
    }

    type Query {
        users: [User]
        students: [Student]
        events: [Event]
        projects: [Project]
        meetings: [Meeting]
        user(id: String): [User]  
        projects(student_id: String): [Project]
        events(user_id: String): [Event]
        meetings(user_id: String, student_id: String): [Meeting]
    }
`;
