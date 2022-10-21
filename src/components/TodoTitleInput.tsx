import React, { useState } from 'react';
import { useTodoDispatch } from '../store/reduxHooks';
import { updateTodoTitle, setTodoTitleEditComplete } from '../store/todoSlice';
import Btn from './Btn';
import { Event } from '../type.d';

type Props = {
  title: string;
  id: string;
};

const TodoTitleInput: React.FC<Props> = ({ title, id }) => {
  const [editedTitle, setEditedTitle] = useState(title);
  const dispatch = useTodoDispatch();
  const handleTitleChange = (e: Event): void => {
    setEditedTitle(`${e.target.value}`);
  };
  const handleCancelEditing = (): void => {
    dispatch(setTodoTitleEditComplete());
  };
  const handleSaveEditedTitle = (): void => {
    dispatch(updateTodoTitle({ id, value: editedTitle }));
    dispatch(setTodoTitleEditComplete());
  };
  const handleCheckKeydown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleSaveEditedTitle();
    }
    if (e.key === 'Escape') {
      handleCancelEditing();
    }
  };
  const isOkBtnDisabled = editedTitle === '';
  return (
    <div className="flex relative w-full">
      <div className="flex-grow flex">
        <input
          data-testid="todo-title-edit"
          value={editedTitle}
          onChange={handleTitleChange}
          onKeyDown={handleCheckKeydown}
          className="w-full rounded-md bg-transparent px-4 py-2 mr-2 md:mr-4 border-2 border-white/50 text-white outline-none focus:bg-gray-900/30 font-bold"
          autoFocus
        />
      </div>
      <span className="mr-2 md:mr-4">
        <Btn
          testId="todo-title-edit-cancel"
          title="Cancel"
          handleClick={handleCancelEditing}
          variant="outlined"
        />
      </span>
      <Btn
        title="Ok"
        testId="todo-title-edit-ok"
        handleClick={handleSaveEditedTitle}
        disabled={isOkBtnDisabled}
      />
    </div>
  );
};

export default TodoTitleInput;
