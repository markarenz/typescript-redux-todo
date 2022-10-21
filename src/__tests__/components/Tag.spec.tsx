import { render, screen, fireEvent } from '@testing-library/react';
import { TodoState } from '../../store/todoSlice';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import Tag from '../../components/Tag';
import { Todo } from '../../type.d';

const testTodo: Todo = {
  title: 'Test Title',
  id: '12345abcde',
  dateCreated: 'Tue Oct 11 2022 11:15:21 GMT-0400 (Eastern Daylight Time)',
  dateCompleted: '',
  isComplete: false,
  tags: ['test']
};

// jest.spyOn(Storage.prototype, 'getItem');
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

jest.mock('../../helpers.ts', () => ({
  ...jest.requireActual('../../helpers.ts'),
  getTagFilterDefault: jest.fn(() => {
    return 'test';
  }),
  loadFromStorage: jest.fn(() => {
    return [
      { ...testTodo },
      { ...testTodo, id: '1' },
      { ...testTodo, id: '2' }
    ];
  })
}));

describe('Tag', () => {
  it('renders component', () => {
    render(
      <Provider store={store}>
        <Tag tag="test" id="1" />
      </Provider>
    );
    const element = screen.getByTestId('btn-delete-tag-test-1');
    expect(element).toBeInTheDocument();
  });

  it('removes tag from global state when delete button is clicked', () => {
    render(
      <Provider store={store}>
        <Tag tag="test" id="1" />
      </Provider>
    );
    const element = screen.getByTestId('btn-delete-tag-test-1');
    expect(store.getState().todo.todos[1].tags.includes('test')).toBe(true);
    fireEvent.click(element);
    expect(store.getState().todo.todos[1].tags.includes('test')).toBe(false);
  });
});
