/* eslint-disable no-case-declarations */
import blogService from '../services/blogs'

const byLikes = (b1, b2) => b2.likes - b1.likes

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'GET_BLOGS':
    return action.data.sort(byLikes)
  case 'CREATE':
    return [...state, action.data].sort(byLikes)
  case 'LIKE':
    return state
      .map(b => b.id !== action.data.id ? b : action.data)
      .sort(byLikes)
  case 'NEW_COMMENT':
    return state
      .map(b => b.id !== action.data.id ? b : action.data)
      .sort(byLikes)
  case 'REMOVE':
    return state.filter(b => b.id !== action.data.id).sort(byLikes)
  default:
    return state.sort(byLikes)
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const data = await blogService.getAll()
    dispatch({
      type: 'GET_BLOGS',
      data
    })
  }
}

export const removeBlog = (data) => {
  return async (dispatch) => {
    await blogService.remove(data)
    dispatch({
      type: 'REMOVE',
      data
    })
  }
}

export const createBlog = (content) => {
  return async dispatch => {
    const data = await blogService.create(content)
    dispatch({
      type: 'CREATE',
      data
    })
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const liked = { ...blog, likes: blog.likes + 1 }
    const data = await blogService.update(liked)
    dispatch({
      type: 'LIKE',
      data
    })
  }
}

export const createComment = (blog) => {
  return async dispatch => {
    const data = await blogService.newComment(blog)
    dispatch({
      type: 'NEW_COMMENT',
      data
    })
  }
}

export default blogReducer

// const initialBlogs = [
//   {
//     title: 'React patterns',
//     author: 'Michael Chan',
//     url: 'https://reactpatterns.com/',
//     likes: 7,
//     id: '00001',
//     user: {
//       username: 'push',
//       id: '001',
//       name: 'Elaine'
//     }
//   },
//   {
//     title: 'Go To Statement Considered Harmful',
//     author: 'Edsger W. Dijkstra',
//     url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
//     likes: 5,
//     id: '00002',
//     user: {
//       username: 'push',
//       id: '001',
//       name: 'Elaine'
//     }
//   },
//   {
//     title: 'Canonical string reduction',
//     author: 'Edsger W. Dijkstra',
//     url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
//     likes: 12,
//     id: '00003',
//     user: {
//       username: 'push',
//       id: '001',
//       name: 'Elaine'
//     }
//   },
//   {
//     title: 'First class tests',
//     author: 'Robert C. Martin',
//     url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
//     likes: 10,
//     id: '00004',
//     user: {
//       username: 'push',
//       id: '001',
//       name: 'Elaine'
//     }
//   }
// ]