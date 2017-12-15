<template>
    <div id="app">
        <navigation></navigation>
        <h1>JiriSkuuuurt</h1>
        <router-view></router-view>
    </div>
</template>

<script>
import Navigation from './components/Navigation.vue';

export default {
  name: 'app',
  components: {
    Navigation,
  },
}
</script>