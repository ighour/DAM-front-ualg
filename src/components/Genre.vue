<template>
    <table-template :conf='conf'
                    :elements='elements'
                    :fields='fields'
                    :form='form'
                    :responseIndex='responseIndex'
                    :responseEdit='responseEdit'
                    :editingIndex='editingIndex'
                    :getObjectAtt='getObjectAtt'
                    :updateEditingForm='updateEditingForm'
                    :resetForm='resetForm'>

        <template slot='tableForm'>
            <b-form-group id="genreName"
                        label="Name"
                        label-for="genreName">
            <b-form-input id="genreName"
                            type="text"
                            v-model="form.name"
                            required
                            placeholder="Genre name">
            </b-form-input>
            </b-form-group>
        </template>
    </table-template>
</template>

<script>
import xmlToJson from 'xml-to-json-promise'

import TableTemplate from './Template'

export default {
    name: 'Genre',

    components: {
        'table-template': TableTemplate
    },

    data(){
        return {
            conf: {
                title: 'Genres List',
                addMsg: 'Add Genre',
                resource: 'genres',
                formTitle: 'Genre',
                delete: false
            },
            fetch: {
                data: []
            },
            fields: {
                name: {sortable: true},
                actions: {sortable: false}
            },
            form: {
                id: null,
                name: ''
            },
            editingIndex: null
        }
    },

    computed: {
        elements(){
            return this.fetch.data.genres != null ? this.fetch.data.genres.genre : []
        }
    },

    methods: {
        responseIndex(response){
            xmlToJson.xmlDataToJSON(response.data)
                .then(json => {
                    this.fetch.data = json
                });
        },

        responseEdit(response){
            let updatedElement = this.elements[this.editingIndex]
            updatedElement.name = this.form.name
        },

        updateEditingForm(item, index){
            this.form = {
                id: this.getObjectAtt(item, 'id'),
                name: this.getObjectAtt(item, 'name')
            }

            this.editingIndex = index
        },

        resetForm(){
            this.form = {
                id: null,
                name: ''
            }
        },

        getObjectAtt(obj, att){
            if(Array.isArray(obj[att]))
                return obj[att][0]

            return obj[att]
        }
    }
}
</script>
