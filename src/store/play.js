import apiGames from '@/api/games'
import apiQuestions from '@/api/questions'

const play = {
  state: {
    game: undefined,
    levels: [],
    quest_types: [],
    questions: [],
    player: undefined,
    passplay_question_id: 0
  },
  mutations: {
    SET_PLAY_GAME (state, game) {
      state.game = game
    },
    SET_PLAY_PLAYER (state, player) {
      state.player = player
    },
    SET_PLAY_LEVELS (state, levels) {
      state.levels = levels
    },
    SET_PLAY_QUEST_TYPES (state, types) {
      state.quest_types = types
    },
    SET_PLAY_QUESTIONS (state, questions) {
      state.questions = questions
    },
    SET_PLAY_UPDATE_QUESTION (state, question) {
      for (let quest of state.questions) {
        if (quest.id == question.id) {
          quest.locked_at = question.locked_at || undefined
          break
        }
      }
    },
    SET_PLAY_QUESTION_ANSWERED (state, params) {
      for (let question of state.questions) {
        if (question.id == params.question_id) {
          question.submitted_answer = params.answer
        }
      }
    },
    SET_PASSPLAY_QUESTION_ID (state, question_id) {
      state.passplay_question_id = question_id
    }
  },
  actions: {
    'play-refresh-game': function ({ state, commit, dispatch }) {
      if (state.game != undefined) {
        apiGames.getDetails({ game_id: state.game.id })
          .then(response => {
            commit('SET_PLAY_GAME', response.game)
            if (response.current_question) {
              commit('SET_PLAY_UPDATE_QUESTION', response.current_question)
            }
          }).finally(() => {
            setTimeout(() => {
              dispatch('play-refresh-game')
            }, 1500)
          })
      }
    },
    'play-submit-passplay': function ({ state, commit }, params) {
      apiQuestions.passplay({
        question_id: params.question_id,
        attendance_id: state.player.id,
        play: params.play
      })
        .then(response => {
          commit('SET_PASSPLAY_QUESTION_ID', response.question_id)
        })
    },
    'play-submit-answer': function ({ state, commit }, params) {
      apiQuestions.submitAnswer({
        game_id: state.game.id,
        question_id: params.question_id,
        player_id: state.player.id,
        answer: params.answer
      }).then(response => {
        commit('SET_PLAY_QUESTION_ANSWERED', {
          question_id: params.question_id,
          answer: params.answer
        })
        commit('SHOW_SNACKBAR', {
          status: 'success',
          message: response.message
        })
      }).catch(err => {
        console.log(err)
        commit('SHOW_SNACKBAR', {
          status: 'error',
          message: err.message
        })
      })
    }
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
      return undefined
    },
    getPlayCurrentQuestionChoices: (state) => () => {
      for (let question of state.questions) {
        if (question.id == state.game.current_question_id) {
          return question.choices
        }
      }
      return []
    },
    getPassPlayQuestionID: (state) => () => {
      return state.passplay_question_id
    },
    isPlayCurrentQuestionLocked: (state) => () => {
      for (let question of state.questions) {
        if (question.id == state.game.current_question_id) {
          return question.locked_at != undefined
        }
      }
      return false
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
