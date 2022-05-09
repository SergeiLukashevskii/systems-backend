const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const validateEmail = function (email) {
  const re = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/
  return re.test(email)
}

const validatePassword = function (password) {
  const re = /^[\S]{5,18}$/
  return re.test(password)
}

const schema = new mongoose.Schema(
  {
    email: { type: String, required: true, unuqie: true, trim: true, validate: [validateEmail, 'Please fill a valid email address'] },
    password: {
      type: String,
      required: true,
      validate: [validatePassword, 'The password cannot contain spaces and must be between 5 and 18 characters'],
    },
    role: { type: String, default: 'USER' }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
)

schema.pre('save', function (next) {
  bcrypt.hash(this.password, 10, (err, hash) => {
    this.password = hash
    next()
  })
})

schema.pre('update', function (next) {
  bcrypt.hash(this.password, 10, (err, hash) => {
    this.password = hash
    next()
  })
})

schema.post('save', function (error, doc, next) {
  console.log(error)
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('User already exist'))
  } else {
    next(error)
  }
})

schema.methods.comparePassword = function (candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(String(candidatePassword), this.password, (err, success) => {
      if (err) return reject(err)
      return resolve(success)
    })
  })
}

schema.set('toObject', {
  transform: function (doc, ret) {
    delete ret.__v
    delete ret.password
  }
})

module.exports = mongoose.model('User', schema)
