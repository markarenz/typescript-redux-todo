import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import darkModeReducer from './darkModeSlice';

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    darkMode: darkModeReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type TodoDispatch = typeof store.dispatch;
