import axios from '@/plugins/axios'
import store from '@/store'

const submitAnswer = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: '/answers/submit',
      data: {
        answer: params
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
  submitAnswer
}
