import axios from '@/plugins/axios'
import store from '@/store'

const getPlayGames = () => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: '/games/play',
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

const getPlayGame = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: '/games/play/' + params.game_id,
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
  getPlayGames,
  getPlayGame
}
