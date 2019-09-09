<template>
    <div class="mt-4">
        <vue-simplemde v-model="body" ref="markdownEditor"/>

        <v-btn dark color="green" @click="submit">
            Reply
        </v-btn>
    </div>
</template>

<script>
import VueSimplemde from 'vue-simplemde';

export default {
    props: ['QuestionSlug'],
    data() {
        return {
            body: null
        }
    },

    methods: {
        submit(){
            axios.post(`/api/question/${this.QuestionSlug}/reply`, {body: this.body})
            .then(res => {
                this.body = '';
                EventBus.$emit('newReply', res.data.reply);
                window.scrollTo(0,0);
            })
        }
    }
}
</script>