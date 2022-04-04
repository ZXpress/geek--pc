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
import { getUserProfile } from 'api/user'
const { Header, Content, Sider } = Layout

export default class LayoutComponent extends Component {
  state = {
    profile: {},
    selectedKey: this.props.location.pathname,
  }
  render() {
    return (
      <div className={styles.layout}>
        <Layout>
          <Header className="header">
            <div className="logo" />
            <div className="profile">
              <span>{this.state.profile.name}</span>
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
              {/* defaultSelectedKeys是默认高亮 */}
              {/* selectedKeys是当前选中的高亮 */}
              <Menu
                mode="inline"
                selectedKeys={[this.state.selectedKey]}
                theme="dark"
                style={{ height: '100%', borderRight: 0 }}
              >
                <Menu.Item key="/home" icon={<HomeOutlined />}>
                  <Link to="/home">数据概览</Link>
                </Menu.Item>
                <Menu.Item key="/home/list" icon={<DiffOutlined />}>
                  <Link to="/home/list">内容管理</Link>
                </Menu.Item>
                <Menu.Item key="/home/publish" icon={<EditOutlined />}>
                  <Link to="/home/publish">发布文章</Link>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout style={{ padding: '24px' }}>
              <Content className="site-layout-background">
                <Switch>
                  <Route exact path="/home" component={Home}></Route>
                  <Route path="/home/list" component={ArticleList}></Route>
                  {/* 匹配新增文章的路由 ,增加exact区分两种地址 */}
                  <Route
                    exact
                    path="/home/publish"
                    component={ArticlePublish}
                    key="add"
                  ></Route>
                  {/* 新增修改文章的路由 */}
                  <Route
                    path="/home/publish/:id"
                    component={ArticlePublish}
                    key="edit"
                  ></Route>
                </Switch>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    )
  }

  componentDidUpdate(prevProps) {
    // 判断url是否发生了变化，在if语句中使用setState
    let pathname = this.props.location.pathname
    if (prevProps.location.pathname !== this.props.location.pathname) {
      // 修改文章高亮
      if (pathname.startsWith('/home/publish')) {
        pathname = '/home/publish'
      }
      this.setState({
        selectedKey: pathname,
      })
    }
  }

  async componentDidMount() {
    const res = await getUserProfile()
    // console.log(res)
    this.setState({
      profile: res.data,
    })
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
