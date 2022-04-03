import { Card, Breadcrumb, Form, Radio, Button, Space, Input } from 'antd'
import React, { Component } from 'react'
import styles from './index.module.scss'
import { Link } from 'react-router-dom'

export default class ArticlePublish extends Component {
  render() {
    return (
      <div className={styles.root}>
        <Card
          title={
            <Breadcrumb separator=">">
              <Breadcrumb.Item>
                <Link to="/home">首页</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>发布文章</Breadcrumb.Item>
            </Breadcrumb>
          }
        >
          <Form
            labelCol={{ span: 4 }}
            initialValues={{ type: 0 }}
            onFinish={this.onFinish}
            validateTrigger={['onBlur', 'onChange']}
          >
            <Form.Item
              label="标题"
              name="title"
              rules={[
                {
                  required: true,
                  message: '文章标题不能为空',
                },
              ]}
            >
              <Input placeholder="请输入文章标题" style={{ width: 400 }} />
            </Form.Item>
            <Form.Item label="频道" name="channel_id">
              频道组件
            </Form.Item>
            <Form.Item label="封面">
              <Form.Item name="type">
                <Radio.Group onChange={this.changeImageType}>
                  <Radio value={0}>无图</Radio>
                  <Radio value={1}>单图</Radio>
                  <Radio value={3}>三图</Radio>
                  {/* <Radio value={-1}>自动</Radio> */}
                </Radio.Group>
              </Form.Item>
              图片上传组件
            </Form.Item>
            <Form.Item label="内容" name="content">
              文章内容
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 4 }}>
              <Space>
                <Button size="large" type="primary" htmlType="submit">
                  发布文章
                </Button>
                <Button size="large">存入草稿</Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }

  onFinish = (values) => {
    console.log(values)
  }
}
