<template>
    <router-link to="/contacts">Search Contact</router-link>
    <div class="posts-wrapper">
           <contact-detail v-for="contact in state.contacts" :key="contact.key" :userId="state.userId" :contact="contact" />  <!--  @toggle-favorite="toggleFavorite"/> -->
    </div>
    <!-- <div class="row">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="contact in state.contacts" :key="contact.key">
                        <td>{{ contact.name }}</td>
                        <td>{{ contact.email }}</td>
                        <td>{{ contact.phone }}</td>
                        <td>
                            <router-link :to="{ name:'Chat', params: { key: contact.key }}">Chat </router-link> 
                            <router-link :to="{name: 'EditContact', params: { id: contact.key }}" class="btn btn-primary">Edit </router-link>
                            <button @click.prevent="deleteContact(contact.key)" class="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
    </div> -->
</template>

<script>

import firebase from "firebase";
// import { useRouter } from "vue-router";
import { reactive, onMounted } from "vue";

import ContactDetail from '@/components/ContactDetail'

export default {
    components: {
      ContactDetail
    },
  setup(){
    // const router = useRouter();
    const state = reactive({
        contacts: [],
        userId: "",
    });

    function deleteContact(id){
        if (window.confirm("Do you really want to delete?")) {

        const itemsRef = firebase.database().ref("contacts");
        itemsRef.child(id).remove().then(() => {  
            loadContacts();
            alert("Contact deleted!");
            console.log("Contact deleted!");
        })
        .catch((error) => {
            alert(error);
            console.error(error);
        })
        }
    }

    function loadContacts(userId){
        state.contacts = [];
        const itemRef = firebase.database().ref(`contacts/${userId}`);

         itemRef.on('value', (snapshot) => {
            // const data = snapshot.val();
            // state.contacts = data;
            let _contacts = [];
            snapshot.forEach(function(obj) {
                 const _contact = { 
                    key: obj.key, 
                    username: obj.val().username, 
                    fullName: obj.val().fullName, 
                    email: obj.val().email, 
                }
                _contacts.push(_contact);
            });
            state.contacts = _contacts;

        });
    }

    onMounted(() => {
        // const userId = firebase.auth().currentUser.uid;
        // loadContacts(userId);
         firebase.auth().onAuthStateChanged( (user) => {
            if (user) {
                loadContacts(user.uid);
            } else {
            console.log("No User!");
            }
        });
    })

    return{
      state,
      deleteContact,
    }
  }
}
</script>

<style lang="scss" scoped>

</style>