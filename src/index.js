import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
//引入antd样式
import 'antd/dist/antd.min.css'
//引入index样式
import './index.scss'
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // <React.StrictMode>
  <App />
  // {/* </React.StrictMode> */}
)

