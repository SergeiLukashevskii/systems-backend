const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  userId: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  daysCount: {
    required: true,
    type: Number,
    min: 1,
    max: 7
  },
  name: {
    required: true,
    type: String
  },
  exersices: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  }
})

schema.set('toObject', {
  transform: function (doc, ret) {
    delete ret.__v
    ret.id = doc._id
    delete ret._id
  }
})

module.exports = mongoose.model('System', schema)
