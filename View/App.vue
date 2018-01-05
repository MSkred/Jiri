<template>
    <div id="app">
        <navigation></navigation>
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
<style lang="sass">
.wrapper 
    padding: 0;

.papa
    display: flex
    flex-direction: row
    justify-content: flex-start
    flex-wrap: wrap
    margin: 0 50px

.enfant
    width: 32%;
    //background-color: #5182d2;
    margin: 20px 0;
    padding: 20px;
    &:nth-child(3n+2)
        margin: 20px;


.contenu
    color: #ffffff;
    .title, .subtitle
        color: #fff;

</style>