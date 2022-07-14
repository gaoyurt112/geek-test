//导入mobx响应式组件
import { observer } from 'mobx-react-lite'
//导入antd组件
import { Layout, Menu, Popconfirm } from 'antd'
//导入antd图标
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import './index.scss'
//引入二级路由模块
import { useNavigate, Outlet, useLocation } from 'react-router-dom'

//引入hooks
import { useEffect } from 'react'

//引入store
import { useStore } from '@/store'
import loginstore from '@/store/loginStore'


const { Header, Sider } = Layout

function GeekLayout () {
  //解构store
  const { userStore } = useStore()

  //设置路由跳转方法
  const navigate = useNavigate()
  //定义一个变量接收当前url信息
  const localationUrl = useLocation()
  // console.log(localationUrl)
  //菜单选中高亮的值等于当前url地址名称
  const selectedKeys = localationUrl.pathname

  //页面加载调用获取用户信息
  useEffect(() => {
    userStore.getUserInfo()

  }, [userStore])

  //用户退出登录
  const userLogout = () => {
    loginstore.logout()
    navigate('/login')
  }

  return (
    <div>
      <Layout>
        <Header className="header">
          {/* logo区域 */}
          <div className="logo" />
          {/* 用户信息 */}
          <div className="user-info">
            {/* 用户名 */}
            <span className="user-name">{userStore.userInfo.name}</span>
            {/* 退出登录 */}
            <span className="user-logout">
              {/* 退出登录弹窗 */}
              <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={userLogout}>
                <LogoutOutlined /> 退出
              </Popconfirm>
            </span>
          </div>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            {/* 菜单 */}
            <Menu
              mode="inline"
              theme="dark"
              defaultSelectedKeys={['1']}
              // 菜单选择高亮
              selectedKeys={selectedKeys}
              style={{ height: '100%', borderRight: 0 }}
              items={[
                {
                  key: '/',
                  icon: <HomeOutlined />,
                  label: '数据概览',
                  onClick: function () { navigate('/') }
                },
                {
                  key: '/artical',
                  icon: <DiffOutlined />,
                  label: '内容管理',
                  onClick: function () { navigate('artical') }
                },
                {
                  key: '/publish',
                  icon: <EditOutlined />,
                  label: '发布文章',
                  onClick: function () { navigate('publish') }
                }
              ]}
            >
            </Menu>
          </Sider>
          <Layout className="layout-content" style={{ padding: 20 }}>
            {/* 二级路由出口 */}
            <Outlet></Outlet>
          </Layout>
        </Layout>
      </Layout>
    </div>
  )
}

// observer需要小写否则报错
export default observer(GeekLayout)