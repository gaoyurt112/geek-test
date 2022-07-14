import './App.css'
//引入react路由组件
import { Routes, Route } from 'react-router-dom'
//引入页面组件
import Login from './pages/Login'
import GeekLayout from './pages/Layout'
import Home from './pages/Home'
import Artical from './pages/Artical'
import Publish from './pages/Publish'
//导入路由鉴权组件
import { AuthRoute } from './components/AuthRoute'

//引入history工具
import { history, HistoryRouter } from './utils/history'

function App () {
  return (
    <HistoryRouter history={history}>
      <div className="App">
        <Routes>
          <Route path='/' element={
            <AuthRoute  >
              <GeekLayout></GeekLayout>
            </AuthRoute>
          }>
            <Route index element={<Home></Home>}></Route>
            <Route path='artical' element={<Artical></Artical>}></Route>
            <Route path='publish' element={<Publish></Publish>}></Route>
          </Route>
          <Route path='/login' element={<Login></Login>}></Route>

        </Routes>
      </div>
    </HistoryRouter>
  )
}

export default App
