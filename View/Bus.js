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
import { STUDENT_QUERY } from './constants/Student.gql'
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
import { UPDATE_IMPLEMENTATION_MUTATION } from './constants/ImplementationsUpdate.gql'

// Meetings query
import { CREATE_MEETING_MUTATION } from './constants/MeetingsCreate.gql'
import { UPDATE_MEETING_MUTATION } from './constants/MeetingsUpdate.gql'

// Scores query 
import { CREATE_SCORE_MUTATION } from './constants/ScoresCreate.gql'
import { UPDATE_SCORE_MUTATION } from './constants/ScoresUpdate.gql'

import { create } from 'domain';

export const Bus = new Vue();

/*******************
 *   Creation
*******************/

    /*******************
     *  Create User
    *******************/
    Bus.$on('createUser', payload => {
        store.commit('appIsLoading')
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
                store.commit('appIsDone')
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
        store.commit('appIsLoading')
        let { email, name, softDelete } = payload;

        apolloClient.mutate({
            mutation: CREATE_STUDENT_MUTATION,
            variables: {
                email,
                name,
                softDelete
            },
            update: (cache, { data: { createStudent } }) => {
                store.commit('appIsDone')
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
        store.commit('appIsLoading')
        let { description, name, softDelete, weight } = payload;

        apolloClient.mutate({
            mutation: CREATE_PROJECT_MUTATION,
            variables: {
                description,
                name,
                softDelete,
                weight
            },
            update: (cache, { data: { createProject } }) => {
                store.commit('appIsDone')
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
        store.commit('appIsLoading')
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
                        let projectId = project,
                            studentId = student,
                            softDelete = false,
                            eventsIds = store.getters.lastAddedId,
                            weight;

                        createEvent.projects.forEach(projectID => {
                            if(projectID.id === project){
                                weight = projectID.weight;
                            }
                        });

                        apolloClient.mutate({
                            mutation: CREATE_IMPLEMENTATIONS_MUTATION,
                            variables: {
                                softDelete,
                                eventsIds,
                                projectId,
                                studentId,
                                weight,
                            },
                            update: (cache, { data: { createImplementation } }) => {
                                console.log(createImplementation)
                                console.log('Implementation creation done')
                            }
                        });
                    });
                });
                router.push({ name: 'events' });
                store.commit('appIsDone')
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
        store.commit('appIsLoading')
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
                // Put meeting data in store
                store.commit('meeting', createMeeting)
            
                // Redirection on create meeting view
                location.assign(`/event/${eventId}/meeting/${store.getters.lastAddedId}/student/${studentId}`);
                store.commit('appIsDone')
            }
        });
    })
    /*******************
     *  Create Score
    *******************/
    Bus.$on('createScore', payload => {
        store.commit('appIsLoading')
        let { meetingId, softDelete, implementationId, comment, score, eventIds  } = payload;

        apolloClient.mutate({
            mutation: CREATE_SCORE_MUTATION,
            variables: {
                meetingId,
                softDelete,
                implementationId,
                comment,
                score,
                eventIds
            },
            update: (cache, { data: { createScore } }) => {
                store.commit('appIsDone')
            },
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
        let { id, name, description, weight } = payload;

        apolloClient.mutate({
            mutation: UPDATE_PROJECT_MUTATION,
            variables: {
                id,
                name,
                description,
                weight
            },
            update: (cache, { data: { updateProject } }) => {
            },
            refetchQueries: [
                {
                    query: ALL_PROJECT_QUERY,
                }
            ]
        })
    })

    /*******************
     *  Update Implementation
    *******************/
    Bus.$on('modifyImplementation', payload => {
        let { id, weight, studentId, urlRepo, urlProject } = payload;

        apolloClient.mutate({
            mutation: UPDATE_IMPLEMENTATION_MUTATION,
            variables: {
                id,
                weight,
                urlProject,
                urlRepo
            },
            update: (cache, { data: { updateImplementation } }) => {
            
            },
            refetchQueries: [
                {
                    query: STUDENT_QUERY,
                    variables:{
                        id: studentId
                    }
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
     *  Update Meeting
    *******************/
    Bus.$on('validateMeeting', payload => {
        store.commit('appIsLoading')
        let { id, comment, evaluation } = payload;

        apolloClient.mutate({
            mutation: UPDATE_MEETING_MUTATION,
            variables: {
                id,
                comment,
                evaluation
            },
            update: (cache, { data: { updateMeeting } }) => {
                store.commit('appIsDone')
                router.push({ name: 'home' });
            },
        })
    })
    /*******************
     *  Update Score
    *******************/
    Bus.$on('updateScore', payload => {
        let { id, comment, score } = payload;

        apolloClient.mutate({
            mutation: UPDATE_SCORE_MUTATION,
            variables: {
                id,
                comment,
                score,
            },
            update: (cache, { data: { updateScore } }) => {
            },
        });
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
        store.commit('appIsLoading')
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
                store.commit('appIsDone')
            },
        }).catch(e => {
            Bus.$emit('loginError', "L'adresse email ou le mot de passe de l'utilisateur est incorrect. Corrigez pour réessayer")
            store.commit('appIsDone')
        });
    })