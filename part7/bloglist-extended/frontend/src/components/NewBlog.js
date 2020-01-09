import React from 'react'
import { useField } from '../hooks'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Button, Form } from 'semantic-ui-react'

const NewBlog = (props) => {
  const [title, titleReset] = useField('text')
  const [author, authorReset] = useField('text')
  const [url, urlReset] = useField('text')

  const handleSubmit = (event) => {
    event.preventDefault()
    props.createBlog({
      title: title.value,
      author: author.value,
      url: url.value,
      likes: 0
    })
    props.setNotification(`You created "${title.value}"!`, 5)
    titleReset()
    authorReset()
    urlReset()
  }

  return(
    <div className='spacing'>
      <Form size='small' onSubmit={handleSubmit}>
        <Form.Field
          label='Title'
          control='input'
          placeholder='Title'
          { ...title }
        />
        <Form.Field
          label='Author'
          control='input'
          placeholder='Author'
          { ...author }
        />
        <Form.Field
          label='URL'
          control='input'
          placeholder='URL'
          { ...url }
        />
        <div className='spacing'>
          <Button type="submit">Create</Button>
        </div>
      </Form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    notification: state.notification
  }
}

const mapDispatchToProps = {
  setNotification,
  createBlog
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewBlog)