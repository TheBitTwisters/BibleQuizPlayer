<template>
  <v-app>
    <v-main class="grey lighten-2">
      <v-container>
        <router-view/>
      </v-container>
    </v-main>
    <BottomNav/>
  </v-app>
</template>

<script>
import BottomNav from '@/components/BottomNav'

export default {
  name: 'App',
  components: {
    BottomNav
  },
  data: () => ({
    //
  }),
};
</script>

<style>
  body {
    padding-bottom: 60px;
  }
</style>
