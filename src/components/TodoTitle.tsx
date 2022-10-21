import React from 'react';
import { useTodoDispatch } from '../store/reduxHooks';
import { selectTodoTitleForEdit } from '../store/todoSlice';

type Props = {
  title: string;
  id: string;
};

const TodoTitle: React.FC<Props> = ({ title, id }) => {
  const dispatch = useTodoDispatch();
  const handleSelectForEditing = (): void => {
    dispatch(selectTodoTitleForEdit(id));
  };
  return (
    <div
      className="relative text-xl font-bold w-full cursor-text group mb-2"
      data-testid="todo-title"
      onClick={() => handleSelectForEditing()}
    >
      <div className="absolute transition-w duration-200 bottom-0 left-0 w-0 group-hover:w-full h-full bg-primary/50 dark:bg-primaryDark/50" />
      <span className="relative">{title}</span>
    </div>
  );
};

export default TodoTitle;
