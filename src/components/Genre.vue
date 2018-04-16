<template>
  <div>
    <h1>{{ msg }}</h1>

    <b-btn v-b-modal.formModal @click='formCreate()' variant='primary'>Add Genre</b-btn>

    <b-table striped bordered small hover :items="elements" :fields="fields">
      <template slot="actions" slot-scope="row">
        <b-button size="sm" v-b-modal.formModal @click='formEdit(row.item, row.index, $event.target)' class="mr-1" variant='warning'>
          Edit
        </b-button>
      </template>
    </b-table>

    <b-modal id="formModal" :title="formTitle" ref="myFormModalRef">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">

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
  name: 'Genre',

  created() {
    if(false) //Change when auth is done
      this.$router.push({name: 'index'})

    else
      axiosInstance.get('genres' + '?user_id=1') //Change when auth is done
      .then(response => {
        xmlToJson.xmlDataToJSON(response.data)
          .then(json => {
              this.fetchData = json
          });
      })
      .catch(e => {console.log(e.response)})
  },

  data () {
    return {
      msg: 'Genres List',
      fetchData: [],
      fields: {
        name: {sortable: true},
        actions: {sortable: false}
      },
      form: {
        id: null,
        name: ''
      },
      show: true,
      formType: null,
      editingIndex: null
    }
  },

  computed: {
    elements(){
      return this.fetchData.genres != null ? this.fetchData.genres.genre : []
    },

    formTitle(){
      return this.formType == 2 ? 'Edit Genre' : 'Add Genre'
    }
  },

  methods: {
    create(){
      axiosInstance.post('genres', {
        name: this.form.name,
        user_id: 1, //Change when auth is done
      })
      .then(response => {
        this.elements.push(response.data.data)
      })
      .catch(e => {console.log(e.response)})
    },

    edit(){
      let id = this.form.id

      axiosInstance.put('genres/' + id, {
        name: this.form.name,
        user_id: 1, //Change when auth is done
      })
      .then(response => {
        let updatedElement = this.elements[this.editingIndex]
        updatedElement.name = this.form.name
      })
      .catch(e => {console.log(e.response)})
    },

    destroy(item, index){
      let id = this.getObjectAtt(item, 'id')

      axiosInstance.delete('genres/' + id + '?user_id=1') //Change when auth is done
      .then(response => {
        Vue.delete(this.elements, index);
      })
      .catch(e => {console.log(e.response)})
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