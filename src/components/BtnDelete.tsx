import React from 'react';

type Props = {
  id: string;
  handleDeleteTodo: (id: string) => void;
};
const BtnDelete: React.FC<Props> = ({ id, handleDeleteTodo }) => (
  <button
    type="button"
    className="relative rounded-full bg-red-800 transition-all duration-200 text-white w-6 h-6 flex justify-center items-center p-2 hover:ring-4 hover:ring-offset-2 ring-red-700 active:scale-90"
    onClick={() => handleDeleteTodo(id)}
    data-testid={`todo-delete-${id}`}
  >
    {'\u2715'}
  </button>
);
export default BtnDelete;
