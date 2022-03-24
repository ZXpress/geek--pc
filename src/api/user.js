import request from 'utils/request'

/**
 * 登录请求
 * @param {String} mobile 手机号
 * @param {String} code 验证码
 * @returns Promise
 */
export const login = (mobile, code) => {
  return request({
    method: 'post',
    url: '/authorizations',
    data: {
      mobile,
      code,
    },
  })
}
