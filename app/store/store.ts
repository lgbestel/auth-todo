import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import todoSlice from './slices/todosSlice';


export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    todo: todoSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
})

export type RootState = ReturnType<typeof store.getState>
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch