<template>
    <div>
        <v-btn icon @click="likeIt">
            <v-icon :color="color">{{ icons.mdiHeart }}</v-icon> {{ count }}
        </v-btn>
    </div>
</template>

<script>
import { mdiHeart } from '@mdi/js';

export default {
    props: ['content'],
    data(){
        return {
            icons: {
                mdiHeart
            },
            liked: this.content.liked,
            count: this.content.like_count
        }
    },

    computed: {
        color(){
            return this.liked ? 'red' : 'red lighten-4';
        }
    },

    methods: {
        likeIt(){
            if(User.loggedIn()){
                this.liked ? this.decr() : this.incr();
                this.liked = !this.liked;
            }
        },

        incr(){
            axios.post(`/api/like/${this.content.id}`)
            .then(res => this.count ++ )
            .catch(error => console.log(error));
        },

        decr(){
            axios.delete(`/api/like/${this.content.id}`)
            .then(res => this.count -- )
            .catch(error => console.log(error));
        }
    }
}

</script>