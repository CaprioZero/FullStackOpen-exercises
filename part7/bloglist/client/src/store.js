import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import currentUserReducer from './reducers/currentUserReducer'
import usersReducer from './reducers/usersReducer'

const persistConfig = {
  key: 'root',
  storage
}

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  currentUser: currentUserReducer,
  users: usersReducer
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)))

export const persistor = persistStore(store)

export default store