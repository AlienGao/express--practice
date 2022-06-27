const Base = require('./base')

class User extends Base {
  constructor(prop = 'user') {
    super(prop)
  }
}

module.exports = new User()
