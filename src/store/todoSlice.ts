import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialTags, initialTodos } from './initialStateData';
import {
  getIdHash,
  saveToStorage,
  loadFromStorage,
  getTagsFromStorage,
  getTagsFromTodos,
  getTagFilterDefault,
  saveTagFilter
} from '../helpers';
import { Todo, TodoActionById } from '../type.d';

export type TodoState = {
  tags: string[];
  todos: Todo[];
  selectedTodoId: string;
  isTagModalOpen: boolean;
  isEditingTodoTitle: boolean;
  isFilterModalOpen: boolean;
  tagFilter: string;
  hideCompleted: boolean;
};

const initialState: TodoState = {
  tags: getTagsFromStorage() || initialTags,
  todos: loadFromStorage() || initialTodos,
  selectedTodoId: '',
  isTagModalOpen: false,
  isEditingTodoTitle: false,
  isFilterModalOpen: false,
  tagFilter: getTagFilterDefault() || '',
  hideCompleted: false
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
    addTag: (state, action: PayloadAction<TodoActionById>) => {
      const { id, value } = action.payload;
      const newTodos = state.todos.map((t) =>
        t.id === id
          ? {
              ...t,
              tags: [
                ...t.tags.filter((tg) => tg !== value),
                value.toLowerCase()
              ]
            }
          : t
      );
      saveToStorage(newTodos);
      state.tags = getTagsFromTodos(newTodos);
      state.todos = [...newTodos];
    },
    deleteTag: (state, action: PayloadAction<TodoActionById>) => {
      const { id, value } = action.payload;
      const newTodos = state.todos.map((t) =>
        t.id === id
          ? {
              ...t,
              tags: t.tags.filter((tg) => tg !== value)
            }
          : t
      );
      saveToStorage(newTodos);
      state.todos = [...newTodos];
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
    },
    updateTodoTitle: (state, action: PayloadAction<TodoActionById>) => {
      const { id, value } = action.payload;
      const newTodos = state.todos.map((t) =>
        t.id === id
          ? {
              ...t,
              title: value
            }
          : t
      );
      saveToStorage(newTodos);
      state.todos = [...newTodos];
    },
    selectTodoTitleForEdit: (state, action: PayloadAction<string>) => {
      state.isEditingTodoTitle = true;
      state.selectedTodoId = action.payload;
    },
    setTodoTitleEditComplete: (state) => {
      state.isEditingTodoTitle = false;
      state.selectedTodoId = '';
    },
    setTagModalOpen: (state, action: PayloadAction<string>) => {
      state.selectedTodoId = action.payload;
      state.isTagModalOpen = action.payload !== '';
    },
    setFilterModalOpen: (state, action: PayloadAction<string>) => {
      state.isFilterModalOpen = action.payload === 'open';
    },
    sethideCompleted: (state, action: PayloadAction<string>) => {
      state.hideCompleted = action.payload === 'hide';
    },
    setTagFilter: (state, action: PayloadAction<string>) => {
      state.tagFilter = action.payload;
      saveTagFilter(action.payload);
    },
    clearAll: (state) => {
      state.tagFilter = '';
      state.tags = [];
      state.todos = [];
      saveToStorage([]);
    }
  }
});

export const {
  saveTodo,
  deleteTodo,
  toggleCompleteTodo,
  initState,
  deleteTag,
  addTag,
  setTagModalOpen,
  updateTodoTitle,
  selectTodoTitleForEdit,
  setTodoTitleEditComplete,
  setFilterModalOpen,
  sethideCompleted,
  setTagFilter,
  clearAll
} = todoSlice.actions;

export default todoSlice.reducer;
