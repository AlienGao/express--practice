var { expressjwt: jwt } = require('express-jwt')
const key = 'express-practice'
// 所有接口除/login和/get_code不需要token认证
const jwtauth = jwt({ secret: key, algorithms: ['HS256'] }).unless({
  path: ['/api/login', '/api/get_code', '/api/register_user'],
})
module.exports = jwtauth
