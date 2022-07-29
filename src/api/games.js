import axios from '@/plugins/axios'
import store from '@/store'

const getGames = () => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: '/games',
      headers: {
        'Authorization': store.getters.getSessionToken()
      }
    }).then(response => {
      resolve(response.data)
    }).catch(err => {
      if (err.response.data) {
        reject(err.response.data)
      }
      reject(err)
    })
  })
}

const getDetails = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: '/games/' + params.game_id,
      headers: {
        'Authorization': store.getters.getSessionToken()
      }
    }).then(response => {
      resolve(response.data)
    }).catch(err => {
      if (err.response.data) {
        reject(err.response.data)
      }
      reject(err)
    })
  })
}

const getQuestions = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: `/games/${params.game_id}/questions`,
      headers: {
        'Authorization': store.getters.getSessionToken()
      }
    }).then(response => {
      resolve(response.data)
    }).catch(err => {
      if (err.response.data) {
        reject(err.response.data)
      }
      reject(err)
    })
  })
}

export default {
  getGames,
  getDetails,
  getQuestions
}
