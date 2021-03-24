<template>
  <div id="app">
    <!-- Chat section -->
    <div class="message-body mt-3">
      <h3>Chat</h3>
      <h5>Welcome {{ state.name }}!</h5>
      <div class="card">
        <div class="card-body">
          <div
            class="border pl-2 pt-1 ml-2 message-text mb-2"
            v-for="message in state.messages"
            :key="message.key"
          >
            
            <p class="message pt-1"><span class="mg-text">{{ message.name }}: ({{ message.time }})</span>{{ message.text }}</p>
          </div>
        </div>
      </div>
      <label>message</label>
      <input v-model="state.showMessage" type="text" class="mt-3 mr-2 pl-2 pr-2" />
      <button class="btn btn-primary" @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script>

import firebase from "firebase";
import { useRoute } from "vue-router";
import { reactive, onMounted } from "vue";

export default {
  setup(){
    
    const route = useRoute();
    // const router = useRouter();
    const state = reactive({
      from: "-MWWyf1bW1ib3anKqywc",
      to: "",
      showMessage: "",
      messages: [],
    });

    const database = firebase.database();
    const messaging = firebase.messaging();
    

    // mounted
    onMounted(() => {      
      state.to = route.params.key;

      getUser(route.params.key);

      messaging.getToken();
      // console.log('token do usuário:', token);
    
      const itemsRef = firebase.database().ref("messages");
        itemsRef.once('value', function(snapshot) {

        snapshot.forEach(function(childSnapshot) {
          var date = new Date(childSnapshot.val().time);
          // console.log(childSnapshot.val());
          state.messages.push({ 
            key: childSnapshot.key, 
            from: childSnapshot.val().from, 
            to: childSnapshot.val().to, 
            text: childSnapshot.val().text,
            time: date.toLocaleString("en-US"),
          });
        });

          // state.messages = messages;
      });
      
    })

    function getUser(id){
      console.log(id);
      var itemRef = database.ref('users/'+id);
      itemRef.on('value', (snapshot) => {
          const data = snapshot.val();
          // state.contact = data;
          console.log(data);
      });
    }
    
    function sendMessage() {
      const message = {
        from: state.from,
        to: state.to,
        time: Date.now(),
        text: state.showMessage,
      };
      database.ref('messages').push(message);



      state.showMessage = "";

      // const user1 = {
      //       username: "admin",
      //       "firstName": "Ronie",
      //       lastName: "Penara",
      //       email: "admin@email.com",
      //       isAdmin: true,
      //       posts: [
      //           { content: "content one is here"},
      //           { content: "content two is here"},
      //           { content: "content three is here"},
      //           { content: "content four is here"},
      //           { content: "content five is here"},
      //       ]
      //   };
      //   const user2 = {
      //     id: 2,
      //       username: "user2",
      //       firstName: "User",
      //       lastName: "Two",
      //       email: "admin2@email.com",
      //       isAdmin: true,
      //       posts: [
      //           { content: "content one is here"},
      //           { content: "content two is here"},
      //       ]
      //   };
      //   const user3 = {
      //        id: 3,
      //           username: "user3",
      //           firstName: "User",
      //           lastName: "Three",
      //           email: "admin3@email.com",
      //           isAdmin: true,
      //           posts: [
      //               { content: "content one is here"},
      //               { content: "content two is here"},
      //               { content: "content three is here"},
      //           ]
      //   };
      //   const user4 = {
      //       "firstName": "Ronie",
      //       lastName: "Penara",
      //       email: "admin@email.com",
      //       isAdmin: true,
      //       posts: [
      //           { content: "content one is here"},
      //           { content: "content two is here"},
      //           { content: "content three is here"},
      //           { content: "content four is here"},
      //           { content: "content five is here"},
      //       ]
      //   };
            

      //   database.ref('users').push(user1);
      //   database.ref('users').push(user2);
      //   database.ref('users').push(user3);
      //   database.ref('users').push(user4);




    }

    return{
      state,
      sendMessage,
    }
  }
}
</script>

<style lang="scss" scoped>

</style>