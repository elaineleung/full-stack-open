import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog /> renders content', () => {
  let component

  const blog = {
    title: 'We Programmers',
    author: 'Robert C. Martin',
    likes: 3,
  }

  beforeEach(() => {
    component = render(
      <SimpleBlog blog={blog} />
    )
  })

  test('renders title', () => {
    expect(component.container).toHaveTextContent(
      'We Programmers'
    )
  })

  test('renders author', () => {
    expect(component.container).toHaveTextContent(
      'Robert C. Martin'
    )
  })

  test('renders likes', () => {
    expect(component.container).toHaveTextContent(
      'blog has 3 likes'
    )
  })
})

describe('Testing clicking', () => {
  const blog = {
    title: 'We Programmers',
    author: 'Robert C. Martin',
    likes: 3,
  }

  test('clicking the button calls event handler twice in <SimpleBlog />', () => {
    const mockHandler = jest.fn()

    const { getByText } = render(
      <SimpleBlog blog={blog} onClick={mockHandler} />
    )

    const button = getByText('Like')
    fireEvent.click(button)
    fireEvent.click(button)

    // The expectation of the test verifies that the mock function has been called exactly once.
    expect(mockHandler.mock.calls.length).toBe(2)
  })
})