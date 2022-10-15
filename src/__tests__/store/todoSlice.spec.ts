import { todoSlice, TodoState } from '../../store/todoSlice';
import { testTodo } from '../__fixtures__/testTodo';
import {} from '../../type.d';

const initialState: TodoState = {
  todos: [{ ...testTodo }, { ...testTodo, id: '1' }, { ...testTodo, id: '2' }],
  tags: ['test'],
  selectedTodoId: '',
  isTagModalOpen: false,
  isEditingTodoTitle: false,
  isFilterModalOpen: false,
  tagFilter: '',
  hideCompleted: false
};

describe('todoSlice', () => {
  it('should get initial todos from localstorage', () => {
    const result = todoSlice.reducer(initialState, {
      type: 'initState',
      payload: ''
    });
    expect(result.todos[0].title).toBe('Test Title');
  });
});
