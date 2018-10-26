<template>
  <v-jumbotron color="grey lighten-2">
    <v-container fill-height>
      <v-layout align-center>
        <v-flex>
          <h3 class="display-3">{{ $t('welcome.title', {app: 'BURGUER QUEEN'} )}} </h3>
          <span class="subheading">{{$t('welcome.content')}}</span>
          <v-divider class="my-3"/>
          <v-btn 
          class="mx-0"
          to="/login"
          large 
          color="primary">{{ $t('welcome.action_button')}} </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-jumbotron>
</template>
<script>
export default {
  name: 'Home'
}
</script>
