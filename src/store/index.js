//封装所有store一并导出
import loginstore from "./loginStore"
import userStore from "./userStore"
import React from "react"
class RootStore {
  constructor() {
    this.loginstore = loginstore
    this.userStore = userStore
  }
}

const rootStore = new RootStore()
const context = React.createContext(rootStore)

const useStore = () => React.useContext(context)
export { useStore }