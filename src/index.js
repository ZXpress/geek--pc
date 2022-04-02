import React from 'react'
import ReactDOM from 'react-dom'
// 导入antd的全局样式
import 'antd/dist/antd.css'

import './index.css'
import App from './App'

// 全局配置antd中文
import { ConfigProvider } from 'antd'
import 'moment/locale/zh-cn'
import locale from 'antd/lib/locale/zh_CN'

ReactDOM.render(
  <ConfigProvider locale={locale}>
    <App />
  </ConfigProvider>,
  document.getElementById('root')
)
