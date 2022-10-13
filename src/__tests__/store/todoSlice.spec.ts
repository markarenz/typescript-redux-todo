import { todoSlice } from '../../store/todoSlice';
import { testTodo } from '../__fixtures__/testTodo';

const initialState = {
  todos: [{ ...testTodo }, { ...testTodo, id: '1' }, { ...testTodo, id: '2' }]
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
