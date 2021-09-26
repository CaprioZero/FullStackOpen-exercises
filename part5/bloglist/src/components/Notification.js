import React from 'react'
import PropTypes from 'prop-types'

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

Notification.propTypes = {
    message: PropTypes.string,
    errorMessage: PropTypes.string,
}

export default Notification