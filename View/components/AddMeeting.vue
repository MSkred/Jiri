<template>
    <div class="container">
        <h1>Créer un meeting</h1>
        <form id="msform">
            <fieldset>
                <h2 class="fs-title">Choisissez un étudiant</h2>
                <h3 class="fs-subtitle">Ceci est l'étape 1</h3>
                <label for="students">Sélectionnez un étudiant</label>
                <select name="students" id="students" v-model="studentId">
                    <option value="null">Aucun étudiant sélectionné</option>
                    <option v-for="(student, key) in event.students" :value="student.id">{{student.name}}</option>
                </select>
            </fieldset>
            <fieldset>
                <h2 class="fs-title">Ajoutez les projets</h2>
                <h3 class="fs-subtitle">Ceci est l'étape 2</h3>
                <label for="project">Sélectionnez les projets</label>
                <label v-for="(project, key) in event.projects" :value="project.id" :key="project.id" class="form-check">
                    <!-- Add project -->
                    <input @click.prevent="addProject(key)" v-model="projects" :value="project.id" type="checkbox" class="form-check-input">{{project.name}}</input>
                </label>
                <input type="button" name="previous" class="previous action-button" value="Previous" />
                <input type="button" name="next" class="next action-button" value="Next" />
            </fieldset>
        </form>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: 'add-meeting',
    props: ['id'], 
    data(){
        return{
            studentId: null,
            projects: [],
        }
    },
    computed: {
        ...mapGetters([
            'event',
        ])
    },
    methods: {
        addProject(key){
            this.projects.push( this.event.projects[key].id );
        },
        removeProject(key){
        }
    },
    created(){
        // Event recupeartion
        this.$store.dispatch('setEvent', this.id);
    }
}
</script>

