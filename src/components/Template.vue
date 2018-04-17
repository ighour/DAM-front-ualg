<template>
  <div>
    <h1>{{ conf.title }}</h1>

    <div class='text-right' style='margin-right: 1%'>
      <b-btn v-b-modal.formModal @click='formCreate()' variant='primary'>{{conf.addMsg}}</b-btn>
    </div>

    <b-container fluid>
      <!-- User Interface controls -->
      <b-row>
        <b-col md="6" class="my-1">
          <b-form-group horizontal label="Filter" class="mb-0">
            <b-input-group>
              <b-form-input v-model="filter" placeholder="Type to Search" />
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
      <b-table striped bordered small hover :items="elements.concat(newElements)" :fields="fields"
              :filter="filter"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc">

        <template slot="actions" slot-scope="row">
          <b-button size="sm" v-b-modal.formModal @click='formEdit(row.item, row.index, $event.target)' class="mr-1" variant='warning'>
            Edit
          </b-button>
          <b-button v-if='conf.delete != false' size="sm" @click.stop="destroy(row.item, row.index, $event.target)" class="mr-1" variant='danger'>
            Delete
          </b-button>
        </template>

      </b-table>
    </b-container>

    <b-modal id="formModal" :title="formTitle" ref="myFormModalRef">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">

        <slot name='tableForm'></slot>

        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>

      </b-form>
    </b-modal>
  </div>
</template>

<script>
import Vue from 'vue'
import axiosInstance from '@/axios/config'
import { mapGetters } from 'vuex'

export default {
  name: 'TableTemplate',

  created() {
    if(!this.token)
      this.$router.push({name: 'index'})

    else
      axiosInstance.get(this.conf.resource)
      .then(response => {
          this.responseIndex(response)
      })
      .catch(e => {console.log(e.response)})
  },

  props: ['conf', 'elements', 'newElements', 'fields', 'form', 'responseIndex', 'responseEdit', 'editingIndex', 'getObjectAtt', 'getIndexById', 'updateEditingForm', 'resetForm'],

  data () {
    return {
      show: true,
      formType: null,
      sortBy: null,
      sortDesc: false,
      filter: null
    }
  },

  computed: {
    ...mapGetters({
      token: 'getToken',
      user: 'getUser'
    }),

    formTitle(){
      return this.formType == 2 ? 'Edit ' + this.conf.formTitle : 'Add ' + this.conf.formTitle
    },

    sortOptions () {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => { return { text: f.label, value: f.key } })
    }
  },

  methods: {
    create(){
      axiosInstance.post(this.conf.resource, this.form)
      .then(response => {
         Vue.set(this.newElements, this.newElements.length, response.data.data)
      })
      .catch(e => {console.log(e.response)})
    },

    edit(){
      let id = this.form.id

      axiosInstance.put(this.conf.resource + '/' + id, this.form)
      .then(response => {
        this.responseEdit(response)
      })
      .catch(e => {console.log(e.response)})
    },

    destroy(item, index){
      let id = this.getObjectAtt(item, 'id')

      axiosInstance.delete(this.conf.resource + '/' + id)
      .then(response => {

        let countOriginal = this.elements.length - 1

        if(index > countOriginal)
            Vue.delete(this.newElements, index - countOriginal - 1)

        else
            Vue.delete(this.elements, index)
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
   
      this.updateEditingForm(item, index);
    }
  }
}
</script>