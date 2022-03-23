import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './pages/Layout/index'
import Login from './pages/Login/index'
function App() {
  return (
    <Router>
      <div className="App">
        {/* <Link to="/login">登录</Link>
        <Link to="/home">首页</Link> */}

        {/* 配置路由规则 */}
        <Switch>
          <Route path="/home" component={Home}></Route>
          <Route path="/login" component={Login}></Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
