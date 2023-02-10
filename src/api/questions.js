import axios from '@/plugins/axios'
import store from '@/store'

const passplay = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: `/questions/${params.question_id}/passplay`,
      data: {
        play: params.play
      },
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

const submitAnswer = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: `/questions/${params.question_id}/answer`,
      data: {
        answer: params.answer
      },
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
  passplay,
  submitAnswer
}
