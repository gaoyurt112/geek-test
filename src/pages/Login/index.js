import { Card, Form, Input, Button, Checkbox, message } from 'antd'
import logo from '../../assets/logo.png'
import './index.scss'
//引入store仓库
import { useStore } from '../../store/index'
//引入路由跳转
import { useNavigate } from 'react-router-dom'

function Login () {
  //设置路由跳转方法
  const navigate = useNavigate()
  //解构useStore
  const { loginstore } = useStore()
  //设置表单提交的方法 value为收集到的数据
  const onFinish = async (values) => {
    // console.log(values)
    //解构values参数
    const { mobile, code } = values
    try {
      //调用登录请求并传入参数
      await loginstore.login(mobile, code)
      //跳转到成功页
      navigate('/')
    } catch (error) {
      //登陆失败
      message.error(error.response?.data?.message || '登陆失败!')
    }
  }

  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form
          //提交表单
          onFinish={onFinish}
          //表单验证时机
          validateTrigger={['onBlur', 'onChange']}
          //表单内初始值
          initialValues={{
            mobile: '13811111111',
            code: '246810',
            remember: true
          }}
        >
          <Form.Item
            name='mobile'
            rules={[
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '手机号码格式不正确!',
                validateTrigger: 'onBlur'
              },
              { required: true, message: '请输入手机号!' }
            ]}
          >
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item
            name='code'
            rules={[
              {
                len: 6,
                message: '验证码格式不正确!',
                validateTrigger: 'onBlur'
              },
              { required: true, message: '请输入验证码!' }
            ]}
          >
            <Input size="large" placeholder="请输入验证码" maxLength={6} />
          </Form.Item>
          <Form.Item name="remember" valuePropName='checked'>
            <Checkbox className="login-checkbox-label">
              我已阅读并同意「用户协议」和「隐私条款」
            </Checkbox>
          </Form.Item>

          <Form.Item>
            {/* <!-- 渲染Button组件为submit按钮 --> */}
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}


export default Login