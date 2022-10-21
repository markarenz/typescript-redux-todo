import { useTodoSelector } from '../store/reduxHooks';
import TodoDisplay from './TodoDisplay';

const TodoList = () => {
  const {
    todos,
    selectedTodoId,
    isEditingTodoTitle,
    hideCompleted,
    tagFilter
  } = useTodoSelector((state) => state.todo);
  const filteredTodos = todos
    .filter((t) => (hideCompleted && !t.isComplete) || !hideCompleted)
    .filter((t) => tagFilter === '' || t.tags.includes(`${tagFilter}`));
  return (
    <div>
      {todos.length > 0 && (
        <div data-testid="todo-list" className="mt-8">
          {filteredTodos?.map((t, idx) => (
            <TodoDisplay
              key={t.id}
              todo={t}
              isSelected={selectedTodoId === t.id}
              isEditingTodoTitle={isEditingTodoTitle}
              idx={idx}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;
