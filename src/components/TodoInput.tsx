import React, { useState } from 'react';
import { Event } from '../type.d';
import { useTodoDispatch } from '../store/reduxHooks';
import { saveTodo } from '../store/todoSlice';

const TodoInput: React.FC = () => {
  const [newTodo, setNewTodo] = useState<string>('');
  const dispatch = useTodoDispatch();
  const handleTodoChange = (e: Event) => {
    setNewTodo(`${e.target.value}`);
  };
  const handleSaveTodo = () => {
    if (newTodo.length > 0) {
      dispatch(saveTodo(newTodo));
      setNewTodo('');
    }
  };
  const handleCheckEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleSaveTodo();
    }
  };
  return (
    <div className="w-full flex">
      <input
        data-testid="todo-input"
        type="text"
        autoFocus
        name="todo"
        onKeyDown={handleCheckEnter}
        onChange={handleTodoChange}
        value={newTodo}
        className="w-full rounded-md bg-transparent px-4 py-2 border-2 border-white/50 text-white outline-none focus:bg-gray-900/30 font-bold"
      />
      <button
        type="button"
        onClick={handleSaveTodo}
        className="uppercase ml-4 p-4 bg-gray-200 rounded-md text-gray-900 transition-all duration-200 font-bold hover:bg-red-500 hover:text-white active:scale-90 hover:ring-2 hover:ring-offset-2 ring-red-700"
      >
        Save
      </button>
    </div>
  );
};

export default TodoInput;
