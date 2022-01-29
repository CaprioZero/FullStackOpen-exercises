import React from 'react'
import PropTypes from 'prop-types'
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

Notification.propTypes = {
  notification: PropTypes.shape({
    type: PropTypes.string,
    text: PropTypes.string
  })
}

export default Notification