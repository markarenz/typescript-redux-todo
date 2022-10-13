import { Provider } from 'react-redux';
import { render, screen, act } from '@testing-library/react';
import TodoList from '../../components/TodoList';
import { store } from '../../store/store';
import { saveTodo } from '../../store/todoSlice';

describe('TodoList', () => {
  it('renders an empty div if global state has no todos', () => {
    render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );
    const element = screen.queryByTestId('todo-list');
    expect(element).toBeNull();
  });
  it('renders the todos list if global state has todos', () => {
    render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );
    act(() => {
      store.dispatch(saveTodo('Test Todo Title 1'));
    });
    const element = screen.getByTestId('todo-list');
    expect(element).toBeInTheDocument();
  });
});
