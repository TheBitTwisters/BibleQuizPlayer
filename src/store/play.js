import router from '@/router'
import apiGames from '@/api/games'
import apiLevels from '@/api/levels'
import apiQuestTypes from '@/api/quest_types'
import apiQuestions from '@/api/questions'

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
      apiGames.getDetails({ game_id: params.game_id })
        .then(rGames => {
          apiLevels.getAll().then(rLevels => {
            state.levels = rLevels.levels
          })
          apiQuestTypes.getAll().then(rTypes => {
            state.quest_types = rTypes.quest_types
          })
          state.game = rGames.game
          apiGames.getQuestions({ game_id: state.game.id })
            .then(rQuestions => {
              for (var question of rQuestions.questions) {
                if (question.id == state.game.current_question_id) {
                  state.question = question || {
                    question: '',
                    choices: []
                  }
                }
              }
            })
          if (router.currentRoute.name != 'Play') {
            router.push('/play/' + rGames.game.id)
          }
        })
    },
    'submit-answer': function ({ state }, params) {
      
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
