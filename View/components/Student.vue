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
export default {
    name: 'student',
    props: ['id'],
    computed: {
        ...mapGetters([
            'student',
        ])
    },
    created(){
        // student recupeartion
        this.$store.dispatch('setStudent', this.id);
    }
}
</script>
