<template>
  <div>
    <p v-if='token'>Hello, {{user.name}}!</p>

    <b-container v-else fluid class='register'>
      <b-row>
        <b-col></b-col>
        <b-col cols='6'>
          <b-card border-variant="primary"
                  header="Movies List"
                  header-bg-variant="primary"
                  header-text-variant="white"
                  align="center">

                <b-form @submit="onSubmit" v-if="show">

                  <b-form-group id="email"
                              label="Email"
                              label-for="email"
                              align='left'>
                    <b-form-input id="email"
                                    type="email"
                                    v-model="form.email"
                                    required
                                    placeholder="Your email">
                    </b-form-input>
                  </b-form-group>

                  <b-form-group id="password"
                              label="Password"
                              label-for="password"
                              align='left'>
                    <b-form-input id="password"
                                    type="password"
                                    v-model="form.password"
                                    required
                                    placeholder="Your password">
                    </b-form-input>
                  </b-form-group>

                  <b-button type="submit" variant="primary">Login</b-button>
                  <b-button v-b-modal.registerModal>Register</b-button>

                </b-form>
            </b-card>

            <b-alert variant="danger" dismissible :show='showError' @dismissed='showError = false'>{{errorMessage}}</b-alert>
          </b-col>
          <b-col></b-col>
        </b-row>
      </b-container>

    <b-modal v-if='!token' id="registerModal" title="Register" ref="myRegisterModal">
      <b-form @submit="onSubmitRegister" @reset="onResetRegister" v-if="showRegister">

        <b-form-group id="registerName"
                    label="Name"
                    label-for="registerName">
          <b-form-input id="registerName"
                          type="text"
                          v-model="formRegister.name"
                          required
                          placeholder="Your name">
          </b-form-input>
        </b-form-group>

        <b-form-group id="registerEmail"
                    label="Email"
                    label-for="registerEmail">
          <b-form-input id="registerEmail"
                          type="email"
                          v-model="formRegister.email"
                          required
                          placeholder="Your email">
          </b-form-input>
        </b-form-group>

        <b-form-group id="registerPassword"
                    label="Password"
                    label-for="registerPassword">
          <b-form-input id="registerPassword"
                          type="password"
                          v-model="formRegister.password"
                          required
                          placeholder="Your password">
          </b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>

        <b-alert variant="danger" dismissible :show='showErrorRegister' @dismissed='showErrorRegister = false'>{{errorMessageRegister}}</b-alert>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import axiosInstance from '@/axios/config'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Index',

  data () {
    return {
      form: {
        email: null,
        password: null
      },
      formRegister: {
        name: null,
        email: null,
        password: null
      },
      show: true,
      showRegister: true,
      showError: false,
      errorMessage: null,
      showErrorRegister: false,
      errorMessageRegister: null
    }
  },

  computed: {
    ...mapGetters({
      token: 'getToken',
      user: 'getUser'
    })
  },

  methods: {
    ...mapActions({
      setToken: 'setToken',
      setUser: 'setUser'
    }),

    onSubmit (evt) {
      evt.preventDefault()

      axiosInstance.post('login', {
        email: this.form.email,
        password: this.form.password
      })
      .then(response => {
        let data = response.data.data;
        this.setToken(data.token)
        this.setUser(data.user)
      })
      .catch(e => {
        this.showError = 10
        this.errorMessage = e.response.data.data.error
      })
    },

    onSubmitRegister (evt) {
      evt.preventDefault()

      axiosInstance.post('register', {
        name: this.formRegister.name,
        email: this.formRegister.email,
        password: this.formRegister.password
      })
      .then(response => {
        let data = response.data.data;
        this.setToken(data.token)
        this.setUser({...data.user})   
      })
      .catch(e => {
        this.showErrorRegister = 10
        this.errorMessageRegister = e.response.data.data.error
      })
    },

    onResetRegister (evt) {
      evt.preventDefault()

      this.formRegister = {
        name: null,
        email: null,
        password: null
      }

      /* Trick to reset/clear native browser form validation state */
      this.showRegister = false
      this.$nextTick(() => { this.show = true })
    },
  }
}
</script>

<style scoped>
  .register {
    margin-top: 50px;
  }
</style>
