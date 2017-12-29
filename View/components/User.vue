<template>
    <div class="container">
        <h1>{{user.name}}</h1>
        <p>{{user.company}}</p>
        <div class="container__jurys jurys">
            <h2>Les événements de {{user.name}}</h2>
        </div>
        <div class="container__students students">
            <h2>Les meetings de {{user.name}}</h2>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import { USER_QUERY } from '../constants/User.gql'
export default {
    name: 'user',
    props: ['id'],
    data(){
        return{
            user: [],
        }
    },
    apollo: {
        user: {
            query: USER_QUERY,
            variables() {
                // Use vue reactive properties
                return {
                    id: this.id,
                }
            },
            update(data){
                return data.User
            }
        },
    },
}
</script>
