// 封装和文章相关接口
import request from 'utils/request'

/**
 * 获取文章列表
 * @param {*} params
 * @returns
 */
export const getArticles = (params) => {
  return request({
    url: '/mp/articles',
    method: 'get',
    params,
  })
}

/**
 * 删除文章
 * @param {*} id
 * @returns
 */
export const delArticle = (id) => {
  return request({
    url: `/mp/articles/${id}`,
    method: 'delete',
  })
}

/**
 * 发送请求添加文章
 * @param {*} data
 * @returns
 */
export const addArticle = (data, draft = false) => {
  return request({
    url: `/mp/articles?draft=${draft}`,
    method: 'post',
    data,
  })
}

/**
 * 根据id获取文章详情
 * @param {*} id
 * @returns
 */
export const getArticleById = (id) => {
  return request({
    url: `/mp/articles/${id}`,
    method: 'get',
  })
}

/**
 * 发送请求修改文章
 * @param {*} data
 * @returns
 */
export const updateArticle = (data, draft = false) => {
  return request({
    url: `/mp/articles/${data.id}?draft=${draft}`,
    method: 'put',
    data,
  })
}
