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
            <!-- <p>{{message}}</p> -->
            <p class="message pt-1"><span class="mg-text">{{ message.username }}: ({{ message.time }})</span>{{ message.message }}</p>
          </div>
        </div>
      </div>
      <label>message</label>
      <input v-model="state.newMessage" type="text" class="mt-3 mr-2 pl-2 pr-2" />
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
      newMessage: "",
      messages: [],
      chatKey: null,
    });

    const database = firebase.database();
    const messaging = firebase.messaging();
    
   
    // mounted
    onMounted(() => {      
      state.to = route.params.key;

      firebase.auth().onAuthStateChanged( (user) => {
        if (user) {

          //get currentUserObject
          getUserDetails(user.uid).then((snapshot) => {
              state.currentUser = snapshot.val();

              //get contactUser
              getUserDetails(route.params.key).then((snapshot) => {
                  state.contactUser = snapshot.val(); 


            // state.chatKey = (_.isEmpty(state.chatKey)) ?  null: state.chatKey;
              

            //getChatKeys
            database.ref("chats").orderByChild('members').on("child_added", (membersSnapShot) => { 
              
              const currentUserArray = [state.currentUser.username, state.contactUser.username];
              
              console.log(membersSnapShot.val().members, currentUserArray, _.isEqual(membersSnapShot.val().members, currentUserArray));

              if (_.isEqual(membersSnapShot.val().members, currentUserArray)){
                
                state.chatKey = membersSnapShot.key;
                console.log("inside if", membersSnapShot.key);

                //iterate messages thru given key
                firebase.database().ref(`messages/${membersSnapShot.key}`).on('value', function(snapshot) {
                  state.messages = [];
                  
                  snapshot.forEach(function(childSnapshot) {
                    var date = new Date(childSnapshot.val().time);
                    state.messages.push({ 
                      username: childSnapshot.val().username,
                      message: childSnapshot.val().message,
                      time: date.toLocaleString("en-US"),
                    });
                  });
                  // return;
                });
                //iterate messages thru given key

              } //end of if statement
            });



              //getChatKey
              // getChatKey().then((snapshot) => {

                
              //   // console.log(snapshot.key, state.currentUser.username, state.contactUser.username);
              //   // console.log(snapshot.key, snapshot.val().members);
              //   // console.log(_.isEqual(snapshot.val().members, currentUserArray));
              //   // console.log("test", snapshot);
              //   console.log("test", snapshot.val());
              //   // const currentUserArray = [state.currentUser.username, state.contactUser.username];


              //   // if (_.isEqual(snapshot.val().members, currentUserArray)){
                  
              //   //   state.chatKey = snapshot.key;
              //   //   console.log("key", snapshot.key);

              //   //   firebase.database().ref(`messages/${snapshot.key}`).on('value', function(snapshot) {
              //   //     // console.log(snapshot.val().members);

              //   //     // state.chatKey = snapshot.key;
              //   //     state.messages = [];
              //   //     // console.log(snapshot.key, state.currentUser.username, state.contactUser.username);
              //   //     // [state.currentUser.username, state.contactUser.username];
              //   //     // if (_.isEqual(snapshot.val().members, currentUserArray)){
                    
              //   //     snapshot.forEach(function(childSnapshot) {
              //   //       var date = new Date(childSnapshot.val().time);
              //   //       state.messages.push({ 
              //   //         // key: childSnapshot.key, 
              //   //         // from: childSnapshot.val().from, 
              //   //         // to: childSnapshot.val().to, 
              //   //         username: childSnapshot.val().username,
              //   //         message: childSnapshot.val().message,
              //   //         time: date.toLocaleString("en-US"),
              //   //       });
              //   //     });
                    
              //   //   });

              //   // } //end of if statement







              //   // firebase.database().ref(`messages`).on('value', () => {
              //   //   console.log(snapshot.val().members);
              //   // });

              //   // const itemsRef = firebase.database().ref(`messages/${snapshot.key}`);
              //   // itemsRef.on('value', function(snapshot) {
              //   //   console.log(snapshot.val().members);

              //   //   // state.chatKey = snapshot.key;
              //   //   state.messages = [];
              //   //   console.log(snapshot.key, state.currentUser.username, state.contactUser.username);
              //   //   // [state.currentUser.username, state.contactUser.username];
              //   //   // if (_.isEqual(snapshot.val().members, currentUserArray)){
                  
              //   //   snapshot.forEach(function(childSnapshot) {
              //   //     var date = new Date(childSnapshot.val().time);
              //   //     state.messages.push({ 
              //   //       // key: childSnapshot.key, 
              //   //       // from: childSnapshot.val().from, 
              //   //       // to: childSnapshot.val().to, 
              //   //       username: childSnapshot.val().username,
              //   //       message: childSnapshot.val().message,
              //   //       time: date.toLocaleString("en-US"),
              //   //     });
              //   //   });
                  
              //   // });

              // })
              // .catch((e) =>
              //   console.log(e)
              // );
              //getChatKey


              });//get contactUser

            });//get currentUserObject
          
        } else {
          console.log("No User!");
        }
      });


      messaging.getToken();

            
    })//end onMounted

    // function getUser(id){
    //   var itemRef = database.ref('users/'+id);
    //   return itemRef.once('value');
    // }

     async function getUserDetails(id){
      var itemRef = database.ref(`users/${id}`);
        return await itemRef.once("value", (snapshot) => {
          return snapshot;
        });
    }


    // function getChatKey(){
    //     var ref = database.ref("chats");
    //     return ref.orderByChild('members').once("child_added")
    // }

    // async function getChatKey(){
    //     var ref = database.ref("chats");
    //     return await ref.orderByChild('members').once("child_added", (snapshot) => {
    //       return snapshot;
    //     });
    // }

    // async function getChatKey(){
    //     var ref = database.ref("chats");
    //     // return await ref.orderByChild('members').on("value", (snapshot) => {
    //     //   return snapshot;
    //     // });
    //     return await ref.orderByChild('members').on("child_added").then;

    //     // ref.on("value", function(snapshot) {
    //     //   console.log(snapshot.val());
    //     // }, function (errorObject) {
    //     //   console.log("The read failed: " + errorObject.code);
    //     // });
    // }

    




    
    function sendMessage() {
      
      // message data
      const msgData = {
        username: state.currentUser.username,
        time: Date.now(),
        message: state.newMessage,
      };
        
        const currentUserArray = [state.currentUser.username, state.contactUser.username];
        var chatKey = (_.isEmpty(state.chatKey)) ?  database.ref('chats/').push().key : state.chatKey;
        var conversationKey = database.ref(`/messages/${chatKey}/`).push().key;
        var updates = {};
        updates[`/chats/${chatKey}/members`] = currentUserArray;
        updates[`/messages/${chatKey}/${conversationKey}`] = msgData;
        database.ref().update(updates);

        // state.newMessage = "";

      // console.log(state.chatKey);

      // // console.log(state.chatKey);
      // console.log(_.toUpper("sdad"));


        // console.log(state.chatKey, currentUserArray);
        // console.log(_.toUpper("roniE"));
        
        // getChatKey().then((snapshot) => {
        //     let _key = snapshot.key;
        //     console.log(_key, currentUserArray);
        //     if (_.isEqual(snapshot.val().members, currentUserArray)){
              
        //       //message data
        //       const msgData = {
        //         username: state.currentUser.username,
        //         time: Date.now(),
        //         message: state.newMessage,
        //       };


        //       // const chatKey = snapshot.key;
        //       var chatKey = (!_key) ?  database.ref('chats/').push().key : _key;
        //       var conversationKey = database.ref(`/messages/${chatKey}/`).push().key;
        //       var updates = {};
        //       updates[`/chats/${chatKey}/members`] = currentUserArray;
        //       updates[`/messages/${chatKey}/${conversationKey}`] = msgData;
        //       database.ref().update(updates);


        //       state.newMessage = "";

        //     }
        // });





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