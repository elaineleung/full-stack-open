/* eslint-disable react/display-name */
import React, { useState, useImperativeHandle } from 'react'
import { Button } from 'semantic-ui-react'

const Toggleable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button id='button' className='negative ui button' onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  )
})

export default Toggleable