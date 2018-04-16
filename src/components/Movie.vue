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

            <b-form-group id="movieCineDate"
                        label="Cine Date"
                        label-for="movieCineDate">
            <b-form-input id="movieCineDate"
                            type="date"
                            v-model="form.cine_date"
                            placeholder="Movie cine date">
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
                            required
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
            fields: {
                name: {sortable: true},
                year: {sortable: true, formatter: this.getFullYear},
                director: {sortable: true},
                cine_date: {sortable: true, label: 'Cine'},
                status: {sortable: true, formatter: this.getStatus},
                genre: {sortable: true},
                actions: {sortable: false}
            },
            form: {
                id: null,
                name: '',
                year: '',
                director: '',
                cine_date: '',
                status: 'NW',
                genre_id: null
            },
            statuses: [
                {text: 'Watched', value: 'W'},
                {text: 'Not Watched', value: 'NW'}
            ],
            editingIndex: null
        }
    },

    computed: {
        ...mapGetters({
            user: 'getUser'
        }),

        elements(){
            return this.fetch.data.movies != null ? this.fetch.data.movies.movie : []
        },

        genres(){
            if(this.fetch.genres.genres == null)
                return []

            let genres = []

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
            axiosInstance.get('genres' + '?user_id=' + this.user.id)
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
            let updatedElement = this.elements[this.editingIndex]
            updatedElement.name = this.form.name
            updatedElement.year = this.form.year
            updatedElement.director = this.form.director
            updatedElement.cine_date = this.form.cine_date
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
                cine_date: this.getObjectAtt(item, 'cine_date'),
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
                cine_date: '',
                status: 'NW',
                genre_id: null
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
