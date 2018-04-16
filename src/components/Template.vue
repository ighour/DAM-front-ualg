<template>
  <div>
    <h1>{{ conf.title }}</h1>

    <b-btn v-b-modal.formModal @click='formCreate()' variant='primary'>{{conf.addMsg}}</b-btn>

    <b-table striped bordered small hover :items="elements" :fields="fields">
      <template slot="actions" slot-scope="row">
        <b-button size="sm" v-b-modal.formModal @click='formEdit(row.item, row.index, $event.target)' class="mr-1" variant='warning'>
          Edit
        </b-button>
        <b-button v-if='conf.delete != false' size="sm" @click.stop="destroy(row.item, row.index, $event.target)" class="mr-1" variant='danger'>
          Delete
        </b-button>
      </template>
    </b-table>

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
      axiosInstance.get(this.conf.resource + '?user_id=' + this.user.id)
      .then(response => {
          this.responseIndex(response)
      })
      .catch(e => {console.log(e.response)})
  },

  props: ['conf', 'elements', 'fields', 'form', 'responseIndex', 'responseEdit', 'editingIndex', 'getObjectAtt', 'updateEditingForm', 'resetForm'],

  data () {
    return {
      show: true,
      formType: null
    }
  },

  computed: {
    ...mapGetters({
      token: 'getToken',
      user: 'getUser'
    }),

    formTitle(){
      return this.formType == 2 ? 'Edit ' + this.conf.formTitle : 'Add ' + this.conf.formTitle
    }
  },

  methods: {
    create(){
        let parameters = this.form
        parameters.user_id = this.user.id

      axiosInstance.post(this.conf.resource, parameters)
      .then(response => {
        this.elements.push(response.data.data)
      })
      .catch(e => {console.log(e.response)})
    },

    edit(){
      let id = this.form.id

      let parameters = this.form
      parameters.user_id = this.user.id

      axiosInstance.put(this.conf.resource + '/' + id, parameters)
      .then(response => {
        this.responseEdit(response)
      })
      .catch(e => {console.log(e.response)})
    },

    destroy(item, index){
      let id = this.getObjectAtt(item, 'id')

      axiosInstance.delete(this.conf.resource + '/' + id + '?user_id=' + this.user.id)
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
   
      this.updateEditingForm(item, index);
    }
  }
}
</script>