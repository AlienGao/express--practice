import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'

const TIMEOUT = 20000

const _axios = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: TIMEOUT,
  headers: {
    'Access-Control-Allow-Origin': '*',

  },
})

_axios.interceptors.request.use(
  (config) => {
    if (config.method === 'get' || config.method === 'delete') {
      config.paramsSerializer = function (params) {
        return qs.stringify(params, { arrayFormat: 'repeat' })
      }
    }
    if (localStorage.token) {
      config.headers.Authorization = "Bearer " + localStorage.token;
      // config.headers.Authorization = localStorage.token
      _axios.defaults.headers.Authorization =
        "Bearer " + localStorage.token;
      // _axios.defaults.headers.Authorization = localStorage.token
    }
    return config
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

_axios.interceptors.response.use(
  (response) => {
    if (response.status !== 200) {
      Message.error({ message: '接口出错了' })
      return Promise.reject(response.data)
    }
    return response.data
  },
  (error) => {
    if (error.message.indexOf('timeout') !== -1) {
      Message.error({ message: '请求超时' })
    }
    // Do something with response error
    return Promise.reject(error)
  }
)

export default _axios
