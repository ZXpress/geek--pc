import { message } from 'antd'
import axios from 'axios'
import { getToken, hasToken, removeToken } from 'utils/storage'

import history from './history'

// 创建axios实例
export const baseURL = 'http://geek.itheima.net/v1_0/'
const instance = axios.create({
  baseURL,
  timeout: 1000,
})

// 配置拦截器
// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    if (hasToken()) {
      config.headers.Authorization = `Bearer ${getToken()}`
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    // 对token过期进行统一处理
    if (!error.response) {
      // 如果error信息中没有response，网络超时导致
      message.error('网络繁忙，请稍后重试')
      return Promise.reject('网络繁忙，请稍后重试')
    }
    if (error.response.status === 401) {
      // 代表token过期
      // 删除token
      removeToken()
      // 提示消息
      message.warn('登录信息过期')
      // 跳转登陆页
      // window.location.href = '/login'
      // 使用createBrowserHistory()得到的从history.js导入的history对象
      history.push('/login')
    }
    return Promise.reject(error)
  }
)

export default instance
