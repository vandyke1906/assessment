<template>
    <!-- <div class="contact-item" @click="mfavoritecontact(contact.id)"> -->
    <div class="contact-item">
        <div class="contact">
            <div class="contact-header">
                <strong> @{{ contact.username }} </strong>
            </div>
            <div class="contact-content">
                {{ contact.fullName }}
            </div>
            <div class="contact-footer">
                {{ contact.email }}
            </div>
            
            <router-link :to="{ name:'Chat', params: { key: contact.key }}">Chat </router-link> 
        </div>
    </div>
</template>

<script>
import {  } from 'vue';
export default {
    name: "contactItem",
    props: {  
        userId: { type: String, required: true },
        contact: {type: Object, required: true,}
    },
    setup(){
        return {
            // mfavoritecontact,
        }
    }
}
</script>

<style lang="scss" scoped>
.contact-item{
    display: flex;
    margin:10px;
    padding: 10px;
    border: 1px solid gray;
    border-radius: 5px;
    box-sizing: border-box;
    cursor: pointer;
    transition: all 0.25s ease;

    &:hover{
        transform: scale(1.02, 1.02);
    }
}

</style>