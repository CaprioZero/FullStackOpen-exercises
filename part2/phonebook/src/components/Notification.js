import React from 'react'

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <div className={message.includes('failed') ? 'error' : 'success'}>
            {message}
        </div>
    )
}

export default Notification