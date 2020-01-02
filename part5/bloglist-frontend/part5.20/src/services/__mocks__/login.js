const users = [
  {
    id: '5a437a9e514ab7f168ddf138',
    username: 'test',
    name: 'test',
    password: 'sardines'
  }
]

const login = () => {
  return Promise.resolve(users)
}

export default { login }