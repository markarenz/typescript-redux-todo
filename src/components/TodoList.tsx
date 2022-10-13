import { useTodoSelector } from '../store/reduxHooks';
import TodoDisplay from './TodoDisplay';

const TodoList = () => {
  const { todos } = useTodoSelector((state) => state.todo);
  return (
    <div>
      {todos.length > 0 && (
        <div data-testid="todo-list" className="mt-8">
          {todos?.map((t) => (
            <TodoDisplay key={t.id} todo={t} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;
