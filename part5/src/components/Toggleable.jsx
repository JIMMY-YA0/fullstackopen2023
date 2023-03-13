import { forwardRef, useImperativeHandle, useState } from 'react'

const Toggleable = forwardRef((props, refs) => {
  const [visible, setVisble] = useState(false)

  const hideWhenVisble = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisiblity = () => {
    setVisble(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisiblity
    }
  })

  return (
    <div>
      <div>
        <button style={hideWhenVisble} onClick={toggleVisiblity}>
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisiblity}>cancel</button>
      </div>
    </div>
  )
})

//Due to using forwardRef, so component's name would be anonymous
Toggleable.displayName = 'Togglable'

export default Toggleable
