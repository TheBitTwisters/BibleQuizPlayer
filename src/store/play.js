import apiGames from '@/api/games'
import apiLevels from '@/api/levels'
import apiQuestTypes from '@/api/quest_types'
//import apiQuestions from '@/api/questions'

const play = {
  state: {
    game: undefined,
    levels: [],
    quest_types: [],
    questions: [],
    player: undefined
  },
  mutations: {
    SET_PLAY_GAME (state, game) {
      state.game = game
    },
    SET_PLAY_PLAYER (state, player) {
      state.player = player
    },
  },
  actions: {
    'play-game': async function ({ state, commit }, params) {
      try {
        var response = {}
        response = await apiLevels.getAll()
        state.levels = response.levels
        response = await apiQuestTypes.getAll()
        state.quest_types = response.quest_types
        response = await apiGames.getDetails({ game_id: params.game_id })
        commit('SET_PLAY_GAME', response.game)
        response = await apiGames.getQuestions({ game_id: params.game_id })
        state.questions = response.questions
      } catch (err) {
        console.log(err)
      }
    },
    // 'submit-answer': function ({ state }, params) {
    //
    // }
  },
  getters: {
    getPlayPlayer: (state) => () => {
      return state.player
    },
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
      return state.game && state.game.id > 0
    },
    hasPlayCurrentQuestion: (state) => () => {
      return state.game.current_question_id > 0
    }
  }
}

export default play
