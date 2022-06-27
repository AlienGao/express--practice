// 引用用户模版数据
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')

const userController = {
  // showUser 获取用户数据并返回到页面
  showUser: async function (req, res, next) {
    try {
      let userData = await User.all()
      res.json({
        code: 200,
        message: '操作成功',
        data: userData,
      })
    } catch (e) {
      res.json({ code: 0, message: '操作失败', data: e })
    }
  },
  registerUser: async function (req, res, next) {
    try {
      let allUser = await User.all()
      console.log(allUser.find((a) => a.name === req.body.name))
      let userData = req.body
      if (userData.name && userData.password) {
        let repeatName = allUser.find((a) => a.name === req.body.name)
        if (repeatName) {
          throw '账号名重复'
        } else {
          await User.insert(userData)
        }
      }
      res.json({
        code: 200,
        message: '操作成功',
      })
    } catch (e) {
      res.status(400).json({ message: '操作失败', data: e })
    }
  },
  login: async function (req, res, next) {
    let allUser = await User.all()
    let reqUser = req.body
    let objUser = allUser.find((a) => a.name === reqUser.name)
    try {
      if (objUser) {
        if (objUser.password !== reqUser.password) {
          throw '密码输入错误'
        } else if (!req.session.captcha) {
          throw '验证码失效'
        } else if (
          reqUser.code.toLowerCase() !== req.session.captcha.toLowerCase()
        ) {
          throw '验证码输入错误'
        } else {
          const playload = {
            name: reqUser.name
          }
          const secret = 'express-practice'
          const token = jwt.sign(playload, secret, { expiresIn: '1day' })
          res.json({
            code: 200,
            message: '操作成功',
            token,
          })
        }
      } else {
        throw '用户不存在'
      }
    } catch (e) {
      res.status(400).json({
        message: '操作失败',
        data: e,
      })
    }
  },
}

module.exports = userController
