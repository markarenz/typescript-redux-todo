import React, { useState } from 'react';
import { Event } from '../type.d';
import { useTodoDispatch } from '../store/reduxHooks';
import { saveTodo } from '../store/todoSlice';
import Btn from './Btn';

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
  const isSaveBtnDisabled = newTodo === '';
  return (
    <div className="w-full flex">
      <input
        data-testid="todo-input"
        value={newTodo}
        onChange={handleTodoChange}
        onKeyDown={handleCheckEnter}
        className="w-full rounded-md bg-transparent px-4 py-2 mr-2 md:mr-4 border-2 border-white/50 text-white outline-none focus:bg-gray-900/30 font-bold"
        autoFocus
      />
      <Btn
        title="Save"
        handleClick={handleSaveTodo}
        disabled={isSaveBtnDisabled}
      />
    </div>
  );
};

export default TodoInput;
