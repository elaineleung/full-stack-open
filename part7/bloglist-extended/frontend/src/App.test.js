import React from 'react'
import { render, waitForElement } from '@testing-library/react'
import App from './App'
jest.mock('./services/blogs')

describe('<App />', () => {
  test('if no user logged in, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('Login')
    )

    // const blogs = component.container.querySelectorAll('.blog')
    // expect(blogs).not.toBeDefined()

    expect(component.container).toHaveTextContent(
      'Username:'
    )

    expect(component.container).toHaveTextContent(
      'Password:'
    )

    expect(component.container).not.toHaveTextContent(
      'logged in'
    )
  })

  test('if a user is logged in, blogs are rendered', async () => {
    const user = {
      username: 'Tester',
      token: '00000000',
      name: 'test'
    }

    localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.container.querySelector('.container')
    )

    const blogs = component.container.querySelectorAll('.simple')
    expect(blogs.length).toBe(3)

  })

})