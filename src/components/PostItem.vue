<template>
    <div class="post-item" @click="mfavoritepost(post.id)">
        <div class="post">
            <div class="user">
                <strong> @{{ username }} </strong>
            </div>
            <div class="post-content">
                {{ post.content }}
            </div>
        </div>
    </div>
</template>

<script>
import { } from 'vue';
export default {
    name: "postItem",
    props: {
        username: {
            type: String,
            required: true,
        },
        post: {
            type: Object,
            required: true,
        }
    },
    setup(props, ctx){
        //###
        function mfavoritepost(id){
            ctx.emit('toggle-favorite', id);
        }

        return {
            mfavoritepost,
        }
    }
    // methods: {
    //     mfavoritepost(id){
    //         this.$emit('toggle-favorite', id);
    //     }
    // }
}
</script>

<style lang="scss" scoped>
.post-item{
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