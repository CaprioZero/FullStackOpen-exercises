const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'CREATE_NOTIFICATION':
      return action.notification
    case 'DELETE_NOTIFICATION':
      return action.notification
    default:
      return state
  }
}

export const setNotification = (notification, displayTime) => {
  return async dispatch => {
    dispatch({
      type: 'CREATE_NOTIFICATION',
      notification,
    })

    setTimeout(() => {
      dispatch({
        type: 'DELETE_NOTIFICATION',
        notification: null
      })
    }, displayTime * 1000)
  }
}

export default notificationReducer