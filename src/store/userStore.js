import { http } from "@/utils"
import { makeAutoObservable } from "mobx"

class UserStore {
  userInfo = {}
  constructor() {
    makeAutoObservable(this)
  }

  getUserInfo = async () => {
    const res = await http.get('/user/profile')
    console.log(res)
    this.userInfo = res.data.data
  }
}
const userStore = new UserStore()

export default userStore 