<template>
<div class="row justify-content-center">
        <div class="col-md-5">
            <h3 class="text-center">Add Contact</h3>
            <form @submit.prevent="addContact">
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" class="form-control" v-model="state.contact.name" required>
                </div>

                <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-control" v-model="state.contact.email" required>
                </div>

                <div class="form-group">
                    <label>Phone</label>
                    <input type="text" class="form-control" v-model="state.contact.phone" required>
                </div>

                <div class="form-group">
                    <button class="btn btn-primary btn-block">Add Contact</button>
                </div>
            </form>

            <h3 class="text-center">Add Contact</h3>
            <form @submit.prevent="searchUser">
                <div class="form-group">
                    <label>Search</label>
                    <input type="text" class="form-control" placeholder="email address/name" v-model="state.searchString" required>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary btn-block">Search</button>
                </div>
            </form>

            <div class="row">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in state.users" :key="user.key">
                                <td>{{ user.firstName }} {{ user.lastName }}</td>
                                <td>{{ user.email }}</td>
                                <td>
                                    <button class="btn btn-danger">Add</button> <!-- @click.prevent="deleteContact(contact.key)"  -->
                                </td>
                            </tr>
                        </tbody>
                    </table>
            </div>



        </div>
    </div>
</template>

<script>

import firebase from "firebase";
import { useRouter } from "vue-router";
import { reactive } from "vue";
import _ from "lodash";

export default {
  setup(){
    
    const router = useRouter();
    const state = reactive({
        contact: {
            name: "",
            email: "",
            phone: "",
        },
        users: [],
        searchString: ""
    });

    const database = firebase.database();

    function searchUser(){
        // console.log('test');

        // database.ref("users").orderByChild("childNode").startAt("[a-zA-Z0-9]*").endAt(searchString)

        // const  itemsRef = database.ref("users").orderByChild("email").startAt(`%${state.searchString}`);
        let queryText = state.searchString;
        const  itemsRef = database.ref("users").orderByChild("email").startAt(queryText).endAt(queryText+"\uf8ff")
        // itemsRef.once('value', function(snapshot) {
        //     snapshot.forEach(function(childSnapshot) {
        //             console.log(childSnapshot.val());
        //     })
        // })
          itemsRef.on('value', (snapshot) => {
              const data = _.filter(snapshot.val(), function(o) { return o.email != firebase.auth.email ; }); //snapshot.val();
              state.users = data;
          });
    }

    function addContact() {
      const contact = {
            name: state.contact.name,
            email: state.contact.email,
            phone: state.contact.phone,
      };
      firebase
        .database()
        .ref("contacts")
        .push(contact);

        alert('Successfully added contact');
        router.push({ name: "Contacts" });
    }

    return{
      state,
      addContact,
      searchUser,
    }
  }
}
</script>

<style lang="scss" scoped>

</style>