<template>
    <div>
        <vue-simplemde v-model="reply.reply" ref="markdownEditor"/>
          <v-card-actions>
              <v-btn icon small @click="update">
                  <v-icon color="green">{{ icons.mdiContentSave }}</v-icon>
                    </v-btn>
                    
                    <v-btn icon small @click="cancel">
                        <v-icon color="black">{{ icons.mdiCloseCircle }}</v-icon>
                    </v-btn>
            </v-card-actions>
    </div>
</template>

<script>
import VueSimplemde from 'vue-simplemde';
import { mdiContentSave, mdiCloseCircle } from '@mdi/js';

export default {
    props: ['reply'],

    data(){
        return {
            icons: {
                mdiContentSave,
                mdiCloseCircle
            }
        }
    },

    methods: {
        update(){
            axios.patch(`/api/question/${this.reply.question_slug}/reply/${this.reply.id}`, {
                body: this.reply.reply
            })
            .then( res => this.cancel())
            .catch(error => console.log(error));
        },

        cancel(){
            EventBus.$emit('cancelEditing');
        }
    },
}
</script>