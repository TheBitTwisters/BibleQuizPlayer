const app = {
  state: {
    snackbar: {
      show: false,
      message: '',
      timeout: 3000,
      status: 'info'
    }
  },
  mutations: {
    SHOW_SNACKBAR (state, params) {
      state.snackbar.show = true
      state.snackbar.status = params.status || 'info'
      state.snackbar.message = params.message
    },
    HIDE_SNACKBAR (state) {
      state.snackbar.show = false
      state.snackbar.message = ''
    }
  },
  actions: {},
  getters: {}
}

export default app
