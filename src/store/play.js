import router from '@/router'
import apiGames from '@/api/games'

const play = {
  state: {
    game: {
      id: 0
    },
    levels: [],
    quest_types: [],
    question: {
      question: '',
      choices: []
    }
  },
  mutations: {},
  actions: {
    'play-game': function ({ state }, params) {
      apiGames.getGame({ game_id: params.game_id })
        .then(response => {
          state.game = response.game
          state.levels = response.levels
          state.quest_types = response.quest_types
          state.question = response.question || {
            question: '',
            choices: []
          }
          if (router.currentRoute.name != 'Play') {
            router.push('/play/' + response.game.id)
          }
        })
    }
  },
  getters: {
    getPlayGame: (state) => () => {
      return state.game
    },
    getPlayLevels: (state) => () => {
      return state.levels
    },
    getPlayQuestTypes: (state) => () => {
      return state.quest_types
    },
    getPlayQuestions: (state) => () => {
        return state.questions
    },
    getPlayCurrentQuestion: (state) => () => {
      for (let question of state.questions) {
        if (question.id == state.game.current_question_id) {
          return question
        }
      }
      return null
    },
    getPlayCurrentQuestionChoices: (state) => () => {
      for (let question of state.questions) {
        if (question.id == state.game.current_question_id) {
          return question.choices
        }
      }
      return []
    },
    hasPlayGame: (state) => () => {
      return state.game.id > 0
    },
    hasPlayCurrentQuestion: (state) => () => {
      return state.game.current_question_id > 0
    }
  }
}

export default play
