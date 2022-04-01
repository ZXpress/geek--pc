import {
  // BrowserRouter as Router,
  Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import Home from './pages/Layout/index'
import Login from './pages/Login/index'
import AuthRoute from 'components/AuthRoute/index'

import history from 'utils/history'

function App() {
  return (
    // <Router></Router>
    <Router history={history}>
      <div className="App">
        {/* 配置路由规则 */}
        <Switch>
          {/* <Route
            exact
            path="/"
            render={() => {
              return <Redirect to="/login" />
            }}
          ></Route> */}
          <Redirect exact from="/" to="/login"></Redirect>
          <AuthRoute path="/home" component={Home}></AuthRoute>
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
