require('dotenv').config()

const MONGODB_ENV = process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI

let PORT = process.env.PORT

module.exports = {
    MONGODB_ENV,
    PORT
}