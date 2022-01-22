import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (notification === null) {
    return null
  } else if (notification.type === 'success') {
    return (
      <div className={'success'}>
        {notification.text}
      </div>
    )
  } else {
    return (
      <div className={'error'}>
        {notification.text}
      </div>
    )
  }
}

export default Notification