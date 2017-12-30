import Vue from 'vue'
import { apolloClient }  from './apollo'
import { store } from './store'
import router from './router'
import gql from 'graphql-tag'

/*******************
 *   My Graphql query
*******************/

// Users query
import { CREATE_USER_MUTATION } from './constants/UsersCreate.gql'
import { ALL_USER_QUERY } from './constants/UsersAll.gql'
import { UPDATE_USER_MUTATION } from './constants/UsersUpdate.gql';
import { DESACTIVATE_USER_MUTATION } from './constants/UserDesactivate.gql'
import { LOGIN_USER_MUTATION } from './constants/UsersLogin.gql'

// Students query
import { CREATE_STUDENT_MUTATION } from './constants/StudentsCreate.gql'
import { ALL_STUDENT_QUERY } from './constants/StudentsAll.gql'
import { UPDATE_STUDENT_MUTATION } from './constants/StudentsUpdate.gql';
import { DESACTIVATE_STUDENT_MUTATION } from './constants/StudentDesactivate.gql'

// Projects query
import { CREATE_PROJECT_MUTATION } from './constants/ProjectsCreate.gql'
import { ALL_PROJECT_QUERY } from './constants/ProjectsAll.gql'
import { UPDATE_PROJECT_MUTATION } from './constants/ProjectUpdate.gql';
import { DESACTIVATE_PROJECT_MUTATION } from './constants/ProjectDesactivate.gql'

// Events query
import { CREATE_EVENT_MUTATION } from './constants/EventsCreate.gql'
import { ALL_EVENT_QUERY } from './constants/EventsAll.gql'
import { UPDATE_EVENT_MUTATION } from './constants/EventsUpdate.gql'
import { DESACTIVATE_EVENT_MUTATION } from './constants/EventDesactivate.gql'

// Implementations query
import { CREATE_IMPLEMENTATIONS_MUTATION } from './constants/ImplementationsCreate.gql'
import { DELETE_IMPLEMENTATIONS_MUTATION } from './constants/ImplementationsDelete.gql'

// Meetings query
import { CREATE_MEETING_MUTATION } from './constants/MeetingsCreate.gql'

export const Bus = new Vue();

/*******************
 *   Creation
*******************/

    /*******************
     *  Create User
    *******************/
    Bus.$on('createUser', payload => {
        let { email, password, name, company, isAdmin, softDelete } = payload;

        apolloClient.mutate({
            mutation: CREATE_USER_MUTATION,
            variables: {
                email,
                password,
                name,
                company,
                isAdmin,
                softDelete
            },
            update: (cache, { data: { signupUser }}) => {
                console.log(signupUser)
                console.log('User creation done')
            },
            refetchQueries: [
                {
                    query: ALL_USER_QUERY,
                }
            ]
        });
    })
    /*******************
     *  Create Student
    *******************/
    Bus.$on('createStudent', payload => {
        let { email, name, softDelete } = payload;

        apolloClient.mutate({
            mutation: CREATE_STUDENT_MUTATION,
            variables: {
                email,
                name,
                softDelete
            },
            update: (cache, { data: { createStudent } }) => {
                console.log(createStudent)
                console.log('Student creation done')
            },
            refetchQueries: [
                {
                    query: ALL_STUDENT_QUERY,
                }
            ]
        });
    })
    /*******************
     *  Create Project
    *******************/
    Bus.$on('createProject', payload => {
        let { description, name, softDelete } = payload;

        apolloClient.mutate({
            mutation: CREATE_PROJECT_MUTATION,
            variables: {
                description,
                name,
                softDelete
            },
            update: (cache, { data: { createProject } }) => {
                console.log(createProject)
                console.log('Project creation done')
            },
            refetchQueries: [
                {
                    query: ALL_PROJECT_QUERY,
                }
            ]
        });
    })
    /*******************
     *  Create Event
    *******************/
    Bus.$on('createEvent', payload => {
        let { courseName, academicYear, softDelete, authorId, jurysIds, studentsIds, projectsIds } = payload;

        apolloClient.mutate({
            mutation: CREATE_EVENT_MUTATION,
            variables: {
                courseName,
                academicYear,
                softDelete,
                authorId,
                jurysIds,
                studentsIds,
                projectsIds,
            },
            update: (cache, { data: { createEvent } }) => {
                
                // Get the lastAddedId for implementaiton creation
                store.commit('lastAddedId', createEvent.id)

                console.log(createEvent)
                console.log('Event creation done')
                
                // Looped on students & projects ID
                // for create implementation mutation
                studentsIds.forEach(student => {
                    projectsIds.forEach(project => {

                        // Init variable for implementation mutation
                        let weight = 1 / (projectsIds.length),
                            projectId = project,
                            studentsIds = student,
                            softDelete = false,
                            eventId = store.getters.lastAddedId;

                        apolloClient.mutate({
                            mutation: CREATE_IMPLEMENTATIONS_MUTATION,
                            variables: {
                                softDelete,
                                eventId,
                                projectId,
                                studentsIds,
                                weight,
                            },
                            update: (cache, { data: { createImplementation } }) => {
                                console.log(createImplementation)
                                console.log('Implementation creation done')
                            }
                        });
                    });
                });
            },
            refetchQueries: [
                {
                    query: ALL_EVENT_QUERY,
                }
            ]
        });
    })
    /*******************
     *  Create Meeting
    *******************/
    Bus.$on('startMeeting', payload => {
        let { studentId, softDelete, authorId, eventId } = payload;

        apolloClient.mutate({
            mutation: CREATE_MEETING_MUTATION,
            variables: {
                softDelete,
                studentId,
                authorId,
                eventId
            },
            update: (cache, { data: { createMeeting } }) => {
                // Get the lastAddedId for meeting creation
                store.commit('lastAddedId', createMeeting.id)

                console.log(createMeeting)
                console.log('Meeting creation done')

                // Put meeting data in store
                store.commit('meeting', createMeeting)
            
                // Redirection on create meeting view
                location.assign(`/event/${eventId}/meeting/${store.getters.lastAddedId}/student/${studentId}`);
            }
        });
    })

/*******************
 *   Update
*******************/

    /*******************
     *  Update Student
    *******************/
    Bus.$on('modifyStudent', payload => {
        let { id, name, email } = payload;

        apolloClient.mutate({
            mutation: UPDATE_STUDENT_MUTATION,
            variables: {
                id,
                name,
                email,
            },
            update: (cache, { data: { updateStudent } }) => {
                console.log(updateStudent)
                console.log('Student updating done')
            },
            refetchQueries: [
                {
                    query: ALL_STUDENT_QUERY,
                }
            ]
        })
    })

    /*******************
     *  Update User
    *******************/
    Bus.$on('modifyUser', payload => {
        let { id, name, company, email, password } = payload;

        apolloClient.mutate({
            mutation: UPDATE_USER_MUTATION,
            variables: {
                id,
                name,
                company,
                email,
                password,
            },
            update: (cache, { data: { updateUser } }) => {
                console.log(updateUser)
                console.log('User updating done')
            },
            refetchQueries: [
                {
                    query: ALL_USER_QUERY,
                }
            ]
        })
    })

    /*******************
     *  Update Project
    *******************/
    Bus.$on('modifyProject', payload => {
        let { id, name, description } = payload;

        apolloClient.mutate({
            mutation: UPDATE_PROJECT_MUTATION,
            variables: {
                id,
                name,
                description,
            },
            update: (cache, { data: { updateProject } }) => {
                console.log(updateProject)
                console.log('Project updating done')
            },
            refetchQueries: [
                {
                    query: ALL_PROJECT_QUERY,
                }
            ]
        })
    })

    /*******************
     *  Update Event
    *******************/
    Bus.$on('updateEvent', payload => {
        let { id, courseName, academicYear, jurysIds, studentsIds, projectsIds } = payload;

        // Update event 
        apolloClient.mutate({
            mutation: UPDATE_EVENT_MUTATION,
            variables: {
                id,
                courseName,
                academicYear,
                jurysIds,
                studentsIds,
                projectsIds,
            },
            update: (cache, { data: { updateEvent } }) => {
                console.log(updateEvent)
                console.log('Event updating done')

                // Get the lastAddedId for implementaiton creation
                store.commit('lastAddedId', updateEvent.id)

                // Foreach implementation in updateEvent delete it
                updateEvent.implementations.forEach(implementation => {
                    let id = implementation.id

                    apolloClient.mutate({
                        mutation: DELETE_IMPLEMENTATIONS_MUTATION,
                        variables: {
                            id,
                        },
                        update: (cache, { data: {deleteImplementation} }) => {
                            console.log(deleteImplementation)
                            console.log('Implementation delete done')
                        }
                    })
                });
                
                // Re create all implementation for choosed project
                studentsIds.forEach(student => {
                    projectsIds.forEach(project => {

                        // Init variable for implementation mutation
                        let weight = 1 / (projectsIds.length),
                            projectId = project,
                            studentsIds = student,
                            softDelete = false,
                            eventId = store.getters.lastAddedId;

                        apolloClient.mutate({
                            mutation: CREATE_IMPLEMENTATIONS_MUTATION,
                            variables: {
                                softDelete,
                                eventId,
                                projectId,
                                studentsIds,
                                weight,
                            },
                            update: (cache, { data: { createImplementation } }) => {
                                console.log(createImplementation)
                                console.log('Implementation creation done')
                            }
                        });
                    });
                });
              
            },
            refetchQueries: [
                {
                    query: ALL_EVENT_QUERY,
                }
            ]
        })
    })

/*******************
 *   Desactivate
*******************/

    /*******************
     *  Desactivate User
    *******************/
    Bus.$on('desactivateUser', payload => {
        let id = payload,
            softDelete = true;

        apolloClient.mutate({
            mutation: DESACTIVATE_USER_MUTATION,
            variables: {
                id,
                softDelete
            },
            update: (cache, { data: { updateUser } }) => {
                console.log(updateUser)
                console.log('User desactivation done')
            },
            refetchQueries: [
                {
                    query: ALL_USER_QUERY,
                }
            ]
        })
    })

    /*******************
     *  Desactivate Student
    *******************/
    Bus.$on('desactivateStudent', payload => {
        let id = payload,
            softDelete = true;

        apolloClient.mutate({
            mutation: DESACTIVATE_STUDENT_MUTATION,
            variables: {
                id,
                softDelete
            },
            update: (cache, { data: { updateStudent } }) => {
                console.log(updateStudent)
                console.log('Student desactivation done')
            },
            refetchQueries: [
                {
                    query: ALL_STUDENT_QUERY,
                }
            ]
        })
    })

    /*******************
     *  Desactivate Event
    *******************/
    Bus.$on('desactivateEvent', payload => {
        let id = payload,
            softDelete = true;

        apolloClient.mutate({
            mutation: DESACTIVATE_EVENT_MUTATION,
            variables: {
                id,
                softDelete
            },
            update: (cache, { data: { updateEvent } }) => {
                console.log(updateEvent)
                console.log('Event desactivation done')
            },
            refetchQueries: [
                {
                    query: ALL_EVENT_QUERY,
                }
            ]
        })
    })

    /*******************
     *  Desactivate Project
    *******************/
    Bus.$on('desactivateProject', payload => {
        let id = payload,
            softDelete = true;

        apolloClient.mutate({
            mutation: DESACTIVATE_PROJECT_MUTATION,
            variables: {
                id,
                softDelete
            },
            update: (cache, { data: { updateProject } }) => {
                console.log(updateProject)
                console.log('Project desactivation done')
            },
            refetchQueries: [
                {
                    query: ALL_PROJECT_QUERY,
                }
            ]
        })
    })

    /*******************
     *  Authenticate User
    *******************/
    Bus.$on('authentification', payload => {
        let { email, password } = payload;
        apolloClient.mutate({
            mutation: LOGIN_USER_MUTATION,
            variables: {
                email,
                password
            },

            update: (cache, { data: { authenticateUser } }) => {
                localStorage.setItem('userToken', authenticateUser.token);
                localStorage.setItem('userId', authenticateUser.id);
                router.push({ name: 'home' });
            },
        });
    })