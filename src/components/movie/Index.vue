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
        </tr>
      </thead>
      <tbody>
        <tr v-for='element in elements' :key='element.id[0]'>
          <td>{{element.id[0]}}</td>
          <td>{{element.name[0]}}</td>
          <td>{{element.year[0]}}</td>
          <td>{{element.director[0]}}</td>
          <td>{{element.cine_date[0]}}</td>
          <td>{{element.created_at[0]}}</td>
          <td>{{element.updated_at[0]}}</td>
          <td>{{getGenres(element.genres)}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
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
    }
  }
}
</script>