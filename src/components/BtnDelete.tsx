import React from 'react';
import IconClose from './icons/IconClose';

type Props = {
  id: string;
  handleDeleteTodo: (id: string) => void;
  idx: number;
};
const BtnDelete: React.FC<Props> = ({ id, handleDeleteTodo, idx }) => (
  <button
    type="button"
    className="relative rounded-full bg-red-800 transition-all duration-200 text-white w-8 h-8 flex justify-center items-center p-2 hover:ring-4 hover:ring-offset-2 ring-red-700 active:scale-90 hover:rotate-90"
    onClick={() => handleDeleteTodo(id)}
    data-testid={`todo-delete-${idx}`}
  >
    <IconClose />
  </button>
);
export default BtnDelete;
