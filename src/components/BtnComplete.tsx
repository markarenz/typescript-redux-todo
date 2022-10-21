import React from 'react';
import { Todo } from '../type.d';
import IconCheckmark from './icons/IconCheckmark';

type Props = {
  todo: Todo;
  handleToggleCompletion: (id: string) => void;
  idx: number;
};
const BtnComplete: React.FC<Props> = ({
  todo,
  handleToggleCompletion,
  idx
}) => (
  <button
    type="button"
    onClick={() => handleToggleCompletion(todo.id)}
    className={`text-2xl w-8 h-8 flex justify-center items-center rounded-md border-2 border-gray-800 mr-4 transition-all duration-200 md:hover:bg-yellow-300/50 md:hover:ring-2 md:hover:ring-offset-2 ring-yellow-600 active:scale-90 ${
      todo.isComplete ? 'bg-primary dark:bg-primaryDark' : 'bg-transparent'
    }`}
    data-testid={`todo-complete-${idx}`}
  >
    {todo.isComplete && <IconCheckmark data-testid="icon-checkmark" />}
  </button>
);

export default BtnComplete;
