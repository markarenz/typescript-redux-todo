import React from 'react';
import { Todo } from '../type.d';
import BtnDelete from './BtnDelete';
import BtnComplete from './BtnComplete';
import { formatDate } from '../helpers';
import { useTodoDispatch } from '../store/reduxHooks';
import { deleteTodo, toggleCompleteTodo } from '../store/todoSlice';

interface Props {
  todo: Todo;
}

const TodoDisplay: React.FC<Props> = ({ todo }) => {
  const dispatch = useTodoDispatch();
  const handleToggleCompletion = (id: string): void => {
    dispatch(toggleCompleteTodo(id));
  };
  const handleDeleteTodo = (id: string): void => {
    dispatch(deleteTodo(id));
  };
  const relevantDate: string = todo.isComplete
    ? todo.dateCompleted
    : todo.dateCreated;
  return (
    <div
      className="w-full p-4 bg-gray-200/50 text-gray-900 rounded-lg my-2 flex items-center border-2 border-white/50"
      data-testid="todo-item"
    >
      <div>
        <BtnComplete
          todo={todo}
          handleToggleCompletion={handleToggleCompletion}
        />
      </div>
      <div className="grow">
        <div>
          <div className="text-xl font-bold w-full" data-testid="todo-title">
            {todo.title}
          </div>
          <div className="text-base italic">
            <span>{todo.isComplete ? 'Completed:' : 'Created:'}</span>{' '}
            {formatDate(relevantDate)}
          </div>
        </div>
      </div>
      <BtnDelete id={todo.id} handleDeleteTodo={handleDeleteTodo} />
    </div>
  );
};

export default TodoDisplay;
