const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const mongoose = require('mongoose')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(bodyParser.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/users', usersRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app

// const config = require('./utils/config')
// const express = require('express')
// const app = express()
// const bodyParser = require('body-parser')
// const cors = require('cors')
// const mongoose = require('mongoose')

// const { tokenExtractor, errorHandler } = require('./utils/middleware')

// const loginRouter = require('./controllers/login')
// const blogsRouter = require('./controllers/blogs')
// const usersRouter = require('./controllers/users')

// app.use(cors())
// app.use(bodyParser.json())

// console.log('connecting to', config.MONGODB_URI)

// mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('connected to MongoDB')
//   })
//   .catch((error) => {
//     console.log('error connection to MongoDB:', error.message)
//   })

// app.use(tokenExtractor)

// app.use('/api/login', loginRouter)
// app.use('/api/blogs', blogsRouter)
// app.use('/api/users', usersRouter)

// app.use(errorHandler)


// module.exports = app
