<template>
  <div>
    <h1>{{ msg }}</h1>

    <b-btn v-b-modal.formModal @click='formCreate()' variant='primary'>Add Movie</b-btn>

    <b-table striped bordered small hover :items="elements" :fields="fields">
      <template slot="actions" slot-scope="row">
        <b-button size="sm" v-b-modal.formModal @click='formEdit(row.item, row.index, $event.target)' class="mr-1" variant='warning'>
          Edit
        </b-button>
        <b-button size="sm" @click.stop="destroy(row.item, row.index, $event.target)" class="mr-1" variant='danger'>
          Delete
        </b-button>
      </template>
    </b-table>

    <b-modal id="formModal" :title="formTitle" ref="myFormModalRef">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">

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

        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>

      </b-form>
    </b-modal>
  </div>
</template>

<script>
import Vue from 'vue'
import axiosInstance from '@/axios/config'
import xmlToJson from 'xml-to-json-promise'

export default {
  name: 'MovieIndex',

  created() {
    if(false) //Change when auth is done
      this.$router.push({name: 'user.login'})

    else
      axiosInstance.get('movies' + '?user_id=1') //Change when auth is done
      .then(response => {
        let movies = response

        axiosInstance.get('genres')
        .then(response => {
          let genres = response

          xmlToJson.xmlDataToJSON(movies.data)
            .then(json => {
                this.fetchData = json
            });

          xmlToJson.xmlDataToJSON(genres.data)
            .then(json => {
                this.fetchGenres = json
            });
        })
        .catch(e => {console.log(e.response)})
      })
      .catch(e => {console.log(e.response)})
  },

  data () {
    return {
      msg: 'Movies List',
      fetchData: [],
      fetchGenres: [],
      fields: {
        name: {sortable: true},
        year: {sortable: true, formatter: 'getFullYear'},
        director: {sortable: true},
        cine_date: {sortable: true, label: 'Cine'},
        status: {sortable: true, formatter: 'getStatus'},
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
      show: true,
      formType: null,
      editingIndex: null
    }
  },

  computed: {
    elements(){
      return this.fetchData.movies != null ? this.fetchData.movies.movie : []
    },

    formTitle(){
      return this.formType == 2 ? 'Edit Movie' : 'Add Movie'
    },

    genres(){
      if(this.fetchGenres.genres == null)
        return []

      let genres = []

      this.fetchGenres.genres.genre.forEach(g => {
        genres.push({
          text: this.getObjectAtt(g, 'name'),
          value: this.getObjectAtt(g, 'id')
        })
      })

      return genres
    }
  },

  methods: {
    create(){
      axiosInstance.post('movies', {
        name: this.form.name,
        year: this.form.year,
        director: this.form.director,
        cine_date: this.form.cine_date,
        status: this.form.status,
        user_id: 1, //Change when auth is done
        genre_id: this.form.genre_id
      })
      .then(response => {
        this.elements.push(response.data.data)
      })
      .catch(e => {console.log(e.response)})
    },

    edit(){
      let id = this.form.id

      axiosInstance.put('movies/' + id, {
        name: this.form.name,
        year: this.form.year,
        director: this.form.director,
        cine_date: this.form.cine_date,
        status: this.form.status,
        genre_id: this.form.genre_id
      })
      .then(response => {
        let updatedElement = this.elements[this.editingIndex]
        updatedElement.name = this.form.name
        updatedElement.year = this.form.year
        updatedElement.director = this.form.director
        updatedElement.cine_date = this.form.cine_date
        updatedElement.status = this.form.status
        updatedElement.genre_id = this.form.genre_id
        updatedElement.genre = this.getObjectAtt(response.data.data, 'genre')
      })
      .catch(e => {console.log(e.response)})
    },

    destroy(item, index){
      let id = this.getObjectAtt(item, 'id')

      axiosInstance.delete('movies/' + id)
      .then(response => {
        Vue.delete(this.elements, index);
      })
      .catch(e => {console.log(e.response)})
    },

    getFullYear(value){
      return value != '' ? new Date(value).getFullYear() : null
    },

    getStatus(value){
      return value == 'W' ? 'Watched' : 'Not Watched'
    },

    onSubmit (evt) {
      evt.preventDefault()

      if(this.formType == 2)
        this.edit()

      else
        this.create()

      this.$refs.myFormModalRef.hide()
    },

    onReset (evt) {
      evt.preventDefault()

      this.resetForm()

      /* Trick to reset/clear native browser form validation state */
      this.show = false
      this.$nextTick(() => { this.show = true })
    },

    formCreate(){
      this.formType = 1
      this.resetForm()
    },

    formEdit(item, index){
      this.formType = 2

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
        status: '',
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