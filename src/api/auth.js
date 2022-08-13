import axios from '@/plugins/axios'

const login = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: '/auth/player',
      data: params
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
  login
}
