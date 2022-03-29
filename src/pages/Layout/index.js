import React, { Component } from 'react'
import styles from './index.module.scss'
import { Layout, Menu, message, Popconfirm } from 'antd'
import { Switch, Route, Link } from 'react-router-dom'
import {
  LogoutOutlined,
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
} from '@ant-design/icons'
import Home from 'pages/Home'
import ArticleList from 'pages/ArticleList'
import ArticlePublish from 'pages/ArticlePublish'
import { removeToken } from 'utils/storage'
const { Header, Content, Sider } = Layout

export default class LayoutComponent extends Component {
  render() {
    return (
      <div className={styles.layout}>
        <Layout>
          <Header className="header">
            <div className="logo" />
            <div className="profile">
              <span>用户名</span>
              <span>
                <Popconfirm
                  title="你确定要退出吗"
                  onConfirm={this.onConfirm}
                  // onCancel={cancel}
                  okText="确定"
                  cancelText="取消"
                >
                  <LogoutOutlined
                    style={{ marginRight: '5px', color: 'red' }}
                  />
                  退出
                </Popconfirm>
              </span>
            </div>
          </Header>
          <Layout>
            <Sider width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                theme="dark"
                style={{ height: '100%', borderRight: 0 }}
              >
                <Menu.Item key="1" icon={<HomeOutlined />}>
                  <Link to="/home">数据概览</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<DiffOutlined />}>
                  <Link to="/home/list">内容管理</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<EditOutlined />}>
                  <Link to="/home/publish">发布文章</Link>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout style={{ padding: '24px' }}>
              <Content className="site-layout-background">
                <Switch>
                  <Route exact path="/home" component={Home}></Route>
                  <Route path="/home/list" component={ArticleList}></Route>
                  <Route
                    path="/home/publish"
                    component={ArticlePublish}
                  ></Route>
                </Switch>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    )
  }

  // 退出
  onConfirm = () => {
    // 移除token
    // localStorage.removeItem('token')
    removeToken()
    // 跳转到登陆页
    this.props.history.push('/login')
    message.success('退出成功!')
  }
}
