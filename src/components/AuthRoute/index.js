import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { hasToken } from 'utils/storage'

export default class AuthRoute extends Component {
  render() {
    // 把接收到的component属性改为render进行渲染
    // ...rest：解构的剩余参数
    const { component: Component, ...rest } = this.props
    return (
      <Route
        {...rest}
        render={(props) => {
          if (hasToken()) {
            // 有token
            return <Component {...props} />
          } else {
            // 没有token跳转到login页面
            // return <Redirect to="/login" />
            props.history.push('/login')
          }
        }}
      ></Route>
    )
  }
}
