<template>
  <v-card-text>
    <v-textarea v-model="answer"
      placeholder="Enter answer" label="Enter answer" rows="3"
      outlined counter max-length="255">
    </v-textarea>
    <v-btn block @click="submitAnswer">
      Submit
    </v-btn>
  </v-card-text>
</template>

<script>
export default {
  name: 'view-play-question-identification',
  data: () => ({
    answer: ''
  }),
  computed: {
    question: function () {
      return this.$store.getters.getPlayCurrentQuestion()
    },
    isQuestionLocked: function () {
      return this.$store.getters.isPlayCurrentQuestionLocked()
    }
  },
  methods: {
    submitAnswer: function () {
      this.$store.dispatch('play-submit-answer', {
        question_id: this.question.id,
        answer: this.answer
      })
      this.answer = ''
    }
  }
}
</script>
