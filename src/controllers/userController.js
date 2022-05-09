const ApiError = require('../services/ApiError')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, { expiresIn: '24h' })
}

class UserController {
  async register(req, res, next) {
    try {
      const { email, password } = req.body
      const user = new User({ email, password })
      const { password: pass, ...data } = user.toObject()
      const token = generateJwt(data._id, data.email, data.role)
      await user.save()
      return res.json({ token, user: data })
    } catch (e) {
      console.error(e)
      next(ApiError.badRequest(e))
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body
      if (!email || !password) {
        return next(ApiError.badRequest('Не все поля заполнены'))
      }
      const user = await User.findOne({ email })
      if (!user) {
        return next(ApiError.notFound('Пользователь не найден'))
      }

      let comparePassword = await user.comparePassword(password)
      if (!comparePassword) {
        return next(ApiError.badRequest('Указан неверный пароль'))
      }
      const data = user.toObject()
      const token = generateJwt(data._id, data.email, data.role)
      return res.json({ token, user: data })
    } catch (e) {
      console.error(e)
      next(ApiError.internal(e))
    }
  }

  async getUser(req, res) {
    const user = await User.findById(req.user.id)
    const data = user.toObject()
    const { _id, email } = data
    return res.json({ id: _id, email: email })
  }
}

module.exports = new UserController()
