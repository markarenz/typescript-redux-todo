import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getIdHash, saveToStorage, loadFromStorage } from '../helpers';
import { Todo } from '../type.d';

type TodoState = {
  todos: Todo[];
};

const initialState: TodoState = {
  todos: loadFromStorage() || []
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    initState: (state) => {
      state.todos = [];
    },
    saveTodo: (state, action: PayloadAction<string>) => {
      const newTodo = {
        title: `${action.payload}`,
        id: getIdHash(),
        dateCreated: `${new Date()}`,
        dateCompleted: '',
        isComplete: false,
        tags: []
      };
      const newTodos = [newTodo, ...state.todos];
      saveToStorage(newTodos);
      state.todos = [newTodo, ...state.todos];
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      const newTodos = state.todos.filter((t) => t.id !== action.payload);
      saveToStorage(newTodos);
      state.todos = [...newTodos];
    },
    toggleCompleteTodo: (state, action: PayloadAction<string>) => {
      const newTodos = state.todos.map((t) =>
        t.id === action.payload
          ? {
              ...t,
              isComplete: !t.isComplete,
              dateCompleted: !t.isComplete ? `${new Date()}` : ''
            }
          : t
      );
      saveToStorage(newTodos);
      state.todos = [...newTodos];
    }
  }
});

export const { saveTodo, deleteTodo, toggleCompleteTodo, initState } =
  todoSlice.actions;

export default todoSlice.reducer;
