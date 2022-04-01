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
            // 跳转到登录页面后把当前地址传过去，登录成功后跳转回去  to属性可以为对象形式
            return (
              <Redirect
                to={{
                  pathname: '/login',
                  // 通过search传参  在url后面
                  // search: '?from=' + props.location.pathname,
                  // 通过state传参  通过在login页面打印this.props中有的location有state
                  state: {
                    from: props.location.pathname,
                  },
                }}
              />
            )
            // props.history.push('/login')
          }
        }}
      ></Route>
    )
  }
}
