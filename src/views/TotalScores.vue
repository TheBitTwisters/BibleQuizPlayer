<template>
  <v-card>
    <v-card-title>
      Bible Quiz Total Scores
    </v-card-title>

    <v-divider></v-divider>

    <v-list>
      <div v-for="(score, index) in scores" :key="score.name">
        <v-list-item :class="getRankColor(index)">
          <v-list-item-icon>
            <v-chip outlined class="align-center justify-center" style="min-width: 48px;">
              {{ index + 1 }}<sup>{{ index + 1 | formatOrdinalOnly }}</sup>
            </v-chip>
          </v-list-item-icon>
          <v-list-item-content>
            {{ score.name }}
          </v-list-item-content>
          <v-list-item-action class="justify-end" style="min-width: 48px;">
            {{ score.score }}
          </v-list-item-action>
        </v-list-item>
        <v-divider></v-divider>
      </div>
    </v-list>

  </v-card>
</template>

<script>
import apiScores from '@/api/scores'

export default {
  name: 'view-scores',
  data: () => ({
    loadingScores: false,
    headers: [
      {
        text: 'Group',
        value: 'name'
      },
      {
        text: 'Score',
        value: 'score',
      }
    ],
    scores: []
  }),
  mounted () {
    this.getScores()
  },
  methods: {
    getScores: function () {
      this.loadingScores = true
      apiScores.getTotalScores()
        .then(response => {
          this.scores = response.scores
        }).catch(err => {
          console.log(err)
        }).finally(() => {
          this.loadingScores = false
        })
    },
    getRankColor: function (index) {
      if (index == 0)
        return 'amber'
      else if (index == 1)
        return 'grey lighten-1'
      else if (index == 2)
        return 'brown lighten-3'
      return ''
    }
  }
}
</script>
