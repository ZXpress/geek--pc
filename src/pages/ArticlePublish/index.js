import {
  Card,
  Breadcrumb,
  Form,
  Radio,
  Button,
  Space,
  Input,
  Upload,
  Modal,
  message,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Component, createRef } from 'react'
import styles from './index.module.scss'
import { Link } from 'react-router-dom'
import Channel from 'components/Chanel'
import { baseURL } from 'utils/request'
import { addArticle } from 'api/article'

// react-quill富文本编辑器
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

export default class ArticlePublish extends Component {
  state = {
    // 文章的封面类型
    type: 1,
    // 用于控制上传的图片及显示
    fileList: [],
    showPreview: false,
    previewUrl: '',
  }
  formRef = createRef()
  render() {
    return (
      <div className={styles.root} ref={(node) => (this.node = node)}>
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
            ref={this.formRef}
            labelCol={{ span: 4 }}
            initialValues={{ type: this.state.type, content: '' }}
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
            <Form.Item
              label="频道"
              name="channel_id"
              rules={[
                {
                  required: true,
                  message: '频道不能为空',
                },
              ]}
            >
              <Channel></Channel>
            </Form.Item>
            <Form.Item label="封面" name="type">
              <Radio.Group onChange={this.changeType}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>

            {/* <Form.Item label="上传"> */}
            {this.state.type !== 0 && (
              <Form.Item wrapperCol={{ offset: 4 }}>
                {/* 
                    fileList:控制文件列表
                    action:控制上传的url 
                    name:用于制定名字
                */}
                <Upload
                  listType="picture-card"
                  fileList={this.state.fileList}
                  action={`${baseURL}upload`}
                  name="image"
                  onChange={this.uploadImage}
                  maxCount={this.state.type}
                  onPreview={this.handlePreview}
                  beforeUpload={this.beforeUpload}
                >
                  {/* {this.state.fileList.length < this.state.type && (
                    <PlusOutlined></PlusOutlined>
                  )} */}
                  <PlusOutlined></PlusOutlined>
                </Upload>
              </Form.Item>
            )}

            <Form.Item
              label="内容"
              name="content"
              rules={[
                {
                  required: true,
                  message: '文章内容不能为空',
                },
              ]}
            >
              <ReactQuill
                theme="snow"
                placeholder="请输入文章内容..."
              ></ReactQuill>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 4 }}>
              <Space>
                <Button size="large" type="primary" htmlType="submit">
                  发布文章
                </Button>
                <Button size="large" onClick={this.addDraft}>
                  存入草稿
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>

        {/* 用于显示预览图片弹窗 */}
        <Modal
          visible={this.state.showPreview}
          title={'图片预览'}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img
            alt="example"
            style={{ width: '100%' }}
            src={this.state.previewUrl}
          />
        </Modal>
      </div>
    )
  }

  componentDidMount() {
    this.node.scrollIntoView()
  }

  changeType = (e) => {
    console.log(e.target.value)
    this.setState({
      type: e.target.value,
      fileList: [],
    })
  }

  uploadImage = ({ fileList }) => {
    // console.log(fileList)
    // 把fileList修改到state中
    this.setState({
      fileList,
    })
  }

  handlePreview = (file) => {
    console.log(file)
    this.setState({
      showPreview: true,
      previewUrl: file.url || file.response.data.url,
    })
  }

  // 图片上传之前的检验
  beforeUpload = (file) => {
    // 判断图片不能超过500kb
    if (file.size >= 1024 * 500) {
      message.warn('上传的图片不能超过500kb')
      // 不要返回false，返回Upload.LIST_IGNORE图片才不会上传    看文档
      return Upload.LIST_IGNORE
    }
    if (!['image/png', 'image/jpeg'].includes(file.type)) {
      message.warn('只能上传jpg或者png图片')
      return Upload.LIST_IGNORE
    }
    return true
  }

  handleCancel = () => {
    this.setState({
      showPreview: false,
      previewUrl: '',
    })
  }

  save = async (values, draft) => {
    const { fileList, type } = this.state
    if (fileList.length !== type) {
      return message.warn('上传的图片数量不正确')
    }
    const images = fileList.map((item) => {
      return item.url || item.response.data.url
    })
    // 添加文章
    await addArticle(
      {
        ...values,
        cover: {
          type,
          images,
        },
      },
      draft
    )
    message.success('添加成功')
    this.props.history.push('/home/list')
  }

  onFinish = async (values) => {
    this.save(values, false)
  }

  // 添加草稿
  addDraft = async () => {
    const values = await this.formRef.current.validateFields()
    this.save(values, true)
  }
}
