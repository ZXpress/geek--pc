import React, { Component } from 'react'
import { Card, Form, Input, Button, Checkbox, message } from 'antd'
import './index.scss'
import logo from 'assets/logo.png'
import { login } from 'api/user'

export default class Login extends Component {
  state = {
    loading: false,
  }
  render() {
    return (
      <div className="login">
        <Card className="login-container">
          <img className="login-logo" src={logo} alt="" />
          {/* 表单 */}
          <Form
            size="large"
            validateTrigger={['onChange', 'onBlur']}
            onFinish={this.onFinish}
            initialValues={{
              mobile: '13911111111',
              code: '246810',
              agree: true,
            }}
          >
            <Form.Item
              name="mobile"
              // 配置表单校验规则
              rules={[
                // required 表示表单项为必填项
                { required: true, message: '请输入手机号码' },
                // 注意：此处的配置，仅仅是给出一个校验，不会限制输入的长度
                // { max: 11, message: '手机号码格式不正确' },
                // len 表示这一项的长度
                // message 表示该校验规则失败时，展示给用户的提示
                // { len: 11, message: '手机号码长度为11位' },
                { pattern: /^1[3-9]\d{9}$/, message: '手机号码格式不正确' },
              ]}
            >
              <Input placeholder="请输入手机号" />
            </Form.Item>

            <Form.Item
              name="code"
              rules={[
                { required: true, message: '请输入验证码' },
                {
                  pattern: /^\d{6}$/,
                  message: '请输入正确的验证码',
                },
              ]}
            >
              <Input placeholder="请输入验证码" autoComplete="off"></Input>
            </Form.Item>

            <Form.Item
              valuePropName="checked"
              name="agree"
              rules={[
                {
                  validator: (rule, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(new Error('请同意用户条款')),
                },
              ]}
            >
              <Checkbox>我已阅读并同意[隐私条款]</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
  onFinish = async ({ mobile, code }) => {
    try {
      const res = await login(mobile, code)
      console.log(res)
      // 登陆成功
      // 1.保存token
      localStorage.setItem('token', res.data.token)
      // 2.跳转到首页
      this.props.history.push('/home')
      // 3.提示消息
      message.success('登陆成功!')
    } catch (error) {
      message.error(error.response.data.message)
    }
  }
}
