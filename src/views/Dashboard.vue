<template>
    <div class="user-profile">
        <div class="user-panel">
            <h1> {{ fullName }}</h1>
            <p>(@{{ state.user.username }}) </p>
            <div class="badge" v-if="state.user.isAdmin">Admin</div>
            <div class="follower-count">
                <strong>Followers: </strong> {{ followers }}
            </div>

            <create-post-panel @add-post="addNewPost"/>
        </div>
        
    <div class="posts-wrapper">
            <post-item v-for="post in state.user.posts" :key="post.key" :username="state.user.username" :post="post" @toggle-favorite="toggleFavorite"/>
    </div>


    </div>
</template>
<script>
import { reactive, onMounted } from 'vue';
// import { useRoute } from 'vue-router';
import firebase from "firebase";

import PostItem from '../components/PostItem';
import CreatePostPanel from '../components/CreatePostPanel.vue';

export default {
    name: "UserProfile",
    components: {
        PostItem,
        CreatePostPanel,
    }, 
    setup(){
        //###
        // const route = useRoute();
      const userId = "userId";
      const database = firebase.database();

        //###
        const state = reactive({
            followers: 0,
            user: []
        });

        //###
        const fullName = `Ronie Penara`;

        function loadUserDetails(){
          let userId = "-MWWyf1bW1ib3anKqywc";  //should be set once login
          var itemRef = database.ref('users/'+userId);
          itemRef.on('value', (snapshot) => {
              const data = snapshot.val();
              state.user = data;
          });
        }

        //###
        function toggleFavorite(id){ 
            console.log("Toggle with id " + id);
        }

        //###
        function addNewPost(content){
            state.user.posts.unshift(
                {
                    id: state.user.posts.length +1,
                    content: content,
                }
            )
        }

        onMounted(() => {
          console.log(firebase.auth().currentUser.uid);
          loadUserDetails();
        })

        return {
            userId,
            state,
            fullName,
            toggleFavorite,
            addNewPost,
        };
    }
}
</script>

<style lang="scss" scoped>
    
    .user-profile{
        display: grid;
        text-align: start;
        grid-template-columns: 1fr 3fr;
        grid-gap: 50px;
        padding: 50px 5%;


    .user-panel{
        display: flex;
        flex-direction: column;
        margin-right: 50px;
        padding: 20px;
        background: #ffffff;
        border-radius: 5px;
        border: 1px solid #cccccc;
    }

    h1{
        margin: 0;
    }

    .posts-wrapper{
        display: grid;
        grid-gap: 10px;
        padding:10px;
    }

    .badge{
        padding: 5px;
        background-color: darkorange;
    }


    }

</style>
