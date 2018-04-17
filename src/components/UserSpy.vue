<template>
  <div>
    <h1 v-if='!user' class='header'>My Friends</h1>

    <template v-else class='header'>
      <div class='text-center' style='margin-right: 1%'>
        <b-button size="md" @click.stop="spyUsers" class="mr-1" variant='info'>
           Go Back to Friends List
        </b-button>
      </div>
      <h1>Movies</h1>
      <h3>{{user}}</h3>
    </template>
    

    <!-- LIST USERS -->
    <b-container fluid v-if='!user'>
      <!-- User Interface controls -->
      <b-row>
        <b-col md="6" class="my-1">
          <b-form-group horizontal label="Filter" class="mb-0">
            <b-input-group>
              <b-form-input v-model="filter" placeholder="Search an User" />
              <b-input-group-append>
                <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col md="6" class="my-1">
          <b-form-group horizontal label="Sort" class="mb-0">
            <b-input-group>
              <b-form-select v-model="sortBy" :options="sortOptions">
                <option slot="first" :value="null">-- none --</option>
              </b-form-select>
              <b-form-select :disabled="!sortBy" v-model="sortDesc" slot="append">
                <option :value="false">Asc</option>
                <option :value="true">Desc</option>
              </b-form-select>
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row>

      <!-- Table -->
      <b-table striped bordered small hover :items="elements" :fields="fields"
              :filter="filter"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc">

        <template slot="actions" slot-scope="row">
          <b-button size="sm" @click.stop="spyUser(row.item, row.index, $event.target)" class="mr-1" variant='info'>
            Spy
          </b-button>
        </template>

      </b-table>
    </b-container>

    <!-- LIST USER MOVIES -->
    <b-container fluid v-else>
      <!-- User Interface controls -->
      <b-row>
        <b-col md="6" class="my-1">
          <b-form-group horizontal label="Filter" class="mb-0">
            <b-input-group>
              <b-form-input v-model="userMovies.filter" placeholder="Search a Movie" />
              <b-input-group-append>
                <b-btn :disabled="!userMovies.filter" @click="userMovies.filter = ''">Clear</b-btn>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col md="6" class="my-1">
          <b-form-group horizontal label="Sort" class="mb-0">
            <b-input-group>
              <b-form-select v-model="userMovies.sortBy" :options="userMoviesSortOptions">
                <option slot="first" :value="null">-- none --</option>
              </b-form-select>
              <b-form-select :disabled="!userMovies.sortBy" v-model="userMovies.sortDesc" slot="append">
                <option :value="false">Asc</option>
                <option :value="true">Desc</option>
              </b-form-select>
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row>

      <!-- Table -->
      <b-table striped bordered small hover :items="userMoviesElements" :fields="userMovies.fields"
              :filter="userMovies.filter"
              :sort-by.sync="userMovies.sortBy"
              :sort-desc.sync="userMovies.sortDesc">

        <template slot="actions" slot-scope="row">
          <b-btn v-if='!userMovies.added.includes(getObjectAtt(row.item, "id"))' :disabled='!token' @click='cloneMovie(row.item, row.index, $event.target)' variant='info'>
            Add to my List
          </b-btn>
          <b-btn v-else disabled variant='info'>
            Added
          </b-btn>
        </template>

      </b-table>
    </b-container>
  </div>
</template>

<script>
import axiosInstance from '@/axios/config'
import xmlToJson from 'xml-to-json-promise'
import { mapGetters } from 'vuex'

export default {
  name: 'UserSpy',

  created() {
    axiosInstance.get('users')
    .then(response => {
      xmlToJson.xmlDataToJSON(response.data)
        .then(json => {
            this.fetch.data = json
        });
    })
    .catch(e => {console.log(e.response)})
  },

  data () {
    return {
      fetch: {
        data: [],
      },
      fields: [
        { key: 'name', label: 'Name', sortable: true },
        { key: 'email', label: 'Email', sortable: true },
        { key: 'movies_count', label: 'Movies', sortable: true },
        { key: 'actions', label: 'Actions', sortable: false }
      ],
      sortBy: null,
      sortDesc: false,
      filter: null,
      user: null,
      userMovies: {
        fetch: {
          data: [],
        },
        fields: [
          { key: 'name', label: 'Name', sortable: true },
          { key: 'year', label: 'Year', sortable: true, formatter: this.getFullYear },
          { key: 'director', label: 'Director', sortable: true },
          { key: 'cine_date', label: 'Cine', sortable: true },
          { key: 'status', label: 'Status', sortable: true, formatter: this.getStatus },
          { key: 'genre', label: 'Genre', sortable: true },
          { key: 'actions', label: 'Actions', sortable: false }
        ],
        sortBy: null,
        sortDesc: false,
        filter: null,
        added: []
      }
    }
  },

  computed: {
    ...mapGetters({
      token: 'getToken'
    }),

    elements(){
      return this.fetch.data.users != null ? this.fetch.data.users.user : []
    },

    sortOptions () {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => { return { text: f.label, value: f.key } })
    },

    userMoviesElements(){
      return this.userMovies.fetch.data.movies != null ? this.userMovies.fetch.data.movies.movie : []
    },

    userMoviesSortOptions () {
      // Create an options list from our fields
      return this.userMovies.fields
        .filter(f => f.sortable)
        .map(f => { return { text: f.label, value: f.key } })
    },
  },

  methods: {
    spyUser(item, index){
      let userId = this.getObjectAtt(item, 'id')

      axiosInstance.get('users/' + userId)
      .then(response => {
        xmlToJson.xmlDataToJSON(response.data)
          .then(json => {
              this.userMovies.fetch.data = json
              this.userMovies.added = []

              let user = '@' + this.getObjectAtt(item, 'name')
              this.user = user
          });
      })
      .catch(e => {console.log(e.response)})
    },

    spyUsers(){
      this.user = null
      this.userMovies.fetch.data = []
    },

    cloneMovie(item, index){
      axiosInstance.post('users/copy', {
        name: this.getObjectAtt(item, 'name'),
        year: this.getObjectAtt(item, 'year'),
        director: this.getObjectAtt(item, 'director'),
        cine_date: this.getObjectAtt(item, 'cine_date'),
        status: this.getObjectAtt(item, 'status'),
        genre: this.getObjectAtt(item, 'genre')
      })
      .then(response => {
        this.userMovies.added.push(this.getObjectAtt(item, 'id'))
      })
      .catch(e => {console.log(e.response)})
    },

    getFullYear(value){
        return value != null && value != '' ? new Date(value).getFullYear() : null
    },

    getStatus(value){
        return value == 'W' ? 'Watched' : 'Not Watched'
    },

    getObjectAtt(obj, att){
      if(Array.isArray(obj[att]))
          return obj[att][0]

      return obj[att]
    }
  }
}
</script>

<style scoped>
  .header {
    margin-bottom: 30px;
  }
</style>
