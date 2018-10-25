<template>
  <div>
    <Auth
    action="register"
    v-on:process="register($event)"/>

    <SnackBar
    v-if="snackBar"
    :snackar="snackBar"
    :text="message"
    :timeout="timeout"
    />
  </div>
</template>
<script>

import SnackBar from '@/components/SnackBar'
import Auth from '@/forms/Auth'
import db from '@/main'
export default {
  name: 'Register',
  components: {SnackBar, Auth},
  data () {
    return {
      snackBar: false,
      message: '',
      timeout: 2000
    }
  },
  methods: {
    register (user) {
      this.$store.dispatch('firebaseRegister', user)
        .then(userRegistered => {
          console.log(userRegistered.user.uid)

          const data = {
            uid: userRegistered.user.uid,
            email: user.email,
            role: 'customer'
          }
          db.collection('users').doc(userRegistered.user.uid).set(data).then(() => {
            this.$store.commit('setRole', data.role)
            this.$router.push('/')
          })
        }).catch(error => {
          this.snackBar = true
          this.message = error.message.substr(0, 60)
          setTimeout(() => {
            this.snackBar = false
          }, this.timeout)
        })
    }
  }
}
</script>
