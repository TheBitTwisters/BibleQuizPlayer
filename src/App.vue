<template>
  <v-app>
    <Snackbar/>
    <BottomNav/>
    <v-main class="grey lighten-2">
      <v-container>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Snackbar from '@/components/Snackbar'
import BottomNav from '@/components/BottomNav'

export default {
  name: 'App',
  components: {
    Snackbar,
    BottomNav
  }
};
</script>

<style>
body {
  padding-bottom: 36px;
}
</style>
