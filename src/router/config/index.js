var apiConfig
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
  apiConfig = require('./dev.js')
} else {
  apiConfig = require('./pro.js')
}

export { apiConfig }
