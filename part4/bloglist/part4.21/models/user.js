const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    required: true
  },
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ],
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObjects) => {
    returnedObjects.id = returnedObjects._id.toString()
    delete returnedObjects._id
    delete returnedObjects.__v
    delete returnedObjects.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User