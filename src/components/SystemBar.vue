<template>
  <v-system-bar dark>
    <span>BibleQuiz</span>
    <v-spacer></v-spacer>
    <span>{{ dateToday | formatDate }}</span>
  </v-system-bar>
</template>

<script>
export default {
  name: 'component-system-bar',
  computed: {
    dateToday: function () {
      return Date.now()
    }
  }
}
</script>
