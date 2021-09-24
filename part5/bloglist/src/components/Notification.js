import React from 'react'

const Notification = ({ message, errorMessage }) => {
    if (message === null && errorMessage === null) {
        return null
    } else if (message) {
        return (
            <div className={'success'}>
                {message}
            </div>
        )
    } else {
        return (
            <div className={'error'}>
                {errorMessage}
            </div>
        )
    }
}

export default Notification