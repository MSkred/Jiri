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
.zoom-move
   transition: transform .3s cubic-bezier(.25,.8,.50,1);
 
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
    button
        margin-top: 50px
        margin-left: 0

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

form
    width: 80%
    margin: 50px auto 
    max-width: 800px
    .form-group
        margin-top: 50px
    .ui-button
        margin: 50px auto 0
        display: block

.vue-form-wizard
    .wizard-nav,
    .wizard-progress-with-circle,
    .wizard-card-footer
        max-width: 1000px
        margin: 0 auto
    .wizard-tab-content
        width: 80%
        margin: 50px auto 
        max-width: 800px

tbody
    tr
        &:hover 
            background: #f8f8f8

.v-spinner
    box-sizing: border-box;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;

.tabsIsEmpty  
    margin-top: 50px;
</style>