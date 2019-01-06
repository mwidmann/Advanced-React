import Vue from 'vue'
import { Plugin } from 'vue-fragment'
import Form from '../components/styles/Form'
import Error from '../components/ErrorMessage'

Vue.use(Plugin)
Vue.component('Form', Form)
Vue.component('Error', Error)
