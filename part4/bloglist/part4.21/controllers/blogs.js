const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
      return response.status(201).json({ Error: 'Token invalid or missing' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      url: body.url,
      title: body.title,
      author: body.author,
      user: user._id,
      likes: body.likes,
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog.toJSON())

  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(201).json({ Error: 'Token invalid or missing' })
    }

    const user = await User.findById(decodedToken.id)
    const userid = user._id

    const blog = await Blog.findById(request.params.id)

    if ( !(blog.user.toString() === userid.toString()) ) {
      response.status(201).json({ Error: 'Only the user who created this entry can delete it!' })
    }
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

// blogsRouter.delete('/:id', async (request, response, next) => {
//   try {
//     await Blog.findByIdAndRemove(request.params.id)
//     response.status(204).end()
//   } catch (exception) {
//     next(exception)
//   }
// })

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog )
    response.json(updatedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }

})

// blogsRouter.post('/', async (request, response, next) => {
//   const blog = new Blog(request.body)

//   try {
//     const savedBlog = await blog.save()
//     response.json(savedBlog.toJSON())
//   } catch (exception) {
//     next (exception)
//   }
// })

module.exports = blogsRouter