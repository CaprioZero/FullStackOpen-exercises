const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'CREATE_NOTIFICATION':
      return action.notification
    case 'DELETE_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const createNotification = (notification) => {
  return {
    type: 'CREATE_NOTIFICATION',
    notification,
  }
}

// Can't chain action creator yet because of error "Actions must be plain objects. Use custom middleware for async actions", need thunk
// export const deleteNotification = () => {
//   return {
//     type: 'DELETE_NOTIFICATION',
//     notification: null,
//   }
// }

export default notificationReducer