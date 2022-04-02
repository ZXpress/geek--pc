import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { ArticleStatus } from 'api/constans'
import styles from './index.module.scss'
import { getChannels } from 'api/channel'
import { getArticles } from 'api/article'
import defaultImg from 'assets/error.png'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

// 日期选择器中文配置
// import 'moment/locale/zh-cn'
// import locale from 'antd/es/date-picker/locale/zh_CN'

import {
  Card,
  Breadcrumb,
  Form,
  Radio,
  Button,
  Select,
  DatePicker,
  Table,
  Tag,
  Space,
} from 'antd'
const { Option } = Select
const { RangePicker } = DatePicker

export default class ArticleList extends Component {
  columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      render: (data) => {
        if (data.type === 0) {
          return (
            <img
              src={defaultImg}
              alt=""
              style={{ width: 200, height: 120, objectFit: 'contain' }}
            />
          )
        }
        return (
          <img
            src={data.images[0]}
            alt=""
            style={{ width: 200, height: 120, objectFit: 'contain' }}
          />
        )
      },
    },
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (status) => {
        const obj = ArticleStatus.find((item) => item.id === status)
        return <Tag color={obj.color}>{obj.name}</Tag>
      },
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate',
    },
    {
      title: '阅读数',
      dataIndex: 'read_count',
    },
    {
      title: '评论数',
      dataIndex: 'comment_count',
    },
    {
      title: '点赞数',
      dataIndex: 'like_count',
    },
    {
      title: '操作',
      render: (data) => {
        return (
          <Space>
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
            ></Button>
            <Button
              type="primary"
              shape="circle"
              danger
              icon={<DeleteOutlined />}
            ></Button>
          </Space>
        )
      },
    },
  ]
  // 用于存放查询文章列表的所有参数
  reqParams = {
    page: 1,
    per_page: 10,
  }
  state = {
    // 频道列表数据
    channels: [],
    // 文章数据
    articles: {},
  }
  render() {
    const { total_count, results, per_page, page } = this.state.articles
    return (
      <div className={styles.root}>
        <Card
          title={
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/home">首页</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>文章列表</Breadcrumb.Item>
            </Breadcrumb>
          }
        >
          <Form initialValues={{ status: -1 }} onFinish={this.onFinish}>
            <Form.Item label="状态" name="status">
              <Radio.Group>
                {ArticleStatus.map((item) => (
                  <Radio key={item.id} value={item.id}>
                    {item.name}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>

            <Form.Item label="频道" name="channel_id">
              <Select
                placeholder="请选择频道"
                style={{ width: 200 }}
                allowClear
              >
                {this.state.channels.map((item) => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="日期" name="date">
              <RangePicker />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
        </Card>

        <Card title={`根据查询条件共查询到 ${total_count} 条结果`}>
          <Table
            columns={this.columns}
            dataSource={results}
            rowKey="id"
            pagination={{
              position: ['bottomCenter'],
              current: page,
              pageSize: per_page,
              total: total_count,
              // 每页大小 或者 页码 改变时，触发的事件
              onChange: this.changePage,
            }}
          />
        </Card>
      </div>
    )
  }

  async componentDidMount() {
    this.getChannelList()
    this.getArticleList()
  }

  // 获取频道数据
  getChannelList = async () => {
    const res = await getChannels()
    this.setState({
      channels: res.data.channels,
    })
  }

  // 获取文章数据
  getArticleList = async () => {
    const res = await getArticles(this.reqParams)
    this.setState({
      articles: res.data,
    })
  }

  // 改变分页
  changePage = (page, pageSize) => {
    this.reqParams.page = page
    this.reqParams.per_page = pageSize
    this.getArticleList()
  }

  onFinish = ({ status, channel_id, date }) => {
    this.reqParams.status = null
    this.reqParams.channel_id = null
    this.reqParams.date = null
    if (status !== -1) {
      this.reqParams.status = status
    }
    if (channel_id !== undefined) {
      this.reqParams.channel_id = channel_id
    }
    if (date) {
      this.reqParams.begin_pubdate = date[0].format('YYYY-MM-DD')
      this.reqParams.end_pubdate = date[1].format('YYYY-MM-DD')
    }

    // 如果是查询的操作，需要让页码值为1
    this.reqParams.page = 1
    this.getArticleList()
    console.log(this.reqParams)
  }
}
