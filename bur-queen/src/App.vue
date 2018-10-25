<template>
  <main>
    <v-app>
      <v-content v-if="$store.state.loaded">
        <Guest v-if="role === 'guest'"/>
        <Admin v-if="role === 'admin'"/>
        <Customer v-if="role === 'customer'"/>

        <v-container class="mt-3 mb-3">
          <!-- ALERT -->
          <v-alert :type="$store.state.alert.type"
          :value="$store.state.alert.show">
          {{$store.state.alert.message}}
          </v-alert>

          <router-view/>
        </v-container>

      </v-content>
      <v-container v-else fill-height>
        <v-layout flex align-center justify-center>
          <!-- <v-progress-circular indeterminate :size="100" :width="10" color="purple"/> -->

        </v-layout>
      </v-container>
        <Footer/>

    </v-app>

  </main>
</template>

<script>
import Guest from '@/navigation/Guest'
import Footer from '@/components/Footer'
import Admin from '@/navigation/Admin'
import Customer from '@/navigation/Customer'
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapGetters(['role'])
  },
  components: {
    Guest,
    Footer,
    Admin,
    Customer
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
