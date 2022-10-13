import React from 'react';
import { Todo } from '../type.d';

type Props = {
  todo: Todo;
  handleToggleCompletion: (id: string) => void;
};
const BtnComplete: React.FC<Props> = ({ todo, handleToggleCompletion }) => (
  <button
    type="button"
    onClick={() => handleToggleCompletion(todo.id)}
    className={`text-2xl w-8 h-8 flex justify-center items-center rounded-md border-2 border-gray-800 mr-4 transition-all duration-200 hover:bg-yellow-300/50 hover:ring-2 hover:ring-offset-2 ring-yellow-600 active:scale-90 ${
      todo.isComplete ? 'bg-yellow-300/50' : 'bg-transparent'
    }`}
    data-testid={`todo-complete-${todo.id}`}
  >
    {todo.isComplete ? '\u2713' : ' '}
  </button>
);

export default BtnComplete;
