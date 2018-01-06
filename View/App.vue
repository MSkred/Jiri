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

.enfant
    width: 25%;
    padding: 20px;
    @media (max-width: 1550px)
        width: 33%
    @media (max-width: 1050px)
        width: 50%
    @media (max-width: 720px)
        width: 100%


.contenu
    color: #ffffff;
    .title, .subtitle
        color: #fff;

.hero.is-link
    background-color: #448aff;  

.navbar.is-link
    background-color: #448aff;

@media (max-width: 1050px)
    #app .navbar-item, #app .navbar-link
        color: #FFF
    #app .navbar-dropdown .navbar-item
        color: #FFF
    #app .navbar-link:hover,
    #app .navbar-end .navbar-item:hover,
    #app .navbar-start .router-link-active:hover,
    #app .navbar-dropdown .navbar-item:hover
        background: #2366d1
            
</style>