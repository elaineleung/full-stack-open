const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { url:1, title:1, author:1 })
  response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body
    const password = body.password

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    if (password.length > 3) {
      const savedUser = await user.save()
      response.json(savedUser)
    } else if (password===undefined || password.length===0) {
      response.status(400).json({
        error: 'Input error: missing password'
      })
    } else if (password.length < 4) {
      response.status(400).json({
        error: 'Validation error: password needs to have more than 3 characters.'
      })
    }
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter

// const bcrypt = require('bcrypt')
// const usersRouter = require('express').Router()
// const User = require('../models/user')

// usersRouter.get('/', async (request, response) => {
//   const users = await User
//     .find({}).populate('blogs', { author: 1, title: 1, url: 1 })

//   response.json(users.map(u => u.toJSON()))
// })

// usersRouter.post('/', async (request, response, next) => {
//   try {
//     const { username, password, name } = request.body

//     if (!password || password.length<3 ) {
//       return response.status(400).send({
//         error: 'password minimum length is 3'
//       })
//     }

//     const saltRounds = 10
//     const passwordHash = await bcrypt.hash(password, saltRounds)

//     const user = new User({
//       username,
//       name,
//       passwordHash,
//     })

//     const savedUser = await user.save()

//     response.json(savedUser)
//   } catch (exception) {
//     next(exception)
//   }
// })

// module.exports = usersRouter