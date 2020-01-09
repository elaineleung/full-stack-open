const blogs = [
  {
    id: '5a451df7571c224a31b5c8ce',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'test',
      name: 'test'
    }
  },
  {
    id: '5a451e21e0b8b04a45638211',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'test',
      name: 'test'
    }
  },
  {
    id: '5a451e30b5ffd44a58fa79ab',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'test',
      name: 'test'
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

// let token = null

const setToken = newToken => {
  jest.fn()
  console.log(newToken)
  //token = `bearer ${newToken}`
}

export default { getAll, setToken }