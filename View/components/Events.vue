<template>
    <div class="wrapper">
        <section class="hero is-link">
            <div class="hero-body">
                <div class="container">
                <h1 class="title">
                    Tous les événements
                </h1>
                <h2 class="subtitle">
                    Primary subtitle
                </h2>
                </div>
            </div>
        </section>
      <div class="papa">
          <div v-for="(event, key) in events" class="enfant">
            <router-link :to="{name: 'event', params: {id: event.id}}" :href="`/event/${event.id}`" class="contenu">
                <div class="flex" v-if="!event.softDelete">
                    <div class="flex__header">
                        <h2 class="title">{{event.courseName}}</h2>
                        <p class="subtitle">{{event.academicYear}}</p>
                    </div>
                    <div class="flex__content">
                        <p class="jurys">{{event.jurys.length}} jurys</p>
                        <p class="students">{{event.students.length}} étudiants</p>
                    </div>
                    <div class="flex__footer">
                        <button class="modify"  @click.prevent="showModifyModal = true; setModifyData(event)">Modifier</button>
                        <button id="show-modal" @click.prevent="showDesactivateModal = true; setDesactivateData(event)">Désactiver</button>
                    </div>
                </div>
            </router-link>
          </div>
      </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: 'events',
    computed: {
        ...mapGetters([
            'events',
        ])
    },
    created(){
        // Events recupeartion
        this.$store.dispatch('setAllEvents');
    }
}
</script>
