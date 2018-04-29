<template>
    <table-template :conf='conf'
                    :elements='elements'
                    :newElements='newElements'
                    :fields='fields'
                    :form='form'
                    :responseIndex='responseIndex'
                    :responseEdit='responseEdit'
                    :editingIndex='editingIndex'
                    :getObjectAtt='getObjectAtt'
                    :updateEditingForm='updateEditingForm'
                    :resetForm='resetForm'>

        <template slot='tableForm'>
            <b-form-group id="movieName"
                        label="Name"
                        label-for="movieName">
            <b-form-input id="movieName"
                            type="text"
                            v-model="form.name"
                            required
                            placeholder="Movie name">
            </b-form-input>
            </b-form-group>

            <b-form-group id="movieYear"
                        label="Year"
                        label-for="movieYear">
            <b-form-input id="movieYear"
                            type="date"
                            v-model="form.year"
                            placeholder="Movie year">
            </b-form-input>
            </b-form-group>

            <b-form-group id="movieDirector"
                        label="Director"
                        label-for="movieDirector">
            <b-form-input id="movieDirector"
                            type="text"
                            v-model="form.director"
                            placeholder="Movie director">
            </b-form-input>
            </b-form-group>

            <b-form-group id="movieStatus"
                        label="Status"
                        label-for="movieStatus">
            <b-form-select id="movieStatus"
                            :options="statuses"
                            required
                            v-model="form.status">
            </b-form-select>
            </b-form-group>

            <b-form-group id="movieGenre"
                        label="Genre"
                        label-for="movieGenre">
            <b-form-select id="movieGenre"
                            :options="genres"
                            v-model="form.genre_id">
            </b-form-select>
            </b-form-group>
        </template>
    </table-template>
</template>

<script>
import axiosInstance from '@/axios/config'
import xmlToJson from 'xml-to-json-promise'
import { mapGetters } from 'vuex'

import TableTemplate from './Template'

export default {
    name: 'Movie',

    components: {
        'table-template': TableTemplate
    },

    data(){
        return {
            conf: {
                title: 'Movies List',
                addMsg: 'Add Movie',
                resource: 'movies',
                formTitle: 'Movie'
            },
            fetch: {
                data: [],
                genres: []
            },
            fields: [
                { key: 'name', label: 'Name', sortable: true },
                { key: 'year', label: 'Year', sortable: true, formatter: this.getFullYear },
                { key: 'director', label: 'Director', sortable: true },
                { key: 'status', label: 'Status', sortable: true, formatter: this.getStatus },
                { key: 'genre', label: 'Genre', sortable: true },
                { key: 'actions', label: 'Actions', sortable: false }
            ],
            form: {
                id: null,
                name: '',
                year: '',
                director: '',
                status: 'NW',
                genre_id: null,
                user_id: null
            },
            statuses: [
                {text: 'Watched', value: 'W'},
                {text: 'Not Watched', value: 'NW'}
            ],
            editingIndex: null,
            newElements: []
        }
    },

    computed: {
        ...mapGetters({
            user: 'getUser'
        }),

        elements(){
            return this.fetch.data.movies != null && this.fetch.data.movies.movie != null ? this.fetch.data.movies.movie : []
        },

        genres(){
            let genres = []

            genres.push({
                text: '',
                value: null
            })

            if(this.fetch.genres.genres == null || this.fetch.genres.genres.genre == null)
                return genres         

            this.fetch.genres.genres.genre.forEach(g => {
                genres.push({
                    text: this.getObjectAtt(g, 'name'),
                    value: this.getObjectAtt(g, 'id')
                })
            })

            return genres
        }
    },

    methods: {
        responseIndex(response){
            axiosInstance.get('genres')
            .then(r => {
                xmlToJson.xmlDataToJSON(response.data)
                    .then(json => {
                        this.fetch.data = json
                    });

                xmlToJson.xmlDataToJSON(r.data)
                    .then(json => {
                        this.fetch.genres = json
                    });
                })
            .catch(e => {console.log(e.response)})
        },

        responseEdit(response){
            let updatedElement

            let countOriginal = this.elements.length - 1

            if(this.editingIndex > countOriginal)
                updatedElement = this.newElements[this.editingIndex - countOriginal - 1]

            else
                updatedElement = this.elements[this.editingIndex]

            updatedElement.name = this.form.name
            updatedElement.year = this.form.year
            updatedElement.director = this.form.director
            updatedElement.status = this.form.status
            updatedElement.genre_id = this.form.genre_id
            updatedElement.genre = this.getObjectAtt(response.data.data, 'genre')
        },

        getFullYear(value){
            return value != null && value != '' ? new Date(value).getFullYear() : null
        },

        getStatus(value){
            return value == 'W' ? 'Watched' : 'Not Watched'
        },

        updateEditingForm(item, index){
            this.form = {
                id: this.getObjectAtt(item, 'id'),
                name: this.getObjectAtt(item, 'name'),
                year: this.getObjectAtt(item, 'year'),
                director: this.getObjectAtt(item, 'director'),
                status: this.getObjectAtt(item, 'status'),
                genre_id: this.getObjectAtt(item, 'genre_id')
            }

            this.editingIndex = index
        },

        resetForm(){
            this.form = {
                id: null,
                name: '',
                year: '',
                director: '',
                status: 'NW',
                genre_id: null,
                user_id: null
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
