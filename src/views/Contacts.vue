<template>
    <router-link to="/contacts">Add Contact</router-link>
    <div class="row">
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
    </div>
</template>

<script>

import firebase from "firebase";
// import { useRouter } from "vue-router";
import { reactive, onMounted } from "vue";

export default {
  setup(){
    
    // const router = useRouter();
    const state = reactive({
        contacts: []
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

    function loadContacts(){
        state.contacts = [];
        const itemsRef = firebase.database().ref("contacts");
        itemsRef.once('value', function(snapshot) {
            // var messages = [];

            snapshot.forEach(function(childSnapshot) {
                // var key = childSnapshot.key;
                // var data = childSnapshot.val();
                // console.log(key, data);
                
                 state.contacts.push({
                    key: childSnapshot.key,
                    name: childSnapshot.val().name,
                    email: childSnapshot.val().email,
                    phone: childSnapshot.val().phone
                });
            });
        
        });
    }

    onMounted(() => {
        loadContacts();
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