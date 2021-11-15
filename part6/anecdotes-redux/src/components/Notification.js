import React from 'react'
// import { useSelector } from 'react-redux'  hook way
import { connect } from 'react-redux'  //connect way

const Notification = (props) => {
  // const notification = useSelector(state => state.notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (props.notification === null) {
    return null
  }

  return (
    <div style={style}>
      {props.notification}
    </div>
  )
}

// export default Notification   hook way

const mapStateToProps = (state) => {         //connect way below
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification



