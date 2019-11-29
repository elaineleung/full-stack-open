const dummy = (blogs) => {
  if (blogs.length > 0) {
    return 1
  }
}

const totalLikes = (blogs) => {
  const array = blogs.map( blog => blog.likes )

  return blogs.length === 1
    ? array[0]
    : blogs.length === 0
      ? 0
      : array.reduce((sum, item) => {
        return sum + item
      })
}

const favoriteBlog = (blogs) => {
  const blogArray = Array.from(blogs, num => num.likes)
  const maxlikes = Math.max(...blogArray)

  return blogs.length === 1
    ? blogs
    : blogs.length === 0
      ? 0
      : blogs.find((blog) => blog.likes === maxlikes)
}

const mostBlogs = (blogs) => {
  const authors = blogs.map( blog => blog.author)
  const authorMap = authors.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map())
  const authorObject = [...authorMap.keys()].map( author => new Object({ 'author':author, 'blogs': authorMap.get(author) }))
  const most = Math.max(...authorObject.map( author => author.blogs))

  return blogs.length === 1
    ? new Object({ 'author': blogs[0].author, 'blogs':1 })
    : blogs.length === 0
      ? 0
      : authorObject.find((blog) => blog.blogs === most )
}

const mostLikes = (blogs) => {
  const authorLikes = blogs.map( blog => new Object({ 'author': blog.author, 'likes':blog.likes }))
  const likesMap = authorLikes.reduce((acc, e) => acc.set(e.author, e.likes || 0 + 1), new Map())
  const likesObject = [...likesMap.keys()].map( author => new Object({ 'author':author, 'likes': likesMap.get(author) }))
  const most = Math.max(...likesObject.map( author => author.likes))

  return blogs.length === 1
    ? new Object({ 'author': blogs[0].author, 'likes': blogs[0].likes })
    : blogs.length === 0
      ? 0
      : likesObject.find((blog) => blog.likes === most )
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}