import React, { Component } from 'react'
import { Card } from 'antd'
import './index.css'
import logo from '../../assets/logo.png'

export default class Login extends Component {
  render() {
    return (
      <div className="login">
        <Card className="login-container">
          <img className="login-logo" src={logo} alt="" />
        </Card>
      </div>
    )
  }
}
