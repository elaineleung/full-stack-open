import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
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
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const notify = (message, type='success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification({ message: null }), 5000)
  }

  const handleLogin = async(event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('') 
      } catch (exception) {
        notify('Wrong credentials, please try again.', 'error')
        setTimeout(() => {
          setNotification({ message: null })
      }, 5000)
    }
  }

  const handleTitleChange = event => {
    setNewBlogTitle(event.target.value)
  }

  const handleAuthorChange = event => {
    setNewBlogAuthor(event.target.value)
  }

  const handleUrlChange = event => {
    setNewBlogUrl(event.target.value)
  }

  const addBlog = event => {
    event.preventDefault()
    const blogObject = {
  // no id here, allow server to generate id
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
      date: new Date(),
    }
 // axios posts newNote to server
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlogTitle('')
        setNewBlogAuthor('')
        setNewBlogUrl('')
        notify(`A new blog "${returnedBlog.title}" was successfully added!`)  
      })
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedNoteAppUser')
    setUser(null)
  }

  const showBlogs = () => blogs.map(blog =>
    <Blog
      key={blog.id}
      blog={blog}
    />
  )

  return (
    <div className='container'>
      {user === null ?
      <div>
        <h2>Log in to the application</h2>
        <Notification notification={notification} />
        <LoginForm 
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword} 
        />
      </div>
      :
      <section>
        <h2>Blogs</h2>
        <Notification notification={notification} />
        <p>{user.name} is logged in. <button onClick={handleLogOut}>Logout</button></p>
        <h3>Create new</h3>
        <BlogForm 
          handleTitleChange={handleTitleChange}
          handleAuthorChange={handleAuthorChange}
          handleUrlChange={handleUrlChange}
          newBlogTitle={newBlogTitle}
          newBlogAuthor={newBlogAuthor}
          newBlogUrl={newBlogUrl}
          addBlog={addBlog}
        />  
        <div className="element">{showBlogs()}</div>
      </section>
      }
    </div>
  );
}

export default App;
