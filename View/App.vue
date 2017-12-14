<template>
    <div id="app">
        <navigation></navigation>
        <h1>JiriSkuuuurt</h1>
        <router-view></router-view>
    </div>
</template>

<script>
import Navigation from './components/Navigation.vue';
import { LOGGEDIN_USER_QUERY } from './constants/UsersLoggedIn.gql'

export default {
  name: 'app',
  components: {
    Navigation,
  },
  methods: {
    loggedIn(data){
      return data.data.loggedInUser && data.data.loggedInUser.id !== ''
    }
  },
  created(){
    this.$apollo.query({
      query: LOGGEDIN_USER_QUERY,
    }).then(data => {
      // Check if user isn't login and redirect else add userId state
      if(this.loggedIn(data) === null){
        this.$router.push('login');
      }else{
        return this.userId = data.data.loggedInUser.id;
      }
      console.log('created Is login');
    }).catch(error => {
      console.log('---created Is not loggin ' + error);
    });
  },
  updated(){
    this.$apollo.query({
      query: LOGGEDIN_USER_QUERY,
    }).then(data => {      
      // Check if user isn't login and redirect else add userId state
      if(this.loggedIn(data) === null){
        this.$router.push('login');        
      }else{
        return this.userId = data.data.loggedInUser.id;
      }
      console.log('Updated Is login');
    }).catch(error => {
      console.log('---Updated Is not loggin ' + error);
    });
  }
}
</script>