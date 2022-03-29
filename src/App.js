import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import Home from './pages/Layout/index'
import Login from './pages/Login/index'
import AuthRoute from 'components/AuthRoute/index'
function App() {
  return (
    <Router>
      <div className="App">
        {/* <Link to="/login">登录</Link>
        <Link to="/home">首页</Link> */}

        {/* 配置路由规则 */}
        <Switch>
          <AuthRoute path="/home" component={Home}></AuthRoute>
          {/* <Route
            path="/home"
            render={() => {
              return <Redirect to="/login" />
            }}
          ></Route> */}
          {/* <Route path="/login" component={Login}></Route> */}
          <Route
            path="/login"
            render={(props) => {
              return <Login {...props} />
            }}
          ></Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
