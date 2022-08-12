import moment from 'moment'

const session = {
  state: {
    token: '',
    startedAt: '',
    expiresIn: 0,
  },
  mutations: {
    SET_SESSION (state, session) {
      state.startedAt = moment().valueOf()
      state.token = session.token || ''
      state.expiresIn = session.expiresIn || 0
    }
  },
  actions: {
    'session-logout': function ({ commit }) {
      commit('SET_SESSION', {})
      commit('SET_SESSION_PLAYER', {})
      commit('SET_APP_DRAWER', false)
    },
  },
  getters: {
    isSessionActive: (state) => () => {
      return state.expiresIn > 0 && state.token.length > 0
    },
    getSessionToken: (state) => () => {
      return state.token
    }
  }
}

export default session
