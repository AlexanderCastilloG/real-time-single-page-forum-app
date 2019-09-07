<template>
    <v-container>
        <v-form @submit.prevent="create">
            <v-text-field
            label="Title"
            v-model="form.title"
            type="text"
            required
            ></v-text-field>

            <v-autocomplete
                label="Category"
                v-model="form.category_id"
                :items="categories"
                item-text="name"
                item-value="id"
            ></v-autocomplete>
    
            <vue-simplemde v-model="form.body" ref="markdownEditor"/>
            <v-btn
            color="green"
            type="submit"
            >Create</v-btn>
        </v-form>
    </v-container>
</template>

<script>
 import VueSimplemde from 'vue-simplemde';

export default {
    components: {
         VueSimplemde
    },

    data(){
        return {
            form : {
                title: null,
                category_id: null,
                body: null
            },
            categories: [],
            errors: {}
        }
    },

    created() {
        axios.get('/api/category')
        .then(res => this.categories = res.data.data)
        .catch(error =>console.log(error));
    },

    methods: {
        create() {
            axios.post('/api/question', this.form)
            .then(res => this.$router.push(res.data.path))
            .catch(error => this.errors = error.response.data.error);
        }
    }
}
</script>

<style>
  @import '~simplemde/dist/simplemde.min.css';
</style>