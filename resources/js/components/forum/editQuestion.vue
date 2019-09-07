<template>
    <v-container fluid>
        <v-card>
            <v-form @submit.prevent="update">
                <v-text-field
                label="Title"
                v-model="form.title"
                type="text"
                required
                ></v-text-field>

                <vue-simplemde v-model="form.body" ref="markdownEditor"/>

                <v-card-actions>
                    <v-btn icon small type="submit">
                        <v-icon color="teal">{{ icons.mdiContentSave }}</v-icon>
                    </v-btn>
                    <v-btn icon small @click="cancel">
                        <v-icon>{{ icons.mdiCloseCircle }}</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-container>
</template>

<script>
import { mdiContentSave } from '@mdi/js';
import { mdiCloseCircle } from '@mdi/js';

export default {
    props: ['data'],
    data() {
        return {
            form: {
                title: null,
                body: null
            },

            icons: {
                mdiContentSave,
                mdiCloseCircle
            }
        }
    },

    methods: {
        cancel(){
            EventBus.$emit('cancelEditing');
        },
        update(){
            axios.patch(`/api/question/${this.form.slug}`, this.form)
            .then(res => this.cancel())
            .catch(error => console.log(error.response.data.error));
        }
    },

    created() {
        this.form = this.data;
    },
}

</script>