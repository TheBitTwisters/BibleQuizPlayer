import moment from 'moment'
import router from '@/router'

const session = {
  state: {
    token: '',
    startedAt: '',
    expiresIn: 0,
    player: {
      id: 0,
      name: '',
      fullname: ''
    }
  },
  mutations: {
    SET_SESSION_PLAYER (state, player) {
      state.player = player || {
        id: 0,
        name: '',
        fullname: ''
      }
    },
    SET_SESSION (state, session) {
      state.startedAt = moment().valueOf()
      state.token = session.token || ''
      state.expiresIn = session.expiresIn || 0
    }
  },
  actions: {
    'session-login': function ({ commit }, params) {
      commit('SET_SESSION', params.session)
      commit('SET_SESSION_PLAYER', params.player)
      commit('SET_APP_DRAWER', true)
      router.push({ name: 'Dashboard' })
    },
    'session-logout': function ({ commit }) {
      commit('SET_SESSION', {})
      commit('SET_SESSION_PLAYER', {})
      commit('SET_APP_DRAWER', false)
      if (router.currentRoute.name != 'Login') {
        router.push({ name: 'Login' })
      }
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
