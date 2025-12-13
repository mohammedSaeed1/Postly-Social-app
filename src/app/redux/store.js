import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './userSlice'
import { postsReducer } from './postsSlice'
import { commentsReducer } from './commentsSlice'

export const store = configureStore({
  reducer: {
    user : userReducer,
    posts : postsReducer,
    comments : commentsReducer
  },
})