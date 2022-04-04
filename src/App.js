import {
  // BrowserRouter as Router,
  Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import React, { Suspense } from 'react'
import history from 'utils/history'
import AuthRoute from 'components/AuthRoute/index'

// import Home from './pages/Layout/index'
// import Login from './pages/Login/index'

// 懒加载
const Login = React.lazy(() => import('pages/Login'))
const Home = React.lazy(() => import('pages/Home'))

function App() {
  return (
    // <Router></Router>
    <Router history={history}>
      <div className="App">
        {/* 配置路由规则 */}
        {/* fallback:兜底，如果组件没有加载默认回现实fallback内容 */}
        <Suspense fallback={<div>loading...</div>}>
          <Switch>
            {/* <Route
            exact
            path="/"
            render={() => {
              return <Redirect to="/login" />
            }}
          ></Route> */}
            <Redirect exact from="/" to="/home"></Redirect>
            <AuthRoute path="/home" component={Home}></AuthRoute>
            {/* <Route path="/login" component={Login}></Route> */}
            <Route
              path="/login"
              render={(props) => {
                return <Login {...props} />
              }}
            ></Route>
          </Switch>
        </Suspense>
      </div>
    </Router>
  )
}

export default App
