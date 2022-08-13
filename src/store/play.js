import apiGames from '@/api/games'

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
    SET_PLAY_LEVELS (state, levels) {
      state.levels = levels
    },
    SET_PLAY_QUEST_TYPES (state, types) {
      state.quest_types = types
    },
    SET_PLAY_QUESTIONS (state, questions) {
      state.questions = questions
    }
  },
  actions: {
    'play-refresh-game': function ({ state, commit, dispatch }) {
      if (state.game != undefined) {
        apiGames.getDetails({ game_id: state.game.id })
          .then(response => {
            commit('SET_PLAY_GAME', response.game)
          }).finally(() => {
            setTimeout(() => {
              dispatch('play-refresh-game')
            }, 1500)
          })
      }
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
    hasPlayGame: (state) => () => {
      return state.game && state.game.id > 0
    },
    hasPlayCurrentQuestion: (state) => () => {
      return state.game.current_question_id > 0
    }
  }
}

export default play
