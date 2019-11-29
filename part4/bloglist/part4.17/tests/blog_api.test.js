const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    let savedBlog = await blogObject.save()
    savedBlog.toJSON()
  }
})

// test('blogs are returned', async () => {
//   const response = await api.get('/api/blogs')
//   expect(response.body.length).toBe(helper.initialBlogs.length)
// })
describe('testing a collection of posts saved', () => {
  test('blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(helper.initialBlogs.length)
  })

  test('unique property of blogs is named id', async () => {
    const blogs = await helper.blogsInDb()
    const blog = blogs[0]
    expect(blog.id).toBeDefined()
  })

  describe('adding posts', () => {
    test('a valid blog can be added ', async () => {
      const newBlog = {
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2
      }
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

      const titles = blogsAtEnd.map(n => n.title)
      expect(titles).toContain('Type wars')
    })

    test('blog with no likes props can have likes = 0 added ', async () => {
      const newBlog = {
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html'
      }
      const addLikes = { ...newBlog, likes:0 }
      expect(!newBlog.likes).toBeDefined()
      // expect
      if (!newBlog.likes) {
        await api
          .post('/api/blogs')
          .send(addLikes)
          .expect(200)
          .expect('Content-Type', /application\/json/)
      }

      const blogsAtEnd = await helper.blogsInDb()
      const lastBlog = blogsAtEnd[blogsAtEnd.length - 1]
      expect(lastBlog.likes).toBe(0)
    })

    test('blog without url and title is not added', async () => {
      const newBlog = {
        author: 'Robert C. Martin',
        likes: 3
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
    })
  })
  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd.length).toBe(
        helper.initialBlogs.length - 1
      )

      const titles = blogsAtEnd.map(r => r.title)
      expect(titles).not.toContain(blogToDelete.title)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})