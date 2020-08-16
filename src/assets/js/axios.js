// axios.js 放入如下
import axios from 'axios'
import Qs from 'qs'
import Message from 'element-ui/packages/message/src/main'

axios.defaults.withCredentials = true // 若跨域请求需要带 cookie 身份识别
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (config.method === 'post') {
      // config.headers = {
      //   'Content-Type': 'application/x-www-form-urlencoded'
      // }
    } else if (config.method === 'get') {
      // 如果是get请求 url中拼接上
      config.headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// http response 拦截器
axios.interceptors.response.use(
  // token 可以判断已过期，重定向到登录页面
  response => {
    if (response.data.code !== 0) {
      if (response.data.code === 1) {
        Message({
          showClose: true,
          message: response.data.msg,
          type: 'error'
        })
      } else if (response.data.code === 2) {
        if (response.data.data.redirect_url) {
          window.location.href = response.data.data.redirect_url + '?refer=' + encodeURIComponent(window.location.href)
        } else {
          Message({
            showClose: true,
            message: '鉴权失败，请先登录',
            type: 'error'
          })
        }
      }
      if (process.env.NODE_ENV === 'development') {
        console.log(response)
      }
      return response
    }
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * 封装get方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export function get (url, params) {
  return new Promise((resolve, reject) => {
    axios({
      url: url,
      method: 'GET',
      params: params
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios({
      url: url,
      method: 'POST',
      data: data,
      transformRequest: [
        function (data) {
          let ret = ''
          for (const it in data) {
            if (data[it] instanceof Array) {
              // 处理数组参数
              ret += Qs.stringify({ [it]: data[it] }, { arrayFormat: 'repeat' }) + '&'
            } else {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
          }
          return ret
        }
      ],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * from 表单
 */
export function getFrom (URL, PARAMS) {
  var p = new Promise((resolve, reject) => {
    // 做一些异步操作
    var temp = document.createElement('form')
    temp.action = URL
    temp.method = 'get'
    temp.style.display = 'none'
    for (var x in PARAMS) {
      var opt = document.createElement('textarea')
      opt.name = x
      opt.value = PARAMS[x]
      temp.appendChild(opt)
    }
    document.body.appendChild(temp)
    temp.submit()
    this.$Loading.finish()
    resolve(temp)
  })
  return p
}

/**
 * 上传 excel
 */

export function upExcel (URL, PARAMS) {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }

    axios
      .post(URL, PARAMS, config)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function upLoadFile (URL, PARAMS, data) {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    axios({
      url: URL,
      method: 'POST',
      data: PARAMS,
      ...config
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function upLoadFileToOSS (URL, PARAMS, data) {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: false
    }
    axios({
      url: URL,
      method: 'POST',
      data: data,
      params: PARAMS,
      ...config
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
