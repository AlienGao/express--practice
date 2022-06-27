var express = require('express');
var router = express.Router();
const userController = require('../controllers/user')
var svgCaptcha = require('svg-captcha')
/* GET users listing. */
router.get('/get_user', userController.showUser)

router.get('/get_code', function(req, res) {
  var captcha = svgCaptcha.create({
    size: 4,
    ignoreChars: '0o1iIl',
    noise: 3,
    color: true,
    fontSize: 50
  })
  req.session.captcha = captcha.text
  res.type('svg')
  res.status(200).send(captcha.data)
})

router.post('/register_user', userController.registerUser)

router.post('/login', userController.login)

module.exports = router;
