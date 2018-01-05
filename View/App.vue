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
<style>
    .wrapper{
        padding: 0;
    }
    .papa{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        flex-wrap: wrap; 
        margin: 0 50px; 
    }
    .enfant{
        width: 32%;
        background-color: #5182d2;
        margin: 20px 0;
        padding: 20px;
    }
    .contenu .title,
    .contenu .subtitle{
        color: #fff;
    }
    .enfant:nth-child(3n+2){
        margin: 20px;
    }
    .contenu{
        color: #ffffff;
    }
    .flex__header{
        margin: 0 0 36px 0;
    }
    .flex__content{
        margin: 0 0 48px 0;
    }
    .flex__footer{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        flex-wrap: wrap; 
    }
    .flex__footer button{
        text-decoration: none;
        border: none;
        background: none;
        color: #9bbbec;
        text-transform: uppercase;
        font-weight: 750;
        width: 50%;
        text-align: left;
    }
    .flex__footer button+button{
        text-align: right;
    }
    .flex__footer button:hover{
        cursor: pointer;
        text-decoration: underline;
    }
</style>