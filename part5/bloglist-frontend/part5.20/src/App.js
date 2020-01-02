import React, { useState, useEffect } from 'react'
import { useField } from './hooks'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const newBlogTitle = useField('text')
  const newBlogAuthor = useField('text')
  const newBlogUrl = useField('text')
  const username = useField('text')
  const password = useField('password')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: null })

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (message, type='success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification({ message: null }), 5000)
  }

  const handleLogin = async(event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username: username.value, password: password.value })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      username.reset()
      password.reset()
    } catch (exception) {
      notify('Wrong credentials, please try again.', 'error')
      setTimeout(() => {
        setNotification({ message: null })
      }, 5000)
    }
  }

  const addBlog = event => {
    event.preventDefault()
    const blogObject = {
      title: newBlogTitle.value,
      author: newBlogAuthor.value,
      url: newBlogUrl.value,
      date: new Date(),
      likes: 0,
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        newBlogTitle.reset()
        newBlogAuthor.reset()
        newBlogUrl.reset()
        notify(`A new blog "${returnedBlog.title}" was successfully added!`)
      })
  }

  const handleLike = id => {
    const blog = blogs.find(b => b.id === id)

    let num = blog.likes
    const changedBlog = { ...blog, likes: num+=1 }

    blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id? blog : returnedBlog ))
      })
      .catch(() => {
        alert(
          `The blog '${blog.title}' was already deleted from server`
        )
        setTimeout(() => {
          setNotification(null)
        }, 5000)
        setBlogs(blogs.filter(b => b.id !== id))
      })
  }

  const removeEntry = id => {
    const removeBlog = blogs.find(b => b.id === id)
    const ok = window.confirm(`Are you sure you want to delete the post "${removeBlog.title}"?`)

    if (ok) {
      blogService
        .remove(id)
        .then(() => {
          setBlogs(blogs.filter( b => b.id !== id))
          notify(`The post "${removeBlog.title}" has been deleted.`, 'success')
        })
        .catch(() => {
          notify(
            `The post "${removeBlog.title}" has already been removed from the server.`, 'error'
          )
          setBlogs(blogs.filter( b => b.id !== id))
        })
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const sorted = blogs.sort((a, b) => parseFloat(b.likes) - parseFloat(a.likes))

  const showBlogs = () => sorted.map(blog =>
    <Blog
      key={blog.id}
      blog={blog}
      handleLike={handleLike}
      removeEntry={removeEntry}
      user={user}
    />
  )

  return (
    <div className='container'>
      {user === null ?
        <div>
          <h2>Login to the application</h2>
          <Notification notification={notification} />
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            password={password}
            // setUsername={setUsername}
            // setPassword={setPassword}
          />
        </div>
        :
        <section>
          <h2>Blogs</h2>
          <Notification notification={notification} />
          <p>{user.name} is logged in. <button className="button" onClick={handleLogOut}>Logout</button></p>
          <h3>Create new</h3>
          <Toggleable buttonLabel="New post">
            <BlogForm
              // handleTitleChange={handleTitleChange}
              // handleAuthorChange={handleAuthorChange}
              // handleUrlChange={handleUrlChange}
              newBlogTitle={newBlogTitle}
              newBlogAuthor={newBlogAuthor}
              newBlogUrl={newBlogUrl}
              addBlog={addBlog}
            />
          </Toggleable>
          <div className="element">{showBlogs()}</div>
        </section>
      }
    </div>
  )
}

export default (App)
