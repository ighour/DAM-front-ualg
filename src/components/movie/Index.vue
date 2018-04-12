<template>
  <div>
    <h1>{{ msg }}</h1>

    <b-table striped bordered small hover :items="elements" :fields="fields">
      <template slot="actions" slot-scope="row">
        <b-button size="sm" @click.stop="edit(row.item, row.index, $event.target)" class="mr-1">
          Edit
        </b-button>
        <b-button size="sm" @click.stop="destroy(row.item, row.index, $event.target)" class="mr-1">
          Delete
        </b-button>
      </template>
    </b-table>
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
      fetchData: [],
      fields: {
        name: {sortable: true},
        year: {sortable: true, formatter: 'getFullYear'},
        director: {sortable: true},
        cine_date: {sortable: true, label: 'Cine'},
        genre: {sortable: true},
        actions: {sortable: false}
      }
    }
  },

  computed: {
    elements(){
      return this.fetchData.movies != null ? this.fetchData.movies.movie : []
    }
  },

  methods: {
    edit(item, index){
      //
    },

    destroy(item, index){
      let id = item.id[0]

      axiosInstance.delete('movies/' + id)
      .then(response => {
        Vue.delete(this.elements, index);
      })
      .catch(e => {})
    },

    getFullYear(value){
      return value != '' ? new Date(value).getFullYear() : null
    }
  }
}
</script>