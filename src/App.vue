<template>
<div id="nav">
    <router-link to="/dashboard"> Dashboard </router-link> 
    <router-link to="/contacts/list"> Contacts </router-link> 
    <!-- <router-link to="/chat">Chat</router-link> | -->
    <a href="#" @click="logout"> Logout </a> |


    <router-link to="/"> Login </router-link> 
    <router-link to="/register" > Register </router-link> 
</div>

  <router-view />
  
</template>

<script>
import firebase from 'firebase';
import { useRouter } from "vue-router";
import { reactive } from 'vue';

export default {
    setup(){

      const state = reactive({
        isLoggedOut: false,
      });
      
      const router = useRouter();
    
      function logout() {
        firebase
          .auth()
          .signOut()
          .then(() => {
              // alert('Successfully logged out');
               router.push({ name: "login" });
          })
          .catch(error => {
              alert(error.message);
               router.push({ name: "login" });
          });
        }

      return {
        state,
        logout,
      }
    }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  
  & a{
    padding: 10px;
    text-decoration: none;
  }
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

input {   
  margin-right: 20px; 
}

</style>
