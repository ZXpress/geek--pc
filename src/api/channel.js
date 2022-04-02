// 封装和频道有关的接口
import request from 'utils/request'

/*
  获取所有的频道
*/
export const getChannels = () => {
  return request.get('/channels')
}
