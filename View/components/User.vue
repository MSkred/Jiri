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
export default {
    name: 'user',
    props: ['id'],
    computed: {
        ...mapGetters([
            'user',
        ])
    },
    created(){
        // user recupeartion
        this.$store.dispatch('setUser', this.id);
    }
}
</script>
