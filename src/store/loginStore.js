//配置登录的仓库
import { http } from "@/utils/index"
import { makeAutoObservable } from "mobx"
//导入持久化token工具函数
import { getToken, setToken, removeToken } from '@/utils/index'

class LoginStore {
  //设置token的初始值为本地token或空
  token = getToken() || ''
  constructor() {
    makeAutoObservable(this)
  }

  //登录的方法
  login = async (mobile, code) => {
    const res = await http.post('/authorizations', {
      mobile,
      code
    })
    // console.log(res)
    //token等于响应的返回的token

    //设置本地token
    setToken(res.data.data.token)
    this.token = res.data.data.token
  }

  //退出登录的方法
  logout = () => {
    //置空token
    this.token = ''
    //清除本地token
    removeToken()
  }


}
const loginstore = new LoginStore()

export default loginstore