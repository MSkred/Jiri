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
  data(){
    return{
      loggedInUserQuery: null,
    }
  },
  components: {
    Navigation,
  },
  updated(){
    this.$apollo.query({
      query: LOGGEDIN_USER_QUERY,
    }).then(data => {
      console.log(data.data.loggedInUser.id);
      var isLoggedIn = () => {
        return data.data.loggedInUser && data.data.loggedInUser.id !== ''
      }
      console.log('Is login');
    }).catch(error => {
      console.log('---Is not loggin' + error);
    });
  }
}
</script>