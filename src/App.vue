<template>
  <v-app>
    <Snackbar/>
    <v-main class="grey lighten-2">
      <v-container>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Snackbar from '@/components/Snackbar'

export default {
  name: 'App',
  components: {
    Snackbar
  }
};
</script>
