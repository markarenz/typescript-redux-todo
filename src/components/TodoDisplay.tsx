import React from 'react';
import { Todo } from '../type.d';
import BtnDelete from './BtnDelete';
import BtnComplete from './BtnComplete';
import { useTodoDispatch } from '../store/reduxHooks';
import { deleteTodo, toggleCompleteTodo } from '../store/todoSlice';
import Tag from './Tag';
import BtnAddTag from './BtnAddTag';
import TodoTitle from './TodoTitle';
import TodoTitleInput from './TodoTitleInput';

interface Props {
  todo: Todo;
  isSelected: boolean;
  isEditingTodoTitle: boolean;
  idx: number;
}

const TodoDisplay: React.FC<Props> = ({
  todo,
  isSelected,
  isEditingTodoTitle,
  idx
}) => {
  const dispatch = useTodoDispatch();
  const handleToggleCompletion = (id: string): void => {
    dispatch(toggleCompleteTodo(id));
  };
  const handleDeleteTodo = (id: string): void => {
    dispatch(deleteTodo(id));
  };
  const rootClass = `w-full p-2 md:p-4 text-gray-900 rounded-lg my-2 flex items-center border-2 ${
    isSelected
      ? 'border-gray-500 dark:border-gray-800 bg-gray-500/50 dark:bg-gray-700/50'
      : 'border-white/50 dark:border-gray-300/50 bg-gray-200/50 dark:bg-gray-400/50'
  }`;
  if (isEditingTodoTitle && isSelected) {
    return (
      <div className={rootClass} data-testid="todo-item-editing">
        <div className="w-full">
          <TodoTitleInput title={todo.title} id={todo.id} />
        </div>
      </div>
    );
  }
  return (
    <div className={rootClass} data-testid="todo-item">
      <div>
        <BtnComplete
          todo={todo}
          handleToggleCompletion={handleToggleCompletion}
          idx={idx}
        />
      </div>
      <div className="grow">
        <div>
          <TodoTitle id={todo.id} title={todo.title} />
          <div>
            <div className="flex items-center text-left">
              <div className="mr-2 w-4 h-5 inline-block hover:animate-wiggle">
                <BtnAddTag id={todo.id} />
              </div>
              {todo.tags.map((t) => (
                <Tag key={`tag-${todo.id}-${t}`} tag={t} id={todo.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="ml-4">
        <BtnDelete id={todo.id} handleDeleteTodo={handleDeleteTodo} idx={idx} />
      </div>
    </div>
  );
};

export default TodoDisplay;
