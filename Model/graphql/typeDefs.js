export const typeDefs = `
    type User {
        id: String!
        is_admin: Boolean!
        name: String!
        email: String!
        password: String!
        company: String
        soft_delete: Boolean!
        events: [Event]
        meetings: [Meeting]
    }

    type Student {
        id: String!
        name: String!
        email: String!
        soft_delete: Boolean!
        implementations: [Implementation]
        meetings: [Meeting]
    }

    type Event {
        id: String!
        course_name: String!
        academic_year: String!
        soft_delete: Boolean!
        user_id: [User]
        meetings: [Meeting]
    }

    type Project {
        id: String!
        name: String!
        description: String
        weight: Int!
        soft_delete: Boolean!
        implementations: [Implementation]
    }

    type Meeting {
        id: String!
        start_time: String
        end_time: String
        evaluation: Int
        soft_delete: Boolean!
        user_id: [User]
        student_id: [Student]
        event_id: [Event]
    }

    type Score {
        id: String!
        comment: String
        score: Int
        soft_delete: Boolean
        meeting_id: [Meeting]
        implementation_id: [Implementation]
    }

    type Implementation {
        id: String!
        url_project: String
        url_github: String
        soft_delete Boolean!
        project_id: [Project]
        student_id: [Student]
        event_id: [Event]
        scores: [Score]
    }

    type Query {
        users: [User]
        students: [Student]
        events: [Event]
        projects: [Project]
        meetings: [Meeting]
        implementations: [Implementation]
        scores: [Score]
        user(id: String): [User]  
        projects(student_id: String): [Project]
        events(user_id: String): [Event]
        meetings(user_id: String, student_id: String): [Meeting]
    }
`;
