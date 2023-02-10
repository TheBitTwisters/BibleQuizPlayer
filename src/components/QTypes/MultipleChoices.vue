<template>
  <v-list dense :disabled="isQuestionLocked">
    <v-list-item-group active-class="info"
      v-model="choiceIndex" @change="submitAnswer">
      <div v-for="choice in choices" :key="choice.id">
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-icon class="mr-0">
            {{ choice.label }}
          </v-list-item-icon>
          <v-list-item-content>
            {{ choice.value }}
          </v-list-item-content>
          <v-list-item-action class="ml-0" v-if="isQuestionLocked && choice.is_answer == 1">
            <v-icon>mdi-check</v-icon>
          </v-list-item-action>
        </v-list-item>
      </div>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  name: 'view-play-question-multiplechoices',
  data: () => ({
    choiceIndex: -1
  }),
  computed: {
    question: function () {
      return this.$store.getters.getPlayCurrentQuestion()
    },
    isQuestionLocked: function () {
      return this.$store.getters.isPlayCurrentQuestionLocked()
    },
    choices: function () {
      return this.$store.getters.getPlayCurrentQuestionChoices()
    }
  },
  methods: {
    submitAnswer: function () {
      var answer = ''
      for (let i=0; i < this.choices.length; i++) {
        if (this.choiceIndex == i) {
          answer = this.choices[i].label
        }
      }
      if (answer != '') {
        this.$store.dispatch('play-submit-answer', {
          question_id: this.question.id,
          answer: answer
        })
      }
    }
  }
}
</script>
