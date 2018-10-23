<template>
  <div>
    <Auth
    action="login"
    v-on:process="login($event)"/>

    <SnackBar
    v-if="snackBar"
    :snackBar="snackBar"
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
  name: 'Login',
  components: {SnackBar, Auth},
  data () {
    return {
      snackBar: false,
      message: '',
      timeout: 2000
    }
  },
  methods: {
    login (user) {
      this.$store.dispatch('firebaseLogin', user)
      .then(data => {
        db.collection('users').doc(data.user.uid).onSnapshot(snapshot => {
          this.$router.push('/')
        })
      }).catch(error => {
        this.message = error.message.substr(0, 60)
        this.snackBar = true
        setTimeout(() => {
          this.snackBar = false
        }, this.timeout)
      })
    }
  }
}
</script>
