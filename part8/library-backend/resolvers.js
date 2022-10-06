require('dotenv').config()
const { UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const JWT_SECRET = process.env.SECRET

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),

    authorCount: async () => Author.collection.countDocuments(),

    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author });
        return await Book.find({ author: author.id, genres: { $in: [args.genre] } }).populate('author')
      } else if (args.author) {
        const author = await Author.findOne({ name: args.author });
        return await Book.find({ author: { $in: author.id } }).populate('author')
      } else if (args.genre) {
        return await Book.find({ genres: { $in: args.genre } }).populate('author')
      } else {
        return await Book.find({}).populate('author')
      }
    },

    allAuthors: async () => await Author.find({}),

    me: (root, args, { currentUser }) => {
      return currentUser
    }
  },

  Author: {
    bookCount: async (root) => {
      return Book.countDocuments({ author: root })
    }
  },

  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      const bookExisted = await Book.findOne({ title: args.title });
      if (bookExisted) {
        throw new UserInputError('No duplicate book', {
          invalidArgs: args,
        });
      }

      let author = await Author.findOne({ name: args.author })
      if (!author) {
        const author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }

      let updatedAuthorList = await Author.findOne({ name: args.author })
      const newBook = new Book({ ...args, author: updatedAuthorList })
      try {
        await newBook.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: newBook })

      return newBook
    },

    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }

      author.born = args.setBornTo
      try {
        await author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return author
    },

    createUser: async (root, args) => {
      const user = new User({ ...args })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    },
  },
}

module.exports = resolvers