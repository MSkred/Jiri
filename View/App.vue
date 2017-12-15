<template>
    <div id="app">
        <navigation></navigation>
        <h1>JiriSkuuuurt</h1>
        <router-view></router-view>
    </div>
</template>

<script>
import Navigation from './components/Navigation.vue';
import {mapActions} from 'vuex'

export default {
  name: 'app',
  components: {
    Navigation,
  },
  // methods: {
  //     ...mapActions([
  //         'setCurrentUser'
  //     ])
  // },
  // created() {
  //     this.$store.dispatch('setCurrentUser')
  // }
}
</script>