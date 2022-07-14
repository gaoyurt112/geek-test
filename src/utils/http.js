//在这里封装axios实例
//引入axios
import axios from 'axios'
import { getToken, removeToken } from './token'
import { history } from './history'

//创建axios实例
const http = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000
})

//请求拦截器
http.interceptors.request.use(config => {
  //请求发送之前需要处理的方法
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, error => {
  //请求失败
  return Promise.reject(error)
})


http.interceptors.response.use(response => {
  //对响应数据进行处理
  return response
}, error => {
  // 对响应失败进行处理
  // 如果错误状态为401
  if (error.response.status === 401) {
    //删除token
    removeToken()
    //跳转页面到登录页
    history.push('/login')
  }
  return Promise.reject(error)
})

export { http }