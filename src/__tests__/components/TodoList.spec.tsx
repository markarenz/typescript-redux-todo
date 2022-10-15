import { Provider } from 'react-redux';
import { render, screen, act, fireEvent } from '@testing-library/react';
import TodoList from '../../components/TodoList';
import { store } from '../../store/store';
import { saveTodo } from '../../store/todoSlice';
import FilterSelector from '../../components/FilterSelector';

describe('TodoList', () => {
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

  it('renders list when tag filter applied', () => {
    render(
      <Provider store={store}>
        <TodoList />
        <FilterSelector />
      </Provider>
    );
    fireEvent.click(screen.getByTestId('todo-complete-1'));
    const btn = screen.getByTestId('btn-hideCompleted');
    const beforeNum = screen.getByTestId('todo-list').childNodes.length;
    fireEvent.click(btn);
    const afterNum = screen.getByTestId('todo-list').childNodes.length;
    expect(afterNum).toBeLessThan(beforeNum);
  });
});
