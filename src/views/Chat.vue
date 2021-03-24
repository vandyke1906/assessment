<template>
  <div id="app">
    <!-- Chat section -->
    <div class="message-body mt-3">
      <h3>Chat with {{ state.contactUser.username }}</h3>
      <h5>Welcome {{ state.currentUser.username }}!</h5>
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
import _ from "lodash";

export default {
  setup(){
    const route = useRoute();
    // const router = useRouter();
    const state = reactive({
      // from: "-MWWyf1bW1ib3anKqywc",
      // to: "",
      currentUser: [],
      contactUser: [],
      showMessage: "",
      messages: [],
    });

    const database = firebase.database();
    const messaging = firebase.messaging();
    

    // mounted
    onMounted(() => {      
      state.to = route.params.key;
      // getUser(route.params.key);

      //console.log(firebase.auth().currentUser.uid);
      const currentUid = firebase.auth().currentUser.uid;

      getUser(currentUid).then((snapshot) => {
          state.currentUser = snapshot.val(); 
        }
      );

      getUser(route.params.key).then((snapshot) => {
          state.contactUser = snapshot.val(); 
        }
      );
      

      messaging.getToken();
      // console.log('token do usuário:', token);
    
      const itemsRef = firebase.database().ref("messages");
        itemsRef.once('value', function(snapshot) {

        snapshot.forEach(function(childSnapshot) {
          var date = new Date(childSnapshot.val().time);
          // console.log(childSnapshot.val());
          state.messages.push({ 
            // key: childSnapshot.key, 
            // from: childSnapshot.val().from, 
            // to: childSnapshot.val().to, 
            username: childSnapshot.val().username,
            message: childSnapshot.val().message,
            time: date.toLocaleString("en-US"),
          });
        });

          // state.messages = messages;
      });
      
    })

    function getUser(id){
      var itemRef = database.ref('users/'+id);
      return itemRef.once('value');
    }




    
    function sendMessage() {
      
      // // const chatData = {username: state.currentUser.username, username: state.contactUser.username};
      // const chatData = [state.currentUser.username, state.contactUser.username];
     
      // const msgData = {
      //   username: state.currentUser.username,
      //   time: Date.now(),
      //   message: state.showMessage,
      // };

      // var chatKey = database.ref('chats/').push().key;
      // var conversationKey = database.ref(`/messages/${chatKey}/`).push().key;
      // var updates = {};
      // updates[`/chats/${chatKey}/members`] = chatData;
      // updates[`/messages/${chatKey}/${conversationKey}`] = msgData;
      // database.ref().update(updates);



        // const  itemsRef = database.ref("members");
        // itemsRef.on('child_added', (snapshot) => {
        //     snapshot.forEach(function(obj) {
        //       console.log(obj.val());
        //       // _.isEqual();
        //     });

        //   });



        let _key = null;
        const currentUserArray = [state.currentUser.username, state.contactUser.username];
        var ref = database.ref("chats");
        ref.orderByChild('members').on("child_added", function(snapshot) {
          if  (_.isEqual(snapshot.val().members, currentUserArray )) _key = snapshot.key;
          console.log(_key);
        });

      
        const msgData = {
          username: state.currentUser.username,
          time: Date.now(),
          message: state.showMessage,
        };

        var chatKey = (!_key) ?  database.ref('chats/').push().key : _key;
        var conversationKey = database.ref(`/messages/${chatKey}/`).push().key;
        var updates = {};
        updates[`/chats/${chatKey}/members`] = currentUserArray;
        updates[`/messages/${chatKey}/${conversationKey}`] = msgData;
        database.ref().update(updates);




      // const  itemsRef = database.ref("chats").orderByChild("email").startAt(queryText).endAt(queryText+"\uf8ff")

      // const msgData = {
      //   // from: state.from,
      //   // to: state.to,
      //   username: state.currentUser.username,
      //   time: Date.now(),
      //   message: state.showMessage,
      // };

      // database.ref('messages').set(msgData);
      //database.ref('messages/').set(msgData);
      
      // Get a key for a new Post.
      // database.ref().child('messages').push(msgData).key;
      // var newMsgKey = 
      // database.ref('messages').push(msgData).key;
      // var updates = {};
      // updates['/messages/' + newMsgKey] = msgData;
      // // updates['/posts/' + newPostKey] = postData;
      // // updates['/user-posts/' + uid + '/' + newPostKey] = postData;

      // firebase.database().ref().update(updates);




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