<template>
  <div>
    <h1>{{ msg }}</h1>

    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Year</th>
          <th>Director</th>
          <th>Cine Date</th>
          <th>Created At</th>
          <th>Updated At</th>
          <th>Genres</th>
          <th>Management</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for='(element, index) in elements' :key='element.id[0]'>
          <td>{{element.id[0]}}</td>
          <td>{{element.name[0]}}</td>
          <td>{{element.year[0]}}</td>
          <td>{{element.director[0]}}</td>
          <td>{{element.cine_date[0]}}</td>
          <td>{{element.created_at[0]}}</td>
          <td>{{element.updated_at[0]}}</td>
          <td>{{getGenres(element.genres)}}</td>
          <td><span @click='edit(element.id)'>Edit</span> / <span @click='destroy(element.id, index)'>Delete</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Vue from 'vue'
import axiosInstance from '@/axios/config'
import xmlToJson from 'xml-to-json-promise'

export default {
  name: 'MovieIndex',

  created() {
    axiosInstance.get(`movies`)
    .then(response => {
      xmlToJson.xmlDataToJSON(response.data)
        .then(json => {
            this.fetchData = json
        });
    })
    .catch(e => {})
  },

  data () {
    return {
      msg: 'Index',
      fetchData: []
    }
  },

  computed: {
    elements(){
      return this.fetchData.movies != null ? this.fetchData.movies.movie : []
    }
  },

  methods: {
    getGenres(genres){
      let list = genres[0].genre

      let text = ''

      if(!Array.isArray(list))
        return text

      list.forEach(e => {
        text += e.genre_name + '; '
      })

      return text
    },

    edit(id){

    },

    destroy(id, index){
      axiosInstance.delete('movies/' + id)
      .then(response => {
        Vue.delete(this.elements, index);
      })
      .catch(e => {})
    }
  }
}
</script>