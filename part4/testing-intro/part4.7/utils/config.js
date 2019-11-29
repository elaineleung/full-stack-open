require('dotenv').config()

let PORT = process.env.PORT
let mongoUrl = process.env.MONGODB_URI

module.exports = {
  mongoUrl,
  PORT
}