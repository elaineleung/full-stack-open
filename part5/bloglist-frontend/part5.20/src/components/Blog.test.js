import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog /> renders content', () => {
  let component

  const blog = {
    title: 'We Programmers',
    author: 'Robert C. Martin',
    url: 'http://cleancoder.net',
    likes: 3,
  }

  beforeEach(() => {
    component = render(
      <Blog blog={blog} />
    )
  })

  // test('renders title', () => {
  //   const divComp = component.container.querySelector('div')
  //   console.log(prettyDOM(divComp))

  //   const div = component.container.querySelector('.simple')
  //   expect(div).toHaveTextContent(
  //     'We Programmers'
  //   )
  // })

  test('renders title and author', () => {
    const divComp = component.container.querySelector('div')
    console.log(prettyDOM(divComp))

    const div = component.container.querySelector('.simple')
    expect(div).toHaveTextContent(
      'Robert C. Martin'
    )
    expect(div).toHaveTextContent(
      'We Programmers'
    )
    expect(div).not.toHaveTextContent('likes')
  })
})

describe('Testing clicking', () => {
  const blog = {
    title: 'We Programmers',
    author: 'Robert C. Martin',
    url: 'http://cleancoder.net',
    likes: 3,
  }

  let component

  beforeEach(() => {
    component = render(
      <Blog blog={blog} />
    )
  })

  test('clicking the <div> expands the info in <Blog />', () => {
    const div = component.container.querySelector('.click')
    fireEvent.click(div)

    expect(div).not.toHaveStyle('display: none')

    const more = component.container.querySelector('.more')
    expect(more).toHaveTextContent('likes')
  })
})