import { Component } from 'react'
import { Select } from 'antd'
import { getChannels } from 'api/channel'

const { Option } = Select

class Channel extends Component {
  state = {
    channels: [],
  }

  componentDidMount() {
    this.getChannles()
  }

  // 获取频道列表数据的方法
  async getChannles() {
    const res = await getChannels()
    this.setState({
      channels: res.data.channels,
    })
  }

  render() {
    // console.log(this.props)
    const { channels } = this.state

    return (
      <Select
        style={{ width: 200 }}
        allowClear
        placeholder="请选择文章频道"
        value={this.props.value}
        onChange={this.props.onChange}
      >
        {channels.map((item) => (
          <Option key={item.id} value={item.id}>
            {item.name}
          </Option>
        ))}
      </Select>
    )
  }
}

export default Channel
