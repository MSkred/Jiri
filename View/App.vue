<template>
    <div id="app" :user-id="userId">
        <navigation :user-id="userId"></navigation>
        <h1>JiriSkuuuurt</h1>
        <router-view :user-id="userId"></router-view>
    </div>
</template>

<script>
import Navigation from './components/Navigation.vue';
import { LOGGEDIN_USER_QUERY } from './constants/UsersLoggedIn.gql'

export default {
  name: 'app',
  data(){
    return{
      userId: null,
    }
  },
  components: {
    Navigation,
  },
  created(){
    this.$apollo.query({
      query: LOGGEDIN_USER_QUERY,
    }).then(data => {
      console.log(data.data.loggedInUser.id);
      if(data.data.loggedInUser){
        return this.userId = data.data.loggedInUser.id;
      }
      console.log('created Is login');
      var isLoggedIn = () => {
        return data.data.loggedInUser && data.data.loggedInUser.id !== ''
      }
    }).catch(error => {
      console.log('---created Is not loggin ' + error);
    });
  },
  updated(){
    this.$apollo.query({
      query: LOGGEDIN_USER_QUERY,
    }).then(data => {      
      console.log(data.data.loggedInUser.id);
      if(data.data.loggedInUser){
       this.userId = data.data.loggedInUser.id;
      }
      // else{
      //   return this.userId = null;
      // }
      console.log('Updated Is login');
      var isLoggedIn = () => {
        return data.data.loggedInUser && data.data.loggedInUser.id !== ''
      }
    }).catch(error => {
      console.log('---Updated Is not loggin ' + error);
    });
  }
}
</script>