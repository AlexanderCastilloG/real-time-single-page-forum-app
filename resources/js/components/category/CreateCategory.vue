<template>
    <v-container>
        <v-alert v-if="loadingError" type="error">
            {{ errors.name[0] }}
        </v-alert>

        <v-form @submit.prevent="submit">
            <v-text-field
                label="Category Name"
                v-model="form.name"
                type="text"
                required>
            </v-text-field>

            <v-btn type="submit" :disabled="disabled" color="pink" v-if="editSlug">Update</v-btn>
            <v-btn type="submit" :disabled="disabled" color="teal" v-else>Create</v-btn>
        </v-form>

        <v-card class="mt-2">
            <v-toolbar color="indigo" dark dense>
                <v-toolbar-title>Categories</v-toolbar-title>
            </v-toolbar>

            <v-list>
                <div 
                    v-for="(category, index) in categories"
                    :key="category.id">
                    <v-list-item >
                        <v-list-item-action>
                            <v-btn icon small @click="edit(index)">
                                <v-icon color="orange">{{ icons.mdiPencil }}</v-icon>
                            </v-btn>
                        </v-list-item-action>

                        <v-list-item-content>
                            <v-list-item-title>
                                {{ category.name }}
                            </v-list-item-title>
                        </v-list-item-content>

                        <v-list-item-action>
                            <v-btn icon small @click="destroy(category.slug, index)">
                                <v-icon color="red">{{ icons.mdiDelete }}</v-icon>
                            </v-btn>
                        </v-list-item-action>
                    </v-list-item>
                    <v-divider></v-divider>
                </div>
            </v-list>
        </v-card>
    </v-container>
</template>

<script>
import { mdiPencil, mdiDelete } from '@mdi/js';

export default {
    data() {
        return {
            form: {
                name: null
            },

            categories: {},

            editSlug: null,

            icons: {
                mdiPencil,
                mdiDelete
            },
            
            errors: null,
            loadingError: false
        }
    },

    created(){
        
        if(!User.admin()){
            this.$router.push('/forum');
        }
        
        axios.get('/api/category')
        .then(res => this.categories = res.data.data)
        .catch(error => console.log(error.response.data))
    },

    methods: {
        submit(){
            this.editSlug ? this.update() : this.create();
        },

        create(){
            axios.post('/api/category', this.form)
            .then(res => {
                this.categories.unshift(res.data);
                this.form.name = null;
            })
            .catch(error => { 
                this.errors = error.response.data.errors
                this.loadingError = true;
                this.cargaError();
            });
        },

        update(){
            axios.patch(`/api/category/${this.editSlug}`, this.form)
            .then(res => {
                this.categories.unshift(res.data);
                this.form.name = null;
                this.editSlug = null;
            })
            .catch(error => {
                this.errors = error.response.data.errors
                this.loadingError = true;
                this.cargaError();
            });
        },
        
        cargaError(){
            setTimeout(() => {
                this.loadingError = false;
                this.error = null;
            }, 3000);
        },

        destroy(slug, index){
            axios.delete(`/api/category/${slug}`)
            .then(res => this.categories.splice(index, 1))
            .catch(error => console.log(error));
        },

        edit(index){
            this.form.name = this.categories[index].name;
            this.editSlug = this.categories[index].slug;
            this.categories.splice(index, 1);
        }
    },

    computed: {
        disabled(){
            // return !this.form.name;
            // return false;
            return this.loadingError;
        }
    }
}
</script>