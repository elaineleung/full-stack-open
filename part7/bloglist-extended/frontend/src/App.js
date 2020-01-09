import React, { useEffect } from 'react'
import { useField } from './hooks'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container, Header } from 'semantic-ui-react'

import Home from './components/Home'
import Login from './components/Login'
import Blog from './components/Blog'
import Nav from './components/Nav'
import Notification from './components/Notification'
import UserList from './components/UserList'
import User from './components/User'

import blogService from './services/blogs'
import loginService from './services/login'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { setNotification, clearNotification } from './reducers/notificationReducer'
import { setUser } from './reducers/loginReducer'

const App = (props) => {
  const [username, usernameReset] = useField('text')
  const [password, passwordReset] = useField('password')

  useEffect(() => {
    props.initializeBlogs()
    props.initializeUsers()
    // eslint-disable-next-line
  },[])

  // This is for saving the user to the browser
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.setUser(user)
      blogService.setToken(user.token)
    }
    // eslint-disable-next-line
  }, [])

  const handleLogin = async(event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      props.setUser(user)
      usernameReset()
      passwordReset()
      props.clearNotification()
    } catch (exception) {
      props.setNotification('Sorry, wrong credentials. Please try again!', 5)
    }
  }

  return (
    <Container>
      <Router>
        { ((props.loggedUser === null) || !props.loggedUser.username ) ?
          <Login
            password={password}
            username={username}
            handleLogin={handleLogin}
          />
          :
          <div>
            <Nav />
            <div className='container'>
              <div className='spacing'>
                <Header as='h1'>Blog App</Header>

                <Notification />

              </div>
              <Route exact path="/" render={() => <Home />} />
              <Route exact path="/users" render={() => <UserList />} />
              <Route exact path="/users/:id" render={({ match }) =>
                <User users={props.users} selectedUser={props.users.find( u => u.id === match.params.id)} />}
              />
              <Route exact path="/blogs/:id" render={({ match }) =>
                <Blog blogs={props.blogs} selectedBlog={props.blogs.find(b => b.id === match.params.id)} />}
              />
            </div>
          </div>
        }
      </Router>
    </Container>
  )
}



const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser,
    users: state.users,
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  setNotification,
  clearNotification,
  initializeBlogs,
  initializeUsers,
  setUser
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)



// import React, { useState, useEffect } from 'react'
// import { useField } from './hooks'
// // import Blog from './components/Blog'
// import { connect } from 'react-redux'
// import LoginForm from './components/LoginForm'
// import NewBlog from './components/NewBlog'
// import BlogList from './components/BlogList'
// import Notification from './components/Notification'
// import Toggleable from './components/Toggleable'
// import blogService from './services/blogs'
// import loginService from './services/login'
// import { setNotification, removeNotification } from './reducers/notificationReducer'
// import { initializeBlogs } from './reducers/blogReducer'


// const App = (props) => {
//   const store = props.store

//   // const [blogs, setBlogs] = useState([])
//   const [username] = useField('text')
//   const [password] = useField('password')
//   const [user, setUser] = useState(null)

//   useEffect(() => {
//     props.initializeBlogs()
//   },[])

//   // useEffect(() => {
//   //   blogService
//   //     .getAll()
//   //     .then(initialBlogs => {
//   //       setBlogs(initialBlogs)
//   //     })
//   // }, [])

//   useEffect(() => {
//     const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
//     if (loggedUserJSON) {
//       const user = JSON.parse(loggedUserJSON)
//       setUser(user)
//       blogService.setToken(user.token)
//     }
//   }, [])

//   // const notify = (message, type='success') => {
//   //   setNotification({ message, type })
//   //   setTimeout(() => setNotification({ message: null }), 5000)
//   // }

//   const handleLogin = async(event) => {
//     event.preventDefault()
//     try {
//       const user = await loginService.login({
//         username: username.value,
//         password: password.value
//       })

//       window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
//       blogService.setToken(user.token)
//       setUser(user)
//     } catch (exception) {
//       store.dispatch(setNotification('Sorry, wrong credentials. Please try again!'))
//       setTimeout(() => store.dispatch(removeNotification('')), 5000)
//     }
//   }

//   const handleLogOut = () => {
//     window.localStorage.removeItem('loggedBlogAppUser')
//     blogService.destroyToken()
//     setUser(null)
//   }

//   // const createBlog = async blog => {
//   //   event.preventDefault()
//   //   const blogObject = {
//   //     title: newBlogTitle.value,
//   //     author: newBlogAuthor.value,
//   //     url: newBlogUrl.value,
//   //     date: new Date(),
//   //     likes: 0,
//   //   }
//   // }
//   //   const createdBlog = await blogService.create(blog)
//   //   newBlogRef.current.toggleVisibility()
//   //   setBlogs(blogs.concat(createdBlog))
//   //   notify(`A new blog "${createdBlog.title}" by ${createdBlog.author} was added.`)
//   // }

//   // const likeBlog = async (blog) => {
//   //   const likedBlog = {
//   //     ...blog,
//   //     likes: blog.likes + 1,
//   //   }
//   //   console.log(likedBlog)
//   // const updatedBlog = await blogService.update(likedBlog)
//   // setBlogs(blogs.map(b => b.id === blog.id ? updatedBlog : b))
//   // notify(`A 'like' was added for "${updatedBlog.title}" by "${updatedBlog.author}"!`)
//   // }

//   // const likeBlog = id => {
//   //   const blog = blogs.find(b => b.id === id)

//   //   let num = blog.likes
//   //   const changedBlog = { ...blog, likes: num+=1 }

//   //   blogService
//   //     .update(id, changedBlog)
//   //     .then(returnedBlog => {
//   //       setBlogs(blogs.map(blog => blog.id !== id? blog : returnedBlog ))
//   //     })
//   //     .catch(() => {
//   //       alert(
//   //         `The blog '${blog.title}' was already deleted from server`
//   //       )
//   //       setTimeout(() => {
//   //         setNotification(null)
//   //       }, 5000)
//   //       setBlogs(blogs.filter(b => b.id !== id))
//   //     })
//   // }


//   // }

//   if (user === null) {
//     return (
//       <section className='container'>
//         <h2>Log in to application</h2>

//         <Notification store={store} />
//         <LoginForm
//           handleLogin={handleLogin}
//           username={username}
//           password={password}/>

//       </section>
//     )
//   }

//   // const removeEntry = id => {
//   //   const removeBlog = blogs.find(b => b.id === id)
//   //   const ok = window.confirm(`Are you sure you want to delete the post "${removeBlog.title}"?`)

//   //   if (ok) {
//   //     blogService
//   //       .remove(id)
//   //       .then(() => {
//   //         setBlogs(blogs.filter( b => b.id !== id))
//   //         notify(`The post "${removeBlog.title}" has been deleted.`, 'success')
//   //       })
//   //       .catch(() => {
//   //         notify(
//   //           `The post "${removeBlog.title}" has already been removed from the server.`, 'error'
//   //         )
//   //         setBlogs(blogs.filter( b => b.id !== id))
//   //       })
//   //   }
//   // }

//   const newBlogRef = React.createRef()

//   // const byLikes = (b1, b2) => b2.likes - b1.likes
//   // // const sorted = blogs.sort((a, b) => parseFloat(b.likes) - parseFloat(a.likes))

//   // const showBlogs = () => blogs.sort(byLikes).map(blog =>
//   //   <Blog
//   //     key={blog.id}
//   //     blog={blog}
//   //     like={likeBlog}
//   //     remove={removeBlog}
//   //     user={user}
//   //     creator={blog.user.username === user.username}
//   //   />
//   // )

//   // creator is a boolean and is used for determining whether the remove button is shown

//   return (
//     <div className='container'>
//       <section>
//         <h2>Blogs</h2>

//         <Notification store={store} />

//         <p>{user.name} is logged in. <button className="button" onClick={handleLogOut}>Logout</button></p>
//       </section>
//       <section>
//         <h3>Create new</h3>

//         <Toggleable buttonLabel='Create new' ref={newBlogRef}>
//           <NewBlog store={store} user={user} />
//         </Toggleable>

//         <div className="element">
//           <BlogList store={store} user={user} />
//         </div>
//       </section>
//     </div>
//   )
// }

// export default connect(null, { initializeBlogs })(App)
