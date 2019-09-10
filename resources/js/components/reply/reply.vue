<template>
    <div class="mt-3">
        <v-card>
            <v-card-title>
                <div>{{ data.user }}</div>
                <div class="ml-2 grey--text subtitle-1">said {{ data.created_at }}</div>
                <v-spacer></v-spacer>
                <like :content="data"></like>
            </v-card-title>
            <v-divider></v-divider>

            <edit-reply 
                v-if="editing"
                :reply="data">
            </edit-reply>
            <v-card-text v-else v-html="reply"></v-card-text>

            <v-divider></v-divider>
            <div v-if="!editing">
                <v-card-actions v-if="own">
                    <v-btn icon small @click="edit">
                        <v-icon color="orange">{{ icons.mdiPencil }}</v-icon>
                    </v-btn>
                    
                    <v-btn icon small @click="destroy">
                        <v-icon color="red">{{ icons.mdiDelete }}</v-icon>
                    </v-btn>
                </v-card-actions>
            </div>
        </v-card>
    </div>
</template>

<script>
import { mdiPencil, mdiDelete } from '@mdi/js';
import EditReply from './editReply';
import Like from '../likes/like';

export default {
    props: ['data', 'index'],
    components: {
        EditReply,
        Like
    },

    data(){
        return {
            icons: {
                mdiPencil,
                mdiDelete
            },
            editing: false
        }
    },

    created(){
        this.listen();
    },

    computed: {
        own(){
            return User.own(this.data.user_id);
        },

        reply(){
            return md.parse(this.data.reply);
        }
    },

    methods: {
        destroy(){
            EventBus.$emit('deleteReply', this.index);
        },
        edit(){
            this.editing = true;
        },
        listen(){
            EventBus.$on('cancelEditing', ()=>{
                this.editing = false;
            });
        }
    }


}
</script>

