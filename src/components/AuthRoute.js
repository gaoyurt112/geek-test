//路由鉴权判断是否登录
//引入获取token的方法
import { getToken } from "@/utils"
//引入路由跳转的方法
import { Navigate } from "react-router-dom"

//创建路由鉴权组件传入参数，参数为登陆成功页
function AuthRoute ({ children }) {
  //获取token
  const isToken = getToken()
  //如果token存在
  if (isToken) {
    //返回组件
    return <>{children}</>
  } else {
    //否则跳转到登录页
    return <Navigate to='/login' replace></Navigate>
  }
}

export { AuthRoute } 