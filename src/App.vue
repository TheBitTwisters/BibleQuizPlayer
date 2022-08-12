<template>
  <v-app>
    <SystemBar/>
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
import SystemBar from '@/components/SystemBar'

export default {
  name: 'App',
  components: {
    SystemBar,
    Snackbar,
    BottomNav
  }
};
</script>
