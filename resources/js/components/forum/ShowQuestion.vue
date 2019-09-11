<template>
    <v-card>
        <v-container fluid>
            <v-card-title>
                <div>
                    {{ data.title }}
                    <div class="grey--text subtitle-1">
                    {{ data.user }} said {{ data.created_at }}
                    </div>
                </div>
                <v-spacer></v-spacer>
                <v-btn color="teal" dark>{{ replyCount }} Replies</v-btn>
            </v-card-title>

            <v-card-text v-html="body"></v-card-text>

            <v-card-actions v-if="own">
                <v-btn icon small @click="edit">
                      <v-icon color="orange">{{ icons.mdiPencil}}</v-icon>
                </v-btn>
                <v-btn icon small @click="destroy">
                    <v-icon color="red">{{ icons.mdiDelete }}</v-icon>
                </v-btn>
            </v-card-actions>
        </v-container>
  </v-card>
</template>

<script>
import { mdiPencil, mdiDelete } from '@mdi/js';

export default {
    props: ['data'],
    data() {
        return {
            icons: {
                mdiPencil,
                mdiDelete
            },
            own: User.own(this.data.user_id),
            replyCount: this.data.reply_count
        }
    },

    created() {
        EventBus.$on('newReply', () => {
            this.replyCount++;
        });

        Echo.private('App.User.' + User.id())
            .notification((notification) => {
                this.replyCount++;
            });

        EventBus.$on('deleteReply', () => {
            this.replyCount--;
        });

        Echo.channel('deleteReplyChannel')
            .listen('DeleteReplyEvent', (e) =>{
                this.replyCount--;
            });
    },

    computed: {
        body(){
            return md.parse(this.data.body);
        }
    },

    methods: {
        destroy(){
            axios.delete(`/api/question/${this.data.slug}`)
            .then(res => this.$router.push('/forum'))
            .catch(error => console.log(error.response.data));
        },
        edit(){
            EventBus.$emit('startEditing');
        }
    },
}
</script>