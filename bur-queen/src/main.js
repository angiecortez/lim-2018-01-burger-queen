import Vue from 'vue'
import App from './App'
import router from './router'

import firebase from 'firebase'
import 'firebase/firestore'
import firebaseConfig from '@/config/firebase'
import i18n from '@/config/i18n'
import store from '@/store'
require('./config/vuetify')

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
db.settings({ timestampsInSnapshots: true })
export default db
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: { App },
  template: '<App/>',
  mounted () {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        db.collection('users').doc(user.uid).onSnapshot(snapshot => {
          store.commit('setUser', user)
          if (snapshot.exists) {
            store.commit('setRole', snapshot.data().role)
            if (snapshot.data().role === 'customer') {
              store.dispatch('createCartIfNotExists', user)
            }
          }
          store.commit('setLoaded', true)
        })
      } else {
        store.commit('setLoaded', true)
      }
    })
  }
})
