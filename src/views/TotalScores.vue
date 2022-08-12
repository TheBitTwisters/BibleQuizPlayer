<template>
  <v-card>
    <v-card-title>
      Total Scores
    </v-card-title>

    <v-divider></v-divider>

    <v-list>
      <div v-for="(score, index) in scores" :key="score.name">
        <v-list-item>
          <v-list-item-icon>
            {{ index + 1 | formatOrdinal }}
          </v-list-item-icon>
          <v-list-item-content>
            {{ score.name }}
          </v-list-item-content>
          <v-list-item-action>
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
    }
  }
}
</script>
