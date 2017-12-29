<template>
    <div class="container">
        <h1>{{student.name}}</h1>
        <p>{{student.company}}</p>
        <div class="container__jurys jurys">
            <h2>Les événements de {{student.name}}</h2>
        </div>
        <div class="container__students students">
            <h2>Les implémentations de {{student.name}}</h2>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import { STUDENT_QUERY } from '../constants/Student.gql'

export default {
    name: 'student',
    props: ['id'],
    data(){
        return{
            student: [],
        }
    },
    apollo: {
        student: {
            query: STUDENT_QUERY,
            variables() {
                // Use vue reactive properties
                return {
                    id: this.id,
                }
            },
            update(data){
                return data.Student
            }
        },
    },
}
</script>
