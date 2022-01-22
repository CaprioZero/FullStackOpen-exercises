const notificationReducer = (state = null, action) => {
  switch (action.type) {
  case 'CREATE_NOTIFICATION':
    return action.payload
  case 'DELETE_NOTIFICATION':
    return action.payload
  default:
    return state
  }
}

export const setNotification = (notification, notificationType, displayTime) => {
  if (window.timeOutId) {
    window.clearTimeout(window.timeOutId)
  }

  return async dispatch => {
    dispatch({
      type: 'CREATE_NOTIFICATION',
      payload: {
        text: notification,
        type: notificationType
      }
    })

    window.timeOutId = setTimeout(() => {
      dispatch({
        type: 'DELETE_NOTIFICATION',
        payload: null
      })
    }, displayTime * 1000)
  }
}

export default notificationReducer