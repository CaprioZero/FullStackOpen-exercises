import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import Alert from '@mui/material/Alert'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (notification === null) {
    return null
  } else if (notification.type === 'success') {
    return (
      <div className={'success'}>
        <Alert severity="success">
          {notification.text}
        </Alert>
      </div>
    )
  } else {
    return (
      <div className={'error'}>
        <Alert severity="error">
          {notification.text}
        </Alert>
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